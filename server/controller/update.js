var app = require("../index.js");
var db = app.get('db');


//CRUD FUNCTIONS
//I update the parent and create children with an id from the parent
module.exports = {
    addToCourse: function(req, res, next) {
        db.update_child_schedule(req.body.course, req.body.child, req.body.month_age, function(err, response) {
            if (err) res.status(500).send(err);
            else db.parent.update({
                id: req.body.parent_id,
                amount_due: req.body.amount_due
            }, function(error, resp) {
                if (error) res.status(500).send(error);
                else res.status(200).send(resp);
            });
        });
    },



    // db.child.update({id: req.body.name, schedule: req.body.class}, function(err, response)
    // TODO: Make it so the kids are updated as well as the parent.
    editUser: function(req, res, next) {
      var children = req.body.children;
        db.parent.update({
            id: req.body.id,
            email: req.body.email,
            name: req.body.name
        }, function(err, updated) {
            console.log(children);
            var updatedUser = updated;
            for (var i = 0; i < children.length; i++) {
                db.put_children_EA(children[i].c_id, children[i].name,
                  children[i].birthdate);
            }
            if (err) res.status(500).send(err);
            req.session.passport.user = updatedUser;
            res.status(200).send(updatedUser);
        });
    }





};
