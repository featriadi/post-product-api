require('dotenv').config()
const Validator = require("fastest-validator")
const v = new Validator()

async function getProducts(req, res) {
    try {
        return res.status(200).json({
            status: 'success',
            data: {
                Products: 'ok'
            }
        })
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: error.message,
        })
    }
}

async function getProductById(req, res) {
    try {
        return res.status(200).json({
            status: 'success',
            data: {
                Products: 'ok'
            }
        })
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: error.message,
        })
    }
}

async function createProduct(req, res) {
    try {
        const schema = {
            product_name: 'string|empty:false',
            description: 'string|empty:false',
            price: 'number|empty:false',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({
                status: 'error',
                message: validate
            })
        }

        const data = {
            productName: req.body.product_name,
            description: req.body.description,
            price: req.body.price,
        }

        const createProduct = null // create new post record

        return res.status(200).json({
            status: 'success',
            data: {
                Products: 'ok'
            }
        })
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: error.message,
        })
    }
}

async function updateProduct(req, res) {
    try {
        const schema = {
            product_name: 'string|empty:false',
            description: 'string|empty:false',
            price: 'number|empty:false',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({
                status: 'error',
                message: validate
            })
        }

        const id = req.params.id

        const product = true // get product record

        if(!product) {
            return res.status(404).json({
                status: 'error',
                message: 'product record not found',
            })
        }

        const {
            product_name,
            description,
            price,
        } = req.body

        // update product record

        return res.status(200).json({
            status: 'success',
            data: {
                Products: 'ok'
            }
        })
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: error.message,
        })
    }
}

async function softDeleteProduct(req, res) {
    try {
        const id = req.params.id

        const product = true

        if(!product) {
            return res.status(404).json({
                status: 'error',
                message: 'product record not found',
            })
        }

        // update product record deleted_at to date now()

        return res.status(200).json({
            status: 'success',
            data: {
                Products: 'ok'
            }
        })
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: error.message,
        })
    }
}

module.exports = {
    getProducts, 
    getProductById,
    createProduct,
    updateProduct,
    softDeleteProduct,
}
