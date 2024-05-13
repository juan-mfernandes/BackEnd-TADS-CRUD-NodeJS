const express = require('express');
const userRouter = express.Router();
const { findUserByEmail } = require('../project/db/users');
const { prisma } = require('../project/db/prisma');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRouter.post("/register", async(req, res) => {
    const data = req.body;
    const userExist = await findUserByEmail(data.email);
    if (userExist) return res.status(400).send("User alredy exists.");
    const password = data.password;
    const saltRouds = 10;
    const salt = bcrypt.genSaltSync(saltRouds); 
    const hash = bcrypt.hashSync(password, salt);
    const userR = await prisma.users.create({
        data: {
            email : data.email,
            password : hash
        }
    });
    // delete password methods
    // userR.password = undefined;
    delete userR.password;
    res.json(userR);
});

userRouter.post("/login", async (req, res) => {
    const data = req.body.email;
    const user = await findUserByEmail(data);
    if (!user) return res.status(401).send("Invalid credentials.");
    const password = req.body.password;
    const encryptedPassword = user.password;
    const samePassword = bcrypt.compareSync(password, encryptedPassword);
     if(!samePassword) return res.status(401).send("Invalid credentials.");
    const token = jwt.sign({id: user.id, email: user.email, password: user.password}, process.env.SECRET);
    res.json({
        success: true,
        token
    });
});


module.exports = { userRouter }

// continuar videoaula: 44:21T