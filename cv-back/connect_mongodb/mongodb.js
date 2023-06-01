const mongoose = require('mongoose');
//import mongoose from 'mongoose' === ERROR
//fix error msg in console 
mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://boogysh:' + process.env.MONGO_DB_PASSWORD + '@cluster0.b69zikv.mongodb.net/?retryWrites=true&w=majority'
,
{ useNewUrlParser: true,
  useUnifiedTopology: true 
},)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//mongoose.set('strictQuery', false);
//   mongoose.set('strictQuery', true);
  // boogysh
  // Polobokkk  

 //