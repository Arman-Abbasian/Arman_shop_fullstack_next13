const expressAsyncHandler = require("express-async-handler");
const { CartController } = require("../http/controllers/cart/cart.controller");
const { verifyAccessToken } = require("../http/middlewares/user.middleware");
const router = require("express").Router();

router.post("/add", verifyAccessToken,expressAsyncHandler(CartController.addToCart));
router.post("/remove", verifyAccessToken,expressAsyncHandler(CartController.removeFromCart));
router.post("/coupon",verifyAccessToken ,expressAsyncHandler(CartController.addCouponToCart));
router.delete(
  "/coupon",
  expressAsyncHandler(CartController.removeCouponFromCart)
);
module.exports = {
  cartRoutes: router,
};
