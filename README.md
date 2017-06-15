# NodeJs_server_examaple
Esempio di server in Nodejs, con: 
- autenticazione JWT
- Middleware per controllo ruolo sulle route Admin
- Mongoose per gli schemi DB
- promesse con il modello "q"
- organizzazione route divisa in diversi Router di Express


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
  |---- db-utilities.js      //funzioni condivise da tutti, per interagire con il db
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



