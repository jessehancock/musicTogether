var app = require("../index.js");
var db = app.get('db');



//CRUD FUNCTIONS
//I update the parent and create children with an id from the parent
module.exports = {
    getSchedule: function(req, res, next){
      db.get_class_schedule(function(err, schedule){
        if(err) res.status(500).send(err);
        else res.status(200).json(schedule);
      });
    }
    
};
