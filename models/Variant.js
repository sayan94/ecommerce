const mongoose = require('mongoose');
const { Schema } = mongoose;

const variantSchema = new Schema ({
    productId: String,
    productName: String,
    variantName : String,
    description : String,
    images: [String],
    price: Number,
    discountedPrice: Number,
    isDeleted : Boolean,
    isPurchasable: Boolean
});

mongoose.model('variant', variantSchema);
