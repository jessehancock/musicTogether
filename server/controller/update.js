var app = require("../index.js");
var db = app.get('db');


//CRUD FUNCTIONS
//I update the parent and create children with an id from the parent
module.exports = {
  addToCourse: function(req,res,next){

    db.update_child_schedule(req.body.course, req.body.child, function(err, response)
    // db.child.update({id: req.body.name, schedule: req.body.course}, function(err, response)
      {
      if(err) res.status(500).send(err);
      else res.status(200).send(response);
      });


      }



    // db.child.update({id: req.body.name, schedule: req.body.class}, function(err, response)







};
