const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "The category is required"],
    unique: true,
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },

  //   Saber quien la creo
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

CategorySchema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject();
  category.uid = _id;
  return category;
};

module.exports = model("Category", CategorySchema);
