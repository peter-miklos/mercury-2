let mongoose = require('mongoose');
    Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

let ProductSchema = new Schema({
  category: {type: String, required: true},
  group: {type: String, required: true},
  name: {type: String, required: true},
  price: {
    type: mongoose.Schema.Types.Double,
    validate: {
      validator: function(v) {
        return v > 0.01;
      },
      message: "Price cannot be less than 0.01"
    },
    required: true},
  origin: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
})

ProductSchema.pre('save', next => {
  if(!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
})

mongoose.model('Product', ProductSchema);
