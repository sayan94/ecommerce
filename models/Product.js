const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema ({
        name: String,
        description: String,
        images: [String],
        price: Number,
        discountedPrice: Number,
        attributes: {},
        isPurchasable: Boolean,
        type: String,
        isDeleted : Boolean
});

mongoose.model('product', productSchema);
