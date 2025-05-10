const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
    index: true
  },
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  iconUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  buyLink: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
