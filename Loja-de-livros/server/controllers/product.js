import Product from "../models/product.js";
import fs from 'fs';
import slugify from 'slugify';
import dotenv from 'dotenv';

dotenv.config();


export const create = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;

        const { photo } = req.files;

        //validation
        switch (true) {
            case !name.trim():
                return res.json({ error: "Nome é obrigatório" });
            case !description.trim():
                return res.json({ error: "Descrição é obrigatória" });
            case !price.trim():
                return res.json({ error: "Preço é obrigatório" });
            case !category.trim():
                return res.json({ error: "Categoria é obrigatória" });
            case !quantity.trim():
                return res.json({ error: "Quantidade é obrigatória" });
            case photo && photo.size > 1000000:
                return res.json({ error: "O tamanho da imagem deve ser menos que 1MB" });
        }

        //create product
        const product = new Product({ ...req.fields, slug: slugify(name) });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.json(product);

    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const list = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });

        res.json(products);
    } catch (err) {
        console.log(err);
    }
};

export const read = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");

        res.json(product);
    } catch (err) {
        console.log(err);
    }
}

export const photo = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).select("photo");
        if (product.photo.data) {
            res.set("Content-Type", product.photo.contentType);
            return res.send(product.photo.data);
        }
    } catch (err) {
        console.log(err);
    }
};

export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId)
            .select("-photo");
        res.json(product);
    } catch (err) {
        console.log(err);
    }
}


export const update = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;

        const { photo } = req.files;

        //validation
        switch (true) {
            case !name.trim():
                res.json({ error: "Nome é obrigatório" });
            case !description.trim():
                res.json({ error: "Descrição é obrigatória" });
            case !price.trim():
                res.json({ error: "Preço é obrigatório" });
            case !category.trim():
                res.json({ error: "Categoria é obrigatória" });
            case !quantity.trim():
                res.json({ error: "Quantidade é obrigatória" });
            case photo && photo.size > 1000000:
                res.json({ error: "O tamanho da imagem deve ser menos que 1MB" });
        }

        //update product
        const product = await Product.findByIdAndUpdate(
            req.params.productId,
            {
                ...req.fields,
                slug: slugify(name),
            },
            { new: true }
        );

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.json(product);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const filteredProducts = async (req, res) => {
    try {
        const { checked, radio } = req.body;

        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };
        console.log("args =>", args);

        const products = await Product.find(args);
        console.log('produtos encontrados na consulta de produtos filtrados =>', products.length);
        res.json(products);
    } catch (err) {
        console.log(err);
    }
};

export const productsCount = async (req, res) => {
    try {
        const total = await Product.find({}).estimatedDocumentCount();
        res.json(total);
    } catch (err) {
        console.log(err)
    }
}

export const listProducts = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;

        const products = await Product.find({})
            .select('-photo')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createAt: -1 });

        res.json(products)
    } catch (err) {
        console.log(err)
    }
}

export const productSearch = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ],
        }).select('-photo');

        res.json(results);
    } catch (err) {
        console.log(err);
    }
}

export const relatedProducts = async (req, res) => {
    try {
        const { productId, categoryId } = req.params;

        const related = await Product.find({
            category: categoryId,
            _id: { $ne: productId },
        })
            .select('-photo')
            .populate('category')
            .limit(3);

        res.json(related);
    } catch (err) {
        console.log(err);
    }
}
