const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is required"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: [true, "The rol is required"],
  },
  state: {
    type: Boolean,
    required: [true, "The state is required"],
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});


/* Eliminar Datos que se muestran despues de guardar 
* es como un mapper en .net 
*/
UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);