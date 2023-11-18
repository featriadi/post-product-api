const { Router } = require('express')
const { verifyToken } = require('../middlewares/tokenHandler')
const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    softDeletePost,
} = require('../controllers/postController')

const router = Router()

router.get('/posts', verifyToken, getPosts)
router.get('/post/:id', verifyToken, getPostById)
router.post('/post', verifyToken, createPost)
router.put('/post/:id', verifyToken, updatePost)
router.patch('/post/:id', verifyToken, softDeletePost)

module.exports = router
