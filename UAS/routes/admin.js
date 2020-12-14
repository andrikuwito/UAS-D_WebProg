const router = require('express').Router();
const Produk = require("../model/produk");

// Admin section
router.get('/', async (req, res, next) => {
    res.redirect('/admin/dashboard');
});

// Admin Dashboard
router.get('/dashboard', async (req, res) => {
    // collate data for dashboard
    const dashboardData = {
        productsCount: await Product.countDocuments({
            productPublished: true
        })//,
    };
    
    res.render('admin/dashboard', {
        judul: 'Cart Dashboard',
        session: req.session,
        role: "admin",
        dashboardData
    })
});

// Require the controllers
const product_controller = require('../controllers/product-controller');
const { findById } = require('../model/produk');

// a simple test url to check that all of our files are communicating correctly.
router.get('/products', /* product_controller.allProducts, */ async (req, res) => {
    await Produk.find(function(err, products){
        if(err) {
            console.log(err);
        }else{
            res.render('admin/products', {
                judul: 'Cart - Products',
                products: products,
                totalItemCount: products.totalItems
            });
            console.log(products);
        }
    });
});

router.get('/products/create', async (req, res) => {

    res.render('admin/product-new', {
        judul: 'New Product',
        session: req.session,
        title: 'title',
        publisher: 'publisher',
        description: 'description',
        developer: 'developer',
        release: 'release',
        tags: 'tags',
        rating: 'rating',  
        platform: 'platform',
        price: 'price',
        img:['img'],
        role: 'role',
        message: 'message'
    });
});

router.get('/products/:id/update',  async(req, res, next) => {
    Produk.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.render('admin/product-edit', {
            judul: 'Edit Product',
            session: req.session,
            title: product.title,
            publisher: product.publisher,
            description: product.description,
            developer: product.developer,
            release: product.release,
            tags: product.tags,
            rating: product.rating,  
            platform: product.platform,
            price: product.price,
            img: product.img,
            role: product.role
        });
    })
});

router.get('/products/:id', product_controller.product_details);

module.exports = router;