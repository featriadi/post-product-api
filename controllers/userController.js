require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Validator = require("fastest-validator")
const v = new Validator()

const Sequelize = require('sequelize')
const sequelize = require('../config/connection')
const User = require('../models/User')(sequelize, Sequelize.DataTypes)

async function register(req, res) {
    try {
        const schema = {
            name: 'string|empty:false',
            email: 'email|empty:false',
            password: 'string|min:6|empty:false',
        }
        const validate = v.validate(req.body, schema)

        if(validate.length) {
            return res.status(400).json({
                status: 'error',
                message: validate
            })
        }

        const user = await User.findOne({
            where: { email: req.body.email }
        })

        if(user) {
            return res.status(409).json({
                status: 'error',
                message: 'Email already exists'
            })
        }

        const password = await bcrypt.hash(req.body.password, 10)

        const data = {
            name: req.body.name,
            email: req.body.email,
            password: password,
        }

        const createUser = await User.create(data)

        return res.status(201).json({
            message: 'User successfully created',
            data: {
                id: createUser.id
            },
        })
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message,
        })
    }
}

async function login(req, res) {
    try {
        const schema = {
            email: 'email|empty:false',
            password: 'string|min:6|empty:false',
        }
        const validate = v.validate(req.body, schema)

        if(validate.length) {
            return res.status(400).json({
                status: 'error',
                message: validate
            })
        }

        const user = await User.findOne({
            where: { email: req.body.email }
        })

        if(!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Email is not exists'
            })
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password)

        if(!isValidPassword){
            return res.status(400).json({
                status: 'error',
                message: 'Password incorrect'
            })
        }

        const accessToken = jwt.sign({ data: user }, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED })
        const refreshToken = jwt.sign({ data: user }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED })

        return res.status(201).json({
            message: 'Access token and refresh token generated',
            data: {
                "user": user,
                "accessToken": accessToken,
                "refreshToken": refreshToken,
            },
        })
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message,
        })
    }
}

async function refreshToken(req, res) {
    try {
        const email = req.body.email
        const refreshToken = req.body.refresh_token

        if(!refreshToken || !email) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid token'
            })
        }

        jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if(err) {
                return res.status(403).json({
                    status: 'error',
                    message: err.message
                })
            }

            if(email != decoded.data.email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email is not valid'
                })
            }

            const accessToken = jwt.sign({ data: decoded.data }, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED })
    
            return res.status(200).json({
                message: 'Access token generated',
                data: {
                    "accessToken": accessToken,
                },
            })
        })

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message,
        })
    }
}

module.exports = {
    register,
    login,
    refreshToken
}
