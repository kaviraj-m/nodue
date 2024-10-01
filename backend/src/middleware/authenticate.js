require('dotenv').config()

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NodueAuthoritie = require('../models/authoritie');
const NoDueStudentTable = require('../models/student');

const isAuthenticated = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res
            .status(401)
            .json({
                status: 401,
                message: 'no auth token provided'
            })
    }

    try {
        var result
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        let email = decoded.userPayload.email
        let type = decoded.userPayload.type

        if ( type !== 'student') {
            result =await NodueAuthoritie.findOne({
                where: {
                    email: email
                }
            })
        } else if ( type === 'student') {
            result =await NoDueStudentTable.findOne({
                where: {
                    mail_id: email
                }
            })
        }

        if (!result) {
            return res.json({
                status: 401,
                message: 'poda veliya'
            })
        }

        console.log(result)
        req.user = result
        // console.log(req.user)
        next()
    } catch(error) {
        return res
           .status(401)
           .json({
                status: 401,
                message: `invalid token ${error}`
            })
    }
}

module.exports = isAuthenticated