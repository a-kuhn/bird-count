const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = "Invalid email address."

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last name name is required"],
      },
    // https://www.npmjs.com/package/mongoose-type-email
    email: {
      type: mongoose.SchemaTypes.Email,
      required: [true, "Email is required"],
      // validate: {
      //   validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      //   message: "Please enter a valid email"
      // }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"],
    },
    /*
    TODO:
    masterlist: [BirdSchema], <-- need to create BirdSchema
    checklists: [ChecklistSchema], <-- need to create ChecklistSchema
    */
  },
  { timestamps: true },
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;