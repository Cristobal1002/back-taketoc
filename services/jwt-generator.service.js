const jwt = require('jsonwebtoken');

const jwtGenerator = (uid = '', business = '') => {
    
    return new Promise( (resolve, reject)=>{

        const payload = { uid, business };

        jwt.sign(payload, process.env.ENCRYPTION_KEY, {
            expiresIn: '4h'
        },(err, token)=>{
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve( token );
            }
        })

    })
}

module.exports = {
    jwtGenerator
}