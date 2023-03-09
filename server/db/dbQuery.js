import {db} from "./db.js"

export const dbQuery = (sql,values) => {
    return new Promise((resolve, reject) => {
        db.query(sql,values, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}