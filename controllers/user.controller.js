import express from 'express'
import mongoose from 'mongoose'
import users from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export const SignUp = (req, res) => {

    const { fullname, email, password, confirmpassword, avatar, clubid } = req.body

    users.findOne({ $or: [{ email: email, fullname: fullname }] }).then(saveuser => {
        if (saveuser) {
            res.status(422).json({ erro: 'Users already exists' })
        } else {
            bcrypt.hash(password, 12).then((hashpass) => {
                users.create({
                    fullname: fullname,
                    email: email,
                    password: hashpass,
                    confirmPassword: hashpass,
                    avatar: avatar,
                    clubId: clubid
                }).then((users) => {
                    res.json('Singup Successfull')
                }).catch(error => {
                    console.log(error)
                    res.status(422).json({ error: "Please try again with unique details" })
                })
            })
        }
    })
}


export const SingIn = (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(422).json({ error: "There is an erro" })
    } else {
        users.findOne({ email }).then(saveuser => {
            if (!saveuser) {
            } else {
                bcrypt.compare(password, saveuser.password).then(match => {
                    if (!match) {
                        res.status(422).json({ error: "There is a error" })
                    } else {
                        const token = jwt.sign({ _id: saveuser._id }, process.env.JWT_SECRET)
                        res.json({ id: saveuser._id, token: token })
                    }
                })
            }
        })
    }
}

