


const authorize = (permittedRole) => {
    return (req, res, next) => {
        if (permittedRole.includes(role)) {
            next();
        } else {
            return res.status(401).json({
                status: 401,
                message: 'You are not authorized!!'
            });
        }
    }
}


module.exports = { authorize }