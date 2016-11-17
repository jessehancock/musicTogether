var app = require("../index.js");
var db = app.get('db');


//CRUD FUNCTIONS
//I update the parent and create children with an id from the parent
module.exports = {
  addToCourse: function(req,res,next){
    db.update_child_schedule(req.body.course, req.body.child, req.body.month_age, function(err, response){
      if(err) res.status(500).send(err);
      else db.parent.update({id: req.body.parent_id, amount_due: req.body.amount_due}, function(error, resp){
        if(error) res.status(500).send(error);
        else res.status(200).send(resp);
      });



      });


    },



    // db.child.update({id: req.body.name, schedule: req.body.class}, function(err, response)

    editUser: function(req,res,next) {
      console.log(req.body);
      res.status(200).send(rep)
    }





};
