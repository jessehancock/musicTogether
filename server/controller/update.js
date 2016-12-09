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
        db.parent.update({
            id: req.body.id,
            email: req.body.email,
            name: req.body.name
        }, function(error, resp) {
            if (error) res.status(500).send(error);
            else res.status(200).send(resp);
        });
    },

    editKids: function(req, res, next) {
      // dont know why thing gets turned into just the parent.
      var parent = req.body.parent;
      var thing = req.body.children;
      console.log(thing, parent);
        db.parent.update({
            id: req.body.id,
            email: req.body.email,
            name: req.body.name
        }, function(error, resp, thing) {
            console.log(resp, thing)
            if (error) res.status(500).send(error);
            else res.status(200).send(resp);
        });
    }




};
