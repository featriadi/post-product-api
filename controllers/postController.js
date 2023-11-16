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

module.exports = { getPosts, getPostById }
