const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['cakes', 'pastries', 'cookies', 'bread', 'other']
  },
  subCategory: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        const subCategories = {
          cakes: ['birthday', 'wedding', 'custom', 'cupcakes', 'cheesecakes'],
          pastries: ['croissants', 'danishes', 'pies', 'tarts', 'eclairs'],
          cookies: ['chocolate chip', 'sugar', 'shortbread', 'macarons', 'biscotti'],
          bread: ['sourdough', 'baguettes', 'rolls', 'whole wheat', 'rye'],
          other: ['seasonal', 'special', 'gluten-free', 'vegan']
        };
        return subCategories[this.category]?.includes(value);
      },
      message: 'Invalid subcategory for the selected category'
    }
  },
  image: {
    type: String,
    required: true
  },
  ingredients: [{
    type: String
  }],
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  preparationTime: {
    type: Number,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Virtual field to check if product is available
productSchema.virtual('isAvailable').get(function() {
  return this.stockQuantity > 0;
});

// Ensure virtuals are included in JSON output
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
