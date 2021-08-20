const jwt = require("jsonwebtoken");


const JWT_SIGN_SECRET = '0rgrurzoziehrgvdcfsgdgdhe9237hdgs24hdvsdqsgdfevcsvsv'


module.exports = {
    genarateTokenForUser : function(userData){
        return jwt.sign({
            userId : userData.userId,
            isAdmin:userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn:'24h'
        }
        )
    }
}