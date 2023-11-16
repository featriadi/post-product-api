const { Router } = require('express')
const verifyToken = require('../middlewares/verifyToken')
const {
    getPosts,
    getPostById,
} = require('../controllers/postController')

const router = Router()

router.get('/posts', verifyToken, getPosts)
router.get('/post/:id', verifyToken, getPostById)

module.exports = router
