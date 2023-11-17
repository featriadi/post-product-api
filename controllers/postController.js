require('dotenv').config()
const Validator = require("fastest-validator")
const v = new Validator()

const Post = require('../models/Post')

async function getPosts(req, res) {
    try {
        return res.status(200).json({
            status: 'success',
            data: {
                posts: 'ok'
            }
        })
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: error.message,
        })
    }
}

async function getPostById(req, res) {
    try {
        return res.status(200).json({
            status: 'success',
            data: {
                posts: 'ok'
            }
        })
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: error.message,
        })
    }
}

async function createPost(req, res) {
    try {
        const schema = {
            title: 'string|empty:false',
            description: 'string|empty:false',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({
                status: 'error',
                message: validate
            })
        }

        const data = {
            title: req.body.title,
            description: req.body.description,
        }

        const createPost = null // create new post record

        return res.status(200).json({
            status: 'success',
            data: {
                posts: 'ok'
            }
        })
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: error.message,
        })
    }
}

async function updatePost(req, res) {
    try {
        const schema = {
            title: 'string|empty:false',
            description: 'string|empty:false',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({
                status: 'error',
                message: validate
            })
        }

        const id = req.params.id

        const post = true // get post record

        if(!post) {
            return res.status(404).json({
                status: 'error',
                message: 'post record not found',
            })
        }

        const {
            title,
            description,
        } = req.body

        // update post record

        return res.status(200).json({
            status: 'success',
            data: {
                posts: 'ok'
            }
        })
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: error.message,
        })
    }
}

async function softDeletePost(req, res) {
    try {
        const id = req.params.id

        const post = true // get post record

        if(!post) {
            return res.status(404).json({
                status: 'error',
                message: 'post record not found',
            })
        }

        // update post record deleted_at to date now()

        return res.status(200).json({
            status: 'success',
            data: {
                posts: 'ok'
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
    getPosts, 
    getPostById,
    createPost,
    updatePost,
    softDeletePost,
}
