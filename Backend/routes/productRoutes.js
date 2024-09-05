import  express from 'express'
import { isAdmin, protectdSignIn } from '../middlewares/authMiddleware.js';

import { addProductController,  deleteProductController, filterProductController, getAllProductsController, getOneProductController,  photoProductController, productCategoryController, productCountController, productListController, searchProductController, similarProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable'

const router = express.Router();

//routes
//Add Product route
router.post('/add-product' , protectdSignIn, isAdmin, formidable(), addProductController);

//get all products
router.get('/get-products', getAllProductsController)

//get single product
router.get('/get-product/:slug', getOneProductController)

//get photo with id
router.get('/photo-product/:id', photoProductController)

//delete product
router.delete('/delete-product/:id', protectdSignIn, isAdmin, deleteProductController)

//update product route
router.put('/update-product/:id', protectdSignIn, isAdmin, formidable(), updateProductController)

//filter products
router.post('/filter-product', filterProductController)

//product count
router.get('/product-count', productCountController )

//paging for product
router.get('/product-list/:page', productListController)

//search for product
router.get('/search-product/:keyword', searchProductController)

//similar items
router.get('/similar-products/:pid/:cid', similarProductController)

//Products by category
router.get('/product-category/:slug', productCategoryController) 

//payment token routes
//router.get('/braintree/token', braintreeTokenController)

//payment route
//router.post('/braintree/payment', protectdSignIn, braintreePaymentController)

export default router;