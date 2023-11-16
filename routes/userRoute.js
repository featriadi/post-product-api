const { Router } = require('express')
const {
    register,
    login,
    refreshToken,
} = require('../controllers/userController')

const router = Router()

router.post('/auth/register', register)
router.post('/auth/login', login)
router.post('/auth/refresh-token', refreshToken)

module.exports = router
