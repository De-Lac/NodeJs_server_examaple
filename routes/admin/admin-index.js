// =======================
// ADMIN ROUTES 
// =======================
var express     = require('express');

var adminRoutes = express.Router(); 
module.exports = adminRoutes;

var admin_utilities=require('./admin-utilities');

// route middleware to verify a token
//adminRoutes.use(function(req, res, next){checkToken(req, res, next)});

// routes
adminRoutes.get('/setup', function(req, res)
    {
         admin_utilities.addDefaultUser()
            .then(function(user)
              {
               res.status(201).json({ success: true , 
                                      msg:"utente salvato", 
                                      data:user});
              })
            .catch(function(err)
              {                   
                res.status(400).json({ success: false , 
                                        msg:err.msg, 
                                        code:err.code,
                                        data:""}); 
              });
    });


adminRoutes.get('/users', function(req, res)
    {
         admin_utilities.getAllUsers()
            .then(function(users)
              {
               res.status(201).json({ success: true , 
                                      msg:"lista di tutti gli utenti", 
                                      data:users});
              })
            .catch(function(err)
              {
                 res.status(400).json({ success: false , 
                                        msg:err, 
                                        data:""}); 
              });
    });




/* check if the token is valid, and if the user has the 'Admin' role */
function checkToken (req, res, next) 
{

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) 
   {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) 
        {
         return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } 
      else 
      {
        req.decoded = decoded;   
        //      console.log(decoded);
        //      sono un amministratore?
        var is_admin = decoded['_doc'].admin;
        console.log("sono un admin? "+is_admin);
        if (is_admin)
            { next(); /* procedi */}
        else
            {
             res.status(401).json({ success: false, message: 'non sei autorizzato ad utilizzare questa route' }); 
            /* no next(), quindi si ferma qui */
            }
      }
    });

  }   
 else 
  { //  there is no token
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
}