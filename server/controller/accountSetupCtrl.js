var app = require("../index.js");
var db = app.get('db');


//CRUD FUNCTIONS
//I update the parent and create children with an id from the parent
module.exports = {
    postUser: function(req, res, next) {
        db.parent.update({
            id: req.user.id,
            phone: req.body.parent.phone,
            email: req.body.parent.email,
            new_user: false
        }, function(err, updated) {
            var updatedUser = updated;
            for (var i = 0; i < req.body.children.length; i++) {
                db.child.save({
                    name: req.body.children[i].name,
                    birthdate: req.body.children[i].birthdate,
                    parent_id: req.user.id
                });
            }
            if (err) res.status(500).send(err);
            req.session.passport.user = updatedUser;
            res.status(200).send(updatedUser);
        });

    }
};
