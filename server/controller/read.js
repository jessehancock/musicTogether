var app = require("../index.js");
var db = app.get('db');



//CRUD FUNCTIONS
//I update the parent and create children with an id from the parent
module.exports = {
    getCurrentUserKids: function(req, res, next){
      db.get_current_user_kids(req.params.id, function(err, response){
        if(err) res.status(500).send(err);
        else res.status(200).json(response);
      });
    },
    getSchedule: function(req, res, next){
      db.get_class_schedule(function(err, schedule){
        if(err) res.status(500).send(err);
        else res.status(200).json(schedule);
      });
    },
    displayCurrentChildSchedule: function(req, res, next){
      var scheduleArr = [];
      var getScheduleCb = function(err, response){
        scheduleArr.push(response[0]);
        if(scheduleArr.length === req.body.length){
          res.status(200).send(scheduleArr);
        }
      };

      for(var i = 0; i < req.body.length; i++){
        db.get_child_schedule(req.body[i].schedule_id, getScheduleCb);
      }
    }
};
