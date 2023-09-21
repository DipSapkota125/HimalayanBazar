import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "please field fullName!"],
    },
    email: {
      type: String,
      required: [true, "please field email!"],
      unique: [true, "email already exists!"],
    },
    mobileNo: {
      type: Number,
      required: [true, "please field email!"],
      unique: [true, "mobileNo already exists!"],
    },
    password: {
      type: String,
      required: [true, "please field password!"],
      select: false,
    },

    avatar: {
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["admin", "user", "seller", "buyer"],
      default: "user",
    },
    verified: {
      type: String,
      default: false,
    },
    // resetPasswordToken: String,
    // resetPasswordExpire: Date,
  },
  { timestamps: true }
);

//hashed password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//generate token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

//compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = new mongoose.model("user", userSchema);
export default User;
