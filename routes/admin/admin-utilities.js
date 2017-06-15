var jwt         = require('jsonwebtoken');        // used to create, sign, and verify tokens
var User        = require('../../models/user');   // get our mongoose User model
var Q           = require('q');                   // Q promise
var config      = require('../../config');        // get our config file

var db_utilities=require('../db-utilities');

var admin_utilities = this;
// esporto api_utilities così posso utilizzare i suoi metodi e attributi,
// come fosse una libreria
module.exports = admin_utilities;




// =======================
// ERROR CODES
// =======================





// =======================
// FUNCTIONS
// =======================

/* ======================================== 
  Add the default admin user 
*/
this.addDefaultUser = function()
{
  var default_name = config['default-admin-name'];
  var default_npsw = config['default-admin-psw'];      
  return db_utilities.addUser({name    : default_name, 
                               password: default_npsw,
                               admin   : true
                              });  //ritorna una promessa
                           
}



/* ======================================== 
  Get list of all the users 
*/
this.getAllUsers = function() 
{
    var deferred = Q.defer();
    User.find({})
        .then(function(users) 
            { deferred.resolve(users); })
        .catch(function(err)
            { deferred.reject({code:"", msg:err});  });
    return deferred.promise;
}