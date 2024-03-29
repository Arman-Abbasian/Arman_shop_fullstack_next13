const Controller = require("../../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");
const {
  addCategorySchema,
  updateCategorySchema,
} = require("../../../validators/admin/category.shcema");
const { CategoryModel } = require("../../../../models/category");

class CategoryController extends Controller {
  async getListOfCategories(req, res) {
    const query = req.query;
    const categories = await CategoryModel.find(query);
    if (!categories)
      throw createHttpError.ServiceUnavailable("category not found");

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        categories,
      },
    });
  }
  async addNewCategory(req, res) {
    const { title, description, type, parent } =
      await addCategorySchema.validateAsync(req.body);
    await this.findCategoryWithTitle(title);
    const category = await CategoryModel.create({
      title,
      description,
      type,
      parent,
    });

    if (!category) throw createHttpError.InternalServerError("server error");
    
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: {
        message: "ctegory added successfully",
      },
    });
  }
  async findCategoryWithTitle(title) {
    const category = await CategoryModel.findOne({ title });
    if (category)
      throw createHttpError.BadRequest("this category already existed");
  }
  async checkExistCategory(id) {
    const category = await CategoryModel.findById(id);
    if (!category)
      throw createHttpError.BadRequest("this title is not existed");
    return category;
  }
  async updateCategory(req, res) {
    const { id } = req.params;
    const { title, type, description } = req.body;
    await this.checkExistCategory(id);
    await updateCategorySchema.validateAsync(req.body);
    const updateResult = await CategoryModel.updateOne(
      { _id: id },
      {
        $set: { title, type, description },
      }
    );
    if (updateResult.modifiedCount == 0)
      throw createError.InternalServerError("some error");
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "category updated successfully",
      },
    });
  }
  async removeCategory(req, res) {
    const { id } = req.params;
    const category = await this.checkExistCategory(id);
    const deleteResult = await CategoryModel.deleteMany({
      $or: [{ _id: category._id }, { parentId: category._id }],
    });
    if (deleteResult.deletedCount == 0)
      throw createError.InternalServerError("server error");
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "category removed successfully",
      },
    });
  }
  async getCategoryById(req, res) {
    const { id } = req.params;
    const category = await this.checkExistCategory(id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        category,
      },
    });
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
