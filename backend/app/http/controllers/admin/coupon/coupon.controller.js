const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { addCouponSchema } = require("../../../validators/admin/coupon.schema");
const {
  checkProductExist,
  deleteInvalidPropertyInObject,
  copyObject,
} = require("../../../../../utils/functions");
const { CouponModel } = require("../../../../models/coupon");

class CouponController extends Controller {
  async addNewCoupon(req, res) {
    await addCouponSchema.validateAsync(req.body);
    const {
      code,
      type,
      productIds,
      amount,
      usageLimit,
      expireDate = null,
    } = req.body;
    for (const productId of productIds) {
      await checkProductExist(productId);
    }
    const coupon = await CouponModel.create({
      type,
      code,
      productIds,
      amount,
      usageLimit,
      expireDate,
    });

    if (!coupon?._id)
      throw createHttpError.InternalServerError("some problem occured");

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: {
        message: "coupon created successfully",
        coupon,
      },
    });
  }
  async updateCoupon(req, res) {
    const { id } = req.params;
    const coupon = await this.findCouponById(id);
    const data = req.body;
    deleteInvalidPropertyInObject(data);
    const newCoupon = { ...coupon, ...data };
    const updateResult = await CouponModel.updateOne(
      { _id: id },
      {
        $set: newCoupon,
      }
    );
    if (updateResult.modifiedCount === 0)
      throw createHttpError.InternalServerError("some problem occured");
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "coupon updated successfully" ,
      },
    });
  }
  async removeCoupon(req, res) {
    const { id } = req.params;
    await this.findCouponById(id);
    const coupon = await CouponModel.findByIdAndDelete(id);
    if (!coupon._id)
      throw createHttpError.InternalServerError("some problem occured");
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "coupon removed successfully",
      },
    });
  }
  async getAllCoupons(req, res) {
    const coupons = await CouponModel.find({}).populate([
      {
        path: "productIds",
        model: "Product",
        select: { title: 1, slug: 1 },
      },
    ]);
    if (!coupons)
      throw createHttpError.InternalServerError("coupon not found");
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        coupons,
      },
    });
  }
  async getOneCoupon(req, res) {
    const { id } = req.params;
    const coupon = await CouponModel.findOne({ _id: id }).populate([
      {
        path: "productIds",
        model: "Product",
        select: { title: 1, slug: 1 },
      },
    ]);
    if (!coupon) throw createHttpError.InternalServerError("coupon not found");
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        coupon,
      },
    });
  }
  async findCouponById(id) {
    const coupon = await CouponModel.findById(id);
    if (!coupon)
      throw createHttpError.BadRequest("coupon not found");
    return copyObject(coupon);
  }
}

module.exports = {
  CouponController: new CouponController(),
};
