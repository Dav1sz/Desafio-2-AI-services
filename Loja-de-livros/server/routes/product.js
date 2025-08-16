import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

//middlewares
import { requireSignIn, isAdmin } from '../middlewares/auth.js';

//controllers
import {
    create,
    list,
    read,
    photo,
    remove,
    update,
    filteredProducts,
    productsCount,
    listProducts,
    productSearch,
    relatedProducts,
} from '../controllers/product.js';

router.post('/product', requireSignIn, isAdmin, formidable(), create);
router.get('/products', list);
router.get('/product/:slug', read);
router.get('/product/photo/:productId', photo);
router.delete('/product/:productId', requireSignIn, isAdmin, remove);
router.put('/product/:productId', requireSignIn, isAdmin, formidable(), update);
router.post('/filtered-products', filteredProducts);
router.get('/products-count', productsCount);
router.get('/list-products/:page', listProducts);
router.get('/products/search/:keyword', productSearch);
router.get('/related-products/:productId/:categoryId', relatedProducts);

export default router;

