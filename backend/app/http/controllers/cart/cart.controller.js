const createHttpError = require("http-errors");
const { ProductModel } = require("../../../models/product");
const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const {
  copyObject,
  getUserCartDetail,
} = require("../../../../utils/functions");
const { UserModel } = require("../../../models/user");
const { CouponModel } = require("../../../models/coupon");

class CartController extends Controller {
  async addToCart(req, res) {
    const userId = req?.user?._id;;
    if(!userId) throw createHttpError.Unauthorized("please login first")
    const { productId } = req.body;
    //!check if the product._id exist in products DB or not
    const addedProduct = await this.checkExistProduct(productId);
    //!find if the product was before in cart items of user
    const product = await this.findProductInCart(userId, productId);
    //!if the product was before in cart items of user add 1 to the product quantity
    if (product) {
      const addToCartResult = await UserModel.updateOne(
        {
          _id: userId,
          "cart.products.productId": productId,
        },
        {
          $inc: {
            "cart.products.$.quantity": 1,
          },
        }
      );
      if (addToCartResult.modifiedCount == 0) 
      throw createHttpError.InternalServerError(
          "server error"
        );
    //!if the product was not before in cart items of user add object to ehe cart.products array=> {productId:---,quantity:1}   
    } else {
      const addToCartResult = await UserModel.updateOne(
        {
          _id: userId,
        },
        {
          $push: {
            "cart.products": {
              productId,
              quantity: 1,
            },
          },
        }
      );
      if (addToCartResult.modifiedCount == 0)
        throw createHttpError.InternalServerError(
          "server error"
        );
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: `${addedProduct.title} added to basket successfully`,
      },
    });
  }
  async removeFromCart(req, res) {
    const userId = req.user._id;
    const { productId } = req.body;
    const removedProduct = await this.checkExistProduct(productId);
    const product = await this.findProductInCart(userId, productId);
    if (!product)
      throw createHttpError.BadRequest(
        `${removedProduct.title} is not exist in your cart`
      );
    let message;
    //! if product quantity is bigger than one so reduce one form 
    //! product number
    if (product.quantity > 1) {
      const decreaseCart = await UserModel.updateOne(
        {
          _id: userId,
          "cart.products.productId": productId,
        },
        {
          $inc: {
            "cart.products.$.quantity": -1,
          },
        }
      );
      if (decreaseCart.modifiedCount == 0)
        throw createHttpError.InternalServerError("server error");

      message = "reduce one item";
      //! if product quantity is  one so delete the product 
    } else {
      const newCart = await UserModel.findOneAndUpdate(
        {
          _id: userId,
          "cart.products.productId": productId,
        },
        {
          $pull: {
            "cart.products": { productId },
          },
        },
        { new: true }
      );
      if (newCart.modifiedCount == 0)
        throw createHttpError.InternalServerError(
          "server error"
        );

      message = "remove product from basket";
          //! if after the deleting the product there is not other
          //! product in basket exist so => delete the coupon
      if (newCart.cart.products.length === 0)
        await UserModel.updateOne(
          { _id: userId },
          {
            $unset: { "cart.coupon": 1 },
          }
        );
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: `${removedProduct.title} ${message}`,
      },
    });
  }
  async addCouponToCart(req, res) {
    const { couponCode } = req.body;
    const user = req.user;
    const coupon = await CouponModel.findOne({ code: couponCode });
    if (!coupon)
      throw createHttpError.BadRequest("کد تخفیف وارد شده وجود ندارد");
    if (coupon.usageCount >= coupon.usageLimit)
      throw createHttpError.BadRequest("ظرفیت کد تخفیف به اتمام رسیده است");
    if (
      coupon?.expireDate &&
      new Date(coupon.expireDate).getTime() < Date.now()
    )
      throw createHttpError.BadRequest("کد تخفیف منقضی شده است");
    if (!coupon.isActive)
      throw createHttpError.BadRequest("کد تخفیف فعال نیست");
    const productIdsInCart = user.cart.products.map((p) =>
      p.productId.valueOf()
    );
    const isCouponIncludeCartItems = coupon.productIds.some((pId) =>
      productIdsInCart.includes(pId.valueOf())
    );
    if (!isCouponIncludeCartItems)
      throw createHttpError.BadRequest(
        "کد تخفیف مختص هیچ کدام از این محصولات نمی باشد."
      );
    const addCouponToCart = await UserModel.updateOne(
      { _id: user._id },
      {
        $set: { "cart.coupon": coupon._id },
      }
    );
    if (addCouponToCart.modifiedCount == 0)
      throw new createHttpError.InternalServerError("کد تخفیف اعمال نشد");

    const userCartDetail = (await getUserCartDetail(user._id))?.[0];
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "کد تخفیف با موفقیت اعمال شد",
        cart: userCartDetail,
      },
    });
  }
  async removeCouponFromCart(req, res) {
    const userId = req.user._id;

    const removeCouponFromCart = await UserModel.updateOne(
      { _id: userId },
      {
        $unset: { "cart.coupon": 1 },
      }
    );
    if (removeCouponFromCart.modifiedCount == 0)
      throw createHttpError.InternalServerError("کد تخفیف حذف نشد");
    const userCartDetail = (await getUserCartDetail(userId))?.[0];
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "کد تخفیف برداشته شد",
        cart: userCartDetail,
      },
    });
  }
  async checkExistProduct(id) {
    const product = await ProductModel.findById(id);
    if (!product)
      throw createHttpError.NotFound("product not found");
    return product;
  }
  async findProductInCart(userId, productId) {
    const findRe = await UserModel.findOne({_id: userId});
    const findResult = await UserModel.findOne(
      { _id: userId, "cart.products.productId": productId },
      { "cart.products.$": 1 }
    );
    const userDetail = copyObject(findResult);
    return userDetail?.cart?.products?.[0];
  }
}

module.exports = {
  CartController: new CartController(),
};
