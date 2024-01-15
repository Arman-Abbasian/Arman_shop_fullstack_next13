const expressAsyncHandler = require("express-async-handler");
const {
  UserController,
} = require("../../http/controllers/admin/user/user.controller");

const router = require("express").Router();

router.get("/list", expressAsyncHandler(UserController.getAllUsers));
router.get("/:userId", expressAsyncHandler(UserController.userProfile));

module.exports = {
  userAdminRoutes: router,
};
