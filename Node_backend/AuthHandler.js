// let session = require('express-session');
// loggedIn = function (req) {
//     if (req.session != null) {
//         let loggedIn = req.session.loggedin;

//         if (loggedIn) {
//             return req.session.username;
//         }
//     }
//     return null;
// }

const db = require("./models/db")

module.exports._getAuthor = function (req, res, callback) {
    if (req.payload && req.payload.email) {
        db.User
            .findOne({ email: req.payload.email })
            .exec(function (err, user) {
                if (!user) {
                    res.status(404).json({ "message": "User not found" });
                    return;
                } else if (err) {
                    console.log(err);
                    res.status(404).json({ "message": err });
                    return;
                }
                callback(req, res, user.id);
            });
    } else {
        res.status(404).json({ "message": "User not found" });
        return;
    }
}; 