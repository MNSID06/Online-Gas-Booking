const { roles } = require("../roles");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new Error("Email does not exist"));
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    await User.findByIdAndUpdate(user._id, { accessToken });
    res.status(200).json({
      data: {
        email: user.email,
        role: user.Role,
        name: user.name,
        password: user.password,
        id: user._id,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};


exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
      data: users,
    });
  };

  exports.getUser = async (req, rea, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) return next(new Error("User does not exist"));
        res.status(200).json({
          data: user,
        });
      } catch (error) {
        next(error);
      }
  }
  exports.updateUser = async (req, res, next) => {
    try {
      const update = req.body;
      const userId = req.params.id;
      await User.findByIdAndUpdate(userId, update).then(async (d) => {
        const user = await User.findById(userId);
        res.status(200).json({
          data: user,
          message: "User has been updated",
        });
      });
     
    } catch (error) {
      next(error);
    }
  };
  exports.deleteUser = async (req, res, next) => {
    debugger;
    try {
      const userId = req.params.id;
      console.log(req.params.id)
      await User.findByIdAndDelete(userId).then(async (d) => {
        const user = await User.findById(userId);
        res.status(200).json({
          data: user,
          message: "User been deleted",
        });
      });;
      // res.status(200).json({
      //   data: null,
      //   message: "User has been deleted",
      // });
    } catch (error) {
      next(error);
    }
  };
  