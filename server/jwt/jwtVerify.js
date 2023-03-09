import jwt from "jsonwebtoken"

export const jwtVerify = (token,key) => {
    return new Promise((resolve,reject) => {
        jwt.verify(token,key,(err,userInfo) => {
            if (err){
                reject(err);
                return
            }
            resolve(userInfo);
        })
    })
}