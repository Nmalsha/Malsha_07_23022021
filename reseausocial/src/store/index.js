
import { createStore } from 'vuex'
var Promise = require('es6-promise').Promise;

const axios = require ('axios'); 

const instance = axios.create({
baseURL :'http://localhost:3000/'
});

const store = createStore({
  state: {
    status:'',
    user:{
      userId:-1,
      token:'',
    },

  },
  mutations: {
    setStatus: function (state,status){
state.status = status;
    },
    logUser: function (state,user){
      state.user = user;
    },
  },
  actions: {
    login : ({commit},userInfors)=>{
      commit;('setStatus','loading');
      return new Promise ((resolve,reject)=>{
       
        instance.post('/login',userInfors)
          .then(function(reponce){
            commit;('setStatus','');
            commit;('logUser',reponce.data);
            resolve(reponce);
          })
        
        .catch(function(error){
          commit;('setStatus','error_loggin');
          reject(error);
        });
      });
    },


   CreateAccount  ({commit},userInfors){
      console.log(userInfors)
      return new Promise ((resolve,reject)=>{
        commit;
        instance.post('/CreateAccount',userInfors)
        
          .then(function(res){
            console.log(res.data.userInfors)
            commit;('setStatus','created');

            resolve();
        })
        
        .catch(function(error){
          commit;('setStatus','error_create');
         
          reject(error);
          console.log('reject')
        });
        
      });
    }
  }
  
})

export default store;
