const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('../models/db')
let users = []
let tokenList = [];
const config = require('../config.json')
/* GET loginView*/

module.exports.Logout = function (req, res) {
    req.session.destroy((err) => {
        res.status(200);
        res.json({
            "message": "success"
        });
    })
}

/* Post login*/
module.exports.Login = async (req, res) => {
    console.log("userController: POST Login")
    let Authorised = false;
    let dbUser = await db.User.findOne().where('name').equals(req.body.name).exec();
    if (dbUser != null && dbUser.name !== null) {
        Authorised = bcrypt.compare(req.body.password, dbUser.password);
    } else {
        Authorised = false;
    }

    console.log("Is Authorised " + Authorised);

    if (Authorised) {
        req.session.loggedin = true;
        req.session.username = dbUser.name;
        req.session.userId = dbUser.id
        res.redirect("/workout/list");
    } else {
        res.send(400, "{\"message\": \"Incorrect username and/or password\"}");
    }

}


/* Post add new user */
module.exports.AddNewUser = async (req, res) => {
    console.log("userController: POST New User")
    console.log("userController: Encrypting password");
    //let user = {}
    await bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                throw err
            } else {
                console.log(hash)
            }

            console.log(req.body.name + ", " + hash)
            //user = {name: req.body.name, password: hash};

            var user = new db.User();
            user.name = req.body.name;
            user.password = hash;
            
            // Save the new model instance, passing a callback
                user.save(function(err, user) {
                    if (err) {
                        console.log(err)
                        res.locals.alreadyExist = true;
                        res.redirected = true;
                        res.redirect(200, "signup");
                    }else{
                        console.log("rendering thank you");
                        res.redirected = true;
                        res.redirect(303, "ThankYou");
                    }
                });
        });
    });
}

// /* GET user list */
// module.exports.GetUserList = function (req, res) {
//     console.log("userController: GET user lists")
//     res.render("userList", {
//         title: "userList",
//         users
//     })
// };
