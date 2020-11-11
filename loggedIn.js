let session = require('express-session');
module.exports.loggedIn = function (req) {
    if (req.session != null) {
        let loggedIn = req.session.loggedin;

        if (loggedIn) {
            return req.session.username;
        }
    }
    return null;
}