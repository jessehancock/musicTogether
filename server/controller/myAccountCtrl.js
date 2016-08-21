var app = require("../index.js");
var db = app.get('db');


//CRUD FUNCTIONS
//I update the parent and create children with an id from the parent
module.exports = {
    getCurrentUserKids: function(req, res, next){
      db.get_current_user_kids(req.params.id, function(err, response){
        if(err)res.send(err);
        res.send(response);
      });
    }
};
