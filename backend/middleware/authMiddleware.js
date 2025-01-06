const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  
  
    if (!token) {
        return res.status(401).json({ msg: 'Access denied. No token provided' });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid token' });
    }

};

module.exports = { verifyToken };
