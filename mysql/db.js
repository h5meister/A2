const db = require("./mysql")

const asyncQuery = (...args) => {
    return new Promise((resolve, reject) => {
        db.query(...args, (err, res) => {
            if (err) return reject(err)
            resolve(res)
        })
    })
}

module.exports = asyncQuery