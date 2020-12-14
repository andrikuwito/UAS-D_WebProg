const router = require('express').Router();
const Produk = require("../model/produk");
const alert = require('alert');
// Require the controllers
const product_controller = require('../controllers/product-controller');

router.get('/:id', product_controller.product_details);

router.post('/create', product_controller.product_create);

router.post('/:id/update', product_controller.product_update);

router.post('/:id/delete', async (req, res) => {

    const product = await Produk.findOne({ _id: req.params.id });
    if(!product){
        res.status(400).json({ message: 'Failed to remove game' });
        return;
    }

    try{
        // Delete the variant
        await Produk.deleteOne({ _id: product._id }, {});
        res.status(200).json({ message: 'Successfully removed game' });
    }catch(ex){
        res.status(400).json({ message: 'Failed to remove game. Please try again' });
    }
});


module.exports = router;