const Controller = require("../../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const mongoose = require("mongoose");
const {
  copyObject,
  deleteInvalidPropertyInObject,
} = require("../../../../../utils/functions");
const createHttpError = require("http-errors");
// const { CommentController } = require("../../comment/comment.controller");
const ObjectId = mongoose.Types.ObjectId;
const { CategoryModel } = require("../../../../models/category");
const { UserModel } = require("../../../../models/user");
const { ProductModel } = require("../../../../models/product");
const {
  addProductSchema,
  changeCourseDiscountSchema,
} = require("../../../validators/admin/product.schema");

class ProductController extends Controller {
  async addNewProduct(req, res) {
    // const seller = req.user._id;
    await addProductSchema.validateAsync(req.body);
    const {
      title,
      description,
      slug,
      imageLink,
      brand,
      tags,
      category,
      price,
      discount = 0,
      offPrice,
      countInStock,
    } = req.body;

    const product = await ProductModel.create({
      title,
      description,
      slug,
      imageLink,
      brand,
      tags,
      category,
      price,
      discount,
      offPrice,
      countInStock,
    });
    if (!product?._id)
      throw createHttpError.InternalServerError("product not added");
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: {
        message: "product created successfully",
        product,
      },
    });
  }
  async getListOfProducts(req, res) {
    let dbQuery = {};
    const user = req.user;
    console.log({ userrrrrrrrrrrrrr: user });
    //these are the keys of query strings
    const { search, category, sort, type } = req.query;
    // if search key was in query string's key;
    if (search) dbQuery["$text"] = { $search: search };
    // if category key was in query string's key;
    if (category) {
      const categories = category.split(",");
      //categoryId is consist of _id field of categories in queryString
      const categoryIds = [];
      for (const item of categories) {
        const { _id } = await CategoryModel.findOne({ title: item });
        categoryIds.push(_id);
      }
      dbQuery["category"] = {
        $in: categoryIds,
      };
    }

    const sortQuery = {};
    if (!sort) sortQuery["createdAt"] = -1;
    if (sort) {
      if (sort === "latest") sortQuery["createdAt"] = -1;
      if (sort === "earliest") sortQuery["createdAt"] = 1;
      if (sort === "popular") sortQuery["likes"] = -1;
    }
    const products = await ProductModel.find(dbQuery, {
      reviews: 0,
    })
      .populate([{ path: "category", select: { title: 1 } }])
      .sort(sortQuery);

    //! now we have a filtered and sorted product
    //!make a copy of product and do the continue of codes on the copy products
    const transformedProducts = copyObject(products);
    const newProducts = transformedProducts.map((product) => {
      //!we add this property to each product(isLiked) to make the like icon filled or empty
      //!based on that user liked product before or not
      //!if user is unknown make the all isLiked to false
      if (!user) product.isLiked = false;
      if (!user) product.isPurchased = false;
      //! if use is authenticate, check if the userId is in product.likes array or not
      else if (user && product.likes.includes(user._id.toString()))
        product.isLiked = true;
      else product.isLiked = false;
      const isInCart = user?.cart.products.findIndex(
        (item) => item.productId.toString() === product._id
      );
      if (user && isInCart >= 0) product.isPurchased = true;
      else product.isPurchased = false;
      //delete product.likes;
      return product;
    });
    console.log({ productssssssss: newProducts });
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        products: newProducts,
      },
    });
  }
  async getProductById(req, res) {
    const { id: productId } = req.params;
    await this.findProductById(productId);
    const product = await ProductModel.findById(productId).populate([
      {
        path: "category",
        model: "Category",
        select: {
          title: 1,
          icon: 1,
          englishTitle: 1,
        },
      },
    ]);
    if (!product) throw createHttpError.NotFound("product not found");

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        product,
      },
    });
  }
  async getOneProductBySlug(req, res) {
    const { slug } = req.params;
    const product = await ProductModel.findOne({ slug }).populate([
      {
        path: "category",
        model: "Category",
        select: {
          title: 1,
          icon: 1,
          englishTitle: 1,
        },
      },
    ]);
    if (!product) throw createHttpError.NotFound("product not found");

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        product,
      },
    });
  }
  async changeProductDiscountStatus(req, res) {
    const { id } = req.params;
    await this.findProductById(id);
    await changeCourseDiscountSchema.validateAsync(req.body);
    const { discount, offPrice } = req.body;
    const result = await ProductModel.updateOne(
      { _id: id },
      { $set: { discount, offPrice } }
    );
    if (result.modifiedCount > 0) {
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "discount is active now",
        },
      });
    }
    throw createHttpError.BadRequest("some error!!! try again");
  }
  async removeProduct(req, res) {
    const { id } = req.params;
    await this.findProductById(id);
    const deleteResult = await ProductModel.deleteOne({ _id: id });
    if (deleteResult.deletedCount == 0)
      throw createError.InternalServerError("some error occured");
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "product removes successfullly",
      },
    });
  }
  async updateProduct(req, res) {
    const { id } = req.params;
    await this.findProductById(id);
    const data = copyObject(req.body);
    let blackListFields = ["bookmarks", "likes", "reviews"];
    deleteInvalidPropertyInObject(data, blackListFields);
    const updateProductResult = await ProductModel.updateOne(
      { _id: id },
      {
        $set: data,
      }
    );
    if (!updateProductResult.modifiedCount)
      throw new createHttpError.InternalServerError("some error...");

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "product updated successfully",
      },
    });
  }
  async likeProduct(req, res) {
    //!user send the productId to the server
    const { id: productId } = req.params;
    //!get req.user from verifyAccessToken middleware
    const user = req.user;
    //!find product from product collection
    const product = await this.findProductById(productId);
    if (!product) throw createHttpError.BadRequest("product not found");
    //!likedProduct is true if id of user be in likes array of product document and visaverse
    const likedProduct = await ProductModel.findOne({
      _id: productId,
      likes: user._id,
    });
    // !if id of user was or was not exist in like field of product document
    const updateProductQuery = likedProduct
      ? { $pull: { likes: user._id } }
      : { $push: { likes: user._id } };
    // if id of product was or was not exist in likedProducts field of user document
    const updateUserQuery = likedProduct
      ? { $pull: { likedProducts: product._id } }
      : { $push: { likedProducts: product._id } };

    const productUpdate = await ProductModel.updateOne(
      { _id: productId },
      updateProductQuery
    );
    const userUpdate = await UserModel.updateOne(
      { _id: user._id },
      updateUserQuery
    );

    if (productUpdate.modifiedCount === 0 || userUpdate.modifiedCount === 0)
      throw createHttpError.BadRequest("server error");

    let message;
    if (!likedProduct) {
      message = "thanks for like";
    } else message = "remove like";

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message,
      },
    });
  }
  async findProductById(id) {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError.BadRequest("product identification is not true");
    const product = await ProductModel.findById(id);
    if (!product) throw createHttpError.NotFound("product not found");
    return product;
  }
}

module.exports = {
  ProductController: new ProductController(),
};
