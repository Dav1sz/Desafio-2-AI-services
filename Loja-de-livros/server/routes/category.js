import express from 'express';

const router = express.Router();

//middlewares
import { requireSignIn, isAdmin } from '../middlewares/auth.js';

//controllers
import { create, update, remove, list, read, productsByCategory } from '../controllers/category.js';
import product from '../models/product.js';

router.post('/category', requireSignIn, isAdmin, create);
router.put('/category/:categoryId', requireSignIn, isAdmin, update);
router.delete('/category/:categoryId', requireSignIn, isAdmin, remove);
router.get('/categories', list);
router.get('/category/:slug', read);
router.get('/products-by-category/:slug', productsByCategory);

export default router;


//CRUD
// Create read update delete