const Controller = require("../controller");
const {
  generateRandomNumber,
  toPersianDigits,
  setAccessToken,
  setRefreshToken,
  verifyRefreshToken,
  getUserCartDetail,
} = require("../../../../utils/functions");
const createError = require("http-errors");
const { UserModel } = require("../../../models/user");
const Kavenegar = require("kavenegar");
const CODE_EXPIRES = 30 * 1000; //90 seconds in miliseconds
const { StatusCodes: HttpStatus } = require("http-status-codes");
const path = require("path");
const { ROLES } = require("../../../../utils/constants");
const {
  checkOtpSchema,
  completeProfileSchema,
  updateProfileSchema,
} = require("../../validators/user/user.schema");
const { PaymentModel } = require("../../../models/payment");

class userAuthController extends Controller {
  constructor() {
    super();
    this.code = 0;
    this.phoneNumber = null;
    this.expiresIn=0
  }
  async getOtp(req, res) {
    //get mobile number
    let { phoneNumber } = req.body;
    //if the user did not sent a mobile number
    if (!phoneNumber)
      throw createError.BadRequest("mobile number is not valid");

    phoneNumber = phoneNumber.trim();
    //put the phoneNumber an code in constructor section to enabled to use by other methods here 
    this.phoneNumber = phoneNumber;
    this.code = generateRandomNumber(6);
    //saveUser method check if the user registerd before just update otp field and if user is new make a 
    //new user
    const result = await this.saveUser(phoneNumber);
    if (!result) throw createError.Unauthorized("some problem occured");
    // send OTP
    //the under code is for when that you want to use kavehnegar
    //this.sendOTP(phoneNumber, res);
    //the under codes is when you want to use fake OTP codes
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: `submit code is sent to ${this.phoneNumber} mobile number`,
        expiresIn: this.expiresIn,
        phoneNumber,
      },
    });
  }
  async checkOtp(req, res) {
    await checkOtpSchema.validateAsync(req.body);
    const { otp: code, phoneNumber } = req.body;

    const user = await UserModel.findOne(
      { phoneNumber },
      { password: 0, refreshToken: 0, accessToken: 0 }
    );
    // .populate([
    //   {
    //     path: "Products",
    //     model: "Product",
    //     select: {
    //       title: 1,
    //       slug: 1,
    //       price: 1,
    //       icon: 1,
    //     },
    //     populate: [
    //       {
    //         // deeper
    //         path: "seller",
    //         model: "Seller",
    //         select: { name: 1, icon: 1 },
    //       },
    //     ],
    //   },
    // ]);

    if (!user) throw createError.NotFound("کاربری با این مشخصات یافت نشد");

    if (user.otp.code != code)
      throw createError.BadRequest("code is not true");

    if (new Date(`${user.otp.expiresIn}`).getTime() < Date.now())
      throw createError.BadRequest("code is expired");

    user.isVerifiedPhoneNumber = true;
    await user.save();

    // await setAuthCookie(res, user); // set httpOnly cookie
    await setAccessToken(res, user);
    await setRefreshToken(res, user);
    let WELLCOME_MESSAGE = `wellcome to Arman-shop`;
    if (!user.isActive)
      WELLCOME_MESSAGE =`wellcome to Arman-shop please complete your data`;

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: WELLCOME_MESSAGE,
        user,
      },
    });
  }
  async saveUser(phoneNumber) {
    const otp = {
      code: this.code,
      expiresIn: Date.now() + CODE_EXPIRES,
    };
    this.expiresIn=otp.expiresIn;
    //check if the user with this phoneNumber registered before or not
    const user = await this.checkUserExist(phoneNumber);
    //if user registered before update the user otp field in collection
    if (user) return await this.updateUser(phoneNumber, { otp });
    console.log("not repatative")
    // if the user not exist make a new user in user  collection
    return await UserModel.create({
      phoneNumber,
      otp,
      role: ROLES.USER,
    });
  }
  async checkUserExist(phoneNumber) {
    const user = await UserModel.findOne({ phoneNumber });
    return user;
  }
  //update the the fields (objectData) with the new values
  async updateUser(phoneNumber, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updatedResult = await UserModel.updateOne(
      { phoneNumber },
      { $set: objectData }
    );
    return !!updatedResult.modifiedCount;
  }
  //caveh nager config to send otp code
  sendOTP(phoneNumber, res) {
    //if you have kavehnegar API key, this the config of coveh negar
    const kaveNegarApi = Kavenegar.KavenegarApi({
      apikey: `${process.env.KAVENEGAR_API_KEY}`,
    });
    kaveNegarApi.VerifyLookup(
      {
        receptor: phoneNumber,
        token: this.code,
        template: "registerVerify",
      },
      (response, status) => {
        console.log("kavenegar message status", status);
        if (response && status === 200)
          return res.status(HttpStatus.OK).send({
            statusCode: HttpStatus.OK,
            data: {
              message: `کد تائید برای شماره موبایل ${toPersianDigits(
                phoneNumber
              )} ارسال گردید`,
              expiresIn: CODE_EXPIRES,
              phoneNumber,
            },
          });
          // if not response is an Error
        return res.status(status).json({
          statusCode: status,
          message: "OTP has not sent",
        });
      }
    );
  }
  async completeProfile(req, res) {
    await completeProfileSchema.validateAsync(req.body);
    //get the req.user from "verifyAccessToken" middleware
    const { user } = req;
    const { name, email } = req.body;

    if (!user.isVerifiedPhoneNumber)
      throw createError.Forbidden("please verify your mobile number");

    const duplicateUser = await UserModel.findOne({ email });

    if (duplicateUser)
      throw createError.BadRequest(
        "this email is already registered"
      );

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { name, email, isActive: true } },
      { new: true }
    );
    // await setAuthCookie(res, updatedUser);
    await setAccessToken(res, updatedUser);
    await setRefreshToken(res, updatedUser);

    return res.status(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      data: {
        message:  "information completed successfully",
        user: updatedUser,
      },
    });
  }
  async updateProfile(req, res) {
    const { _id: userId } = req.user;
    await updateProfileSchema.validateAsync(req.body);
    const { name, email, biography, phoneNumber } = req.body;

    const updateResult = await UserModel.updateOne(
      { _id: userId },
      {
        $set: { name, email, biography, phoneNumber },
      }
    );
    if (!updateResult.modifiedCount === 0)
      throw createError.BadRequest("server error");
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "user information updated successfully",
      },
    });
  }
  async refreshToken(req, res) {
    //retrun the "verifyRefreshToken" method is one id
    const userId = await verifyRefreshToken(req);
    const user = await UserModel.findById(userId);
    await setAccessToken(res, user);
    await setRefreshToken(res, user);
    return res.status(HttpStatus.OK).json({
      StatusCode: HttpStatus.OK,
      data: {
        user,
      },
    });
  }
  async getUserProfile(req, res) {
    const { _id: userId } = req.user;
    console.log(req.headers.cookie.accessToken)
    const user = await UserModel.findById(userId, { otp: 0 });
    const cart = (await getUserCartDetail(userId))?.[0];
    const payments = await PaymentModel.find({ user: userId });

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        user,
        payments,
        cart,
      },
    });
  }
  logout(req, res) {
    const cookieOptions = {
      maxAge: 1,
      expires: Date.now(),
      httpOnly: true,
      signed: true,
      sameSite: "Lax",
      secure: true,
      path: "/",
      domain:
        process.env.NODE_ENV === "development" ? "localhost" : ".fronthooks.ir",
    };
    //set two cookie in response with null value(accessToken, refreshToken)
    res.cookie("accessToken", null, cookieOptions);
    res.cookie("refreshToken", null, cookieOptions);

    return res.status(HttpStatus.OK).json({
      StatusCode: HttpStatus.OK,
      roles: null,
      auth: false,
    });
  }
}

module.exports = {
  UserAuthController: new userAuthController(),
};
