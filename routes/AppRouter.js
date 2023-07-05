const Router = require("express").Router();
const UserRouter = require("./UserRouter");
const AuthRouter = require("./AuthRouter");
const TestRouter = require("./TestRouter");

Router.use("/auth", AuthRouter);
Router.use("/users", UserRouter);
Router.use("/test", TestRouter);

module.exports = Router;
