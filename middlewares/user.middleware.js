import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import users from '../models/user.model.js'

const userjwt = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(422).json({ error: "Not valid" })
    } else {

        const token = authorization.replace("Bearer ", "")
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                console.log(err)
                res.status(422).json({ error: "logout" })
            } else {
                const { _id } = payload
                users.findById(_id).then(saveusers => {
                    if (!saveusers) {
                        res.status(422).json({ error: "logout" })
                    } else {
                        res.user = saveusers
                    }
                })
            }

        })

    }
}

export default userjwt