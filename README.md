Questo file di readme, è stato scritto utilizzando il linguaggio [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links)


# NodeJs_server_examaple
Esempio di server in Nodejs, con: 
- autenticazione JWT
- Middleware per controllo ruolo sulle route Admin
- Mongoose per gli schemi DB
- promesse con il modello "q"
- organizzazione route divisa in diversi Router di Express


# ChangeLog
- 27/06/2017 -- aggiunto Winston come logger


# API esposte dal server:

/     
GET   /  
POST  /

/admin  (richiesto ruolo admin)  
GET   /admin/users  
GET   /admin/setup  

/api  
POST  /api/signup  
POST  /api/authenticate  


Le API rispondo con un messaggio strutturato nel seguente modo
- caso di successo
`{success: true, message: 'operazione completata',  data: {'token':'494jti4944'}}`
- caso di errore
`{ success: false, code: 'ERR_API_WRONG_PSW', message: 'autenticazione fallita' }`



# Codici Errore restituiti dal server
- ERR_API_NOT_FOUND - l'elemento cercato non esiste sul db
- ERR_API_WRONG_PSW - autenticazione fallita
- ERR_DB_DUPLICATE_KEY - si sta cercando di salvare un elemento già esistente



# Struttura file del server
```
--- index.js                / /file principale da eseguire
--- package.js
--+ routes
  |---- db-utilities.js      //funzioni condivise tra tutti, per interagire con il db
  |--+ admin
     |--- admin-index.js     //file principale del modulo Admin
     |--- admin-utilities.js //funzioni del modulo Admin       
  |--+ api  
     |--- api-index.js       //file principale del modulo Api
     |--- api-utilities.js   //funzioni del modulo Api
--+ models                   //schemi modelli Mongoose
  |--- User.js
```

Prima di avviare il server, installare le dipendenze con il comando  
`npm install`

poi avviarlo con il comando  
`node index.js`

oppure installate [https://github.com/foreverjs/forever](forever), per riavviare in automatico Node dopo una modifica, o dopo un crash. (-w sta per watch, cioè controlla se sono state salvate modifiche)  
`forever -w start index.js`



# Tutorial di riferimento Scotch.io
- [JWT e Node](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)
- [Mongoose e Node](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications)
- [Organizzare le route](https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers)

