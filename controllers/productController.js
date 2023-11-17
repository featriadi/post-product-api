require('dotenv').config()
const Validator = require("fastest-validator")
const v = new Validator()

const Product = require('../models').Product

async function getProducts(req, res) {
    try {
        const products = await Product.findAll({
            where: { deletedAt: null },
            attributes: ['id', 'product_name', 'description', 'price'],
            order: [['id', 'ASC' ]]
        })

        return res.status(200).json({
            message: 'Data successfully retrieved',
            data: products
        })
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message,
        })
    }
}

async function getProductById(req, res) {
    try {
        const id = req.params.id
        const product = await Product.findOne({
            where: { id },
            attributes: ['id', 'product_name', 'description', 'price'],
        })

        if(!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Data not found'
            })
        }

        return res.status(200).json({
            message: 'Data successfully retrieved',
            data: product
        })
    } catch (error) {
        return res.status(400).json({
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

        const createProduct = await Product.create(data)

        return res.status(201).json({
            message: 'Data successfully created',
            data: {
                id: createProduct.id,
                product_name: createProduct.productName,
                description: createProduct.description,
                price: createProduct.price,
            }
        })
    } catch (error) {
        return res.status(400).json({
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

        const product = await Product.findByPk(req.params.id)

        if(!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Data not found',
            })
        }

        const {
            product_name,
            description,
            price,
        } = req.body

        await product.update({
            productName: product_name,
            description,
            price,
            updatedAt: Date.now(),
        })

        return res.status(200).json({
            message: 'Data successfully updated',
            data: {
                id: product.id,
                product_name: product.productName,
                description,
                price,
                updated_at: product.updatedAt
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message,
        })
    }
}

async function softDeleteProduct(req, res) {
    try {
        const product = await Product.findByPk(req.params.id)

        if(!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Data not found',
            })
        }

        if(product.deletedAt !== null) {
            return res.status(400).json({
                status: 'error',
                message: 'Data already deleted',
            })
        }

        await product.update({
            deletedAt: Date.now()
        })

        return res.status(200).json({
            message: 'Data successfully deleted',
            data: {
                id: product.id,
                deleted_at: product.deletedAt,
            }
        })
    } catch (error) {
        return res.status(400).json({
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
