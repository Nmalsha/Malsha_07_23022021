
import { createStore } from 'vuex'
var Promise = require('es6-promise').Promise;

const axios = require ('axios'); 

const instance = axios.create({
baseURL :'https://restapi.fr/api/'
});

const store = createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    CreateAccount : ({commit},userInfors)=>{
      return new Promise ((resolve,reject)=>{
        commit;
        instance.post('/CreateAccount',userInfors)
          .then(function(reponce){
            resolve(reponce);
                  })
        
        .catch(function(error){
          reject(error);
                });
      });
      
      
    }
  }
  
})

export default store;
