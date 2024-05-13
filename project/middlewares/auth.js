const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(!token) return res.status(401).send();
        jwt.verify(token, process.env.SECRET);
        next();
    }catch(err){
        console.log(err);
        res.status(401).send();
    }
}

module.exports = {
    auth
}