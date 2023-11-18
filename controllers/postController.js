require('dotenv').config()
const Validator = require("fastest-validator")
const v = new Validator()

const Post = require('../models').Post

const { getUserId } = require('../middlewares/tokenHandler')

async function getPosts(req, res) {
    try {
        const posts = await Post.findAll({
            where: { deletedAt: null },
            attributes: ['id', 'title', 'description'],
            order: [['id', 'ASC' ]]
        })

        return res.status(200).json({
            message: 'Data successfully retrieved',
            data: posts
        })
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message,
        })
    }
}

async function getPostById(req, res) {
    try {
        const id = req.params.id
        const post = await Post.findOne({
            where: { id },
            attributes: ['id', 'title', 'description'],
        })

        if(!post) {
            return res.status(404).json({
                status: 'error',
                message: 'Data not found'
            })
        }

        return res.status(200).json({
            status: 'Data successfully retrieved',
            data: post
        })
    } catch (error) {
        return res.status(400).json({
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
            userId: getUserId(req.headers.authorization),
            title: req.body.title,
            description: req.body.description,
        }

        const createPost = await Post.create(data)

        return res.status(201).json({
            message: 'Data successfully created',
            data: {
                id: createPost.id,
                title: createPost.title,
                description: createPost.description
            }
        })
    } catch (error) {
        return res.status(400).json({
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

        const post = await Post.findByPk(req.params.id)

        if(!post) {
            return res.status(404).json({
                status: 'error',
                message: 'Data not found',
            })
        }

        const {
            title,
            description,
        } = req.body

        await post.update({
            title,
            description,
            updatedAt: Date.now(),
        })

        return res.status(200).json({
            message: 'Data successfully updated',
            data: {
                id: post.id,
                title,
                description,
                updated_at: post.updatedAt
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message,
        })
    }
}

async function softDeletePost(req, res) {
    try {
        const post = await Post.findByPk(req.params.id)

        if(!post) {
            return res.status(404).json({
                status: 'error',
                message: 'Data not found',
            })
        }

        if(post.deletedAt !== null) {
            return res.status(400).json({
                status: 'error',
                message: 'Data already deleted',
            })
        }

        await post.update({
            deletedAt: Date.now()
        })

        return res.status(200).json({
            message: 'Data successfully deleted',
            data: {
                id: post.id,
                deleted_at: post.deletedAt,
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
    getPosts,
    getPostById,
    createPost,
    updatePost,
    softDeletePost,
}
