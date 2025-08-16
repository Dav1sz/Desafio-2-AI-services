import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        MaxLength: 160,
    },

    slug: {
        type: String,
        lowercase: true,
    },

    description: {
        type: {},
        trim: true,
        required: true,
        MaxLength: 2000,
    },

    price: {
        type: Number,
        trim: true,
        required: true,
    },

    category: {
        type: ObjectId,
        ref: 'Category',
        required: true,
    },

    quantity: {
        type: Number,
    },

    sold: {
        type: Number,
        default: 0,
    },

    photo: {
        data: Buffer,
        contentType: String,
    },
},
    { timestamps: true }
);

export default mongoose.model('Product', productSchema);