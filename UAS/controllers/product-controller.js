const Product = require('../model/produk');
const mongoose = require('mongoose');
const alert = require('alert');

//Simple version, without validation or sanitation
exports.allProducts = function (req, res, next) {
    Product.find(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_create = function (req, res, next) {
    let product = new Product(
        {
            title: req.body.title,
            publisher: req.body.publisher,
            description: req.body.description,
            developer: req.body.developer,
            release: req.body.release,
            tags: req.body.tags,
            platform: req.body.platform,
            price: req.body.price,
            img:[req.body.img],
            role: req.body.role
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        
        res.status(200).json({
            message: 'New product successfully created'
        });
    })
};

exports.product_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_update = function (req, res, next) {
    console.log(mongoose.Types.ObjectId(Product.id));
    Product.findByIdAndUpdate(mongoose.Types.ObjectId(Product.id), {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};