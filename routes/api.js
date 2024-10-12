var express = require('express');
var router = express.Router();
const dbQuery = require('../mysql/db');

router.post('/register',  async function(req, res, next) {
    const { username, password } = req.body
    if (!username) {
        res.status(200).json({message: 'username is required', success: false})
    }
    if (!password) {
        res.status(200).json({message: 'password is required', success: false})
    }

    try {
        const sql = 'insert into shopping (username, password) values(?,?)'
        const result = await dbQuery(sql, [username, password])
        res.status(200).json({message: 'success', success: true})
    } catch (e) {
        res.status(200).json({message: 'fail', success: false})
    }

});

/* GET home page. */
router.post('/login', async function(req, res, next) {
    const { username, password } = req.body
    if (!username) {
        res.status(200).json({message: 'username is required', success: false})
    }
    if (!password) {
        res.status(200).json({message: 'password is required', success: false})
    }

    try {
        const sql = 'select * from shopping where username = ? and password = ?'
        const result = await dbQuery(sql, [username, password])
        if (result.length === 1) {
            res.status(200).json({message: 'success', success: true, data: result[0]})
        } else {
            res.status(200).json({message: 'user not found', success: false})
        }

    } catch (e) {
        res.status(200).json({message: 'fail', success: false})
    }
});

router.post('/forgot_password',  async function(req, res, next) {
    const { username } = req.body
    if (!username) {
        res.status(200).json({message: 'username is required', success: false})
    }

    try {
        const sql = 'select * from shopping where username = ?'
        const result = await dbQuery(sql, [username])
        if (result.length === 1) {
            res.status(200).json({message: 'success', success: true})
        } else {
            res.status(200).json({message: 'user not found', success: false})
        }

    } catch (e) {
        res.status(200).json({message: 'fail', success: false})
    }
});

router.post('/reset_password',  async function(req, res, next) {
    const { username, newPassword } = req.body
    if (!username) {
        res.status(200).json({message: 'username is required', success: false})
    }

    if (!newPassword) {
        res.status(200).json({message: 'newPassword is required', success: false})
    }

    try {
        const sql = 'select * from shopping where username = ?'
        const result = await dbQuery(sql, [username])
        if (result.length === 0) {
            res.status(200).json({message: 'user not found', success: false})
        }
        const updateSql = 'update shopping set password = ? where username = ?'
        const data = await dbQuery(updateSql, [newPassword, username])
        console.log(data)
        res.status(200).json({message: 'success', success: true})
    } catch (e) {
        res.status(200).json({message: 'fail', success: false})
    }
});

module.exports = router;
