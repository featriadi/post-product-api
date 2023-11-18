const { Router } = require('express')
const { verifyToken } = require('../middlewares/tokenHandler')
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    softDeleteProduct,
} = require('../controllers/productController')

const router = Router()

router.get('/products', verifyToken, getProducts)
router.get('/product/:id', verifyToken, getProductById)
router.post('/product', verifyToken, createProduct)
router.put('/product/:id', verifyToken, updateProduct)
router.patch('/product/:id', verifyToken, softDeleteProduct)

module.exports = router
