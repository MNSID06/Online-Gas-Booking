const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is invalid");
        }
      },
    },
    Role: {
      type: String,
      required: true,
      enum: ['user', 'admin']
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      maxlength: 10,
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;


//authentication with jwt
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({_id: user._id.toString() }, "thisisanewproject");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
// //matching  passwords with bcrypt for successful login
// userSchema.statics.findByCredentials = async (email, password) => {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error("unable to login");
//   }
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error("unable to login");
//   }
//   return user;
// };


// //hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

