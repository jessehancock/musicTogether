
var app = require("../index.js");
var db = app.get('db');


//CRUD FUNCTIONS

module.exports ={
// create

// read
getSchedule: function(req, res, next){
  db.get_class_schedule(function(err, schedule){
    if(err) res.status(500).send(err);
    res.status(200).json(schedule);
  });
}
// update

// delete

};
