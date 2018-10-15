import {AsyncStorage} from 'react-native';
/*
AsyncStorage.removeItem("user", (err) => {
    console.log("removed");
  // keys k1 & k2 removed, if they existed
  // do most stuff after removal (if you want)
});*/
function db(){
    this.init = ()=>{
        AsyncStorage.getItem('user', (err, result) => {
            if(result==null){
              var value = JSON.stringify({
                    id: null,
                    logedin:false,
                    id_profile:null,
                    nis:null,
                    email:null,
                    name:null,
                    gender:null,
                    image:null,
                    tingkat:null,
                    type:null,
                    url:'http://demo1.scola.id'
                });
                AsyncStorage.setItem('user',value);
            }
        });
    }
    this.getData = ()=>{ return AsyncStorage.getItem("user")};
    this.setLogin = (responseData,url)=>{
        var value = JSON.stringify({
                    id: 1,
                    logedin:true,
                    id_profile:responseData.id+'',
                    nis:responseData.nomor_induk+'',
                    email:responseData.email+'',
                    name:responseData.name+'',
                    gender:responseData.gender+'',
                    image:responseData.image+'',
                    type:responseData.type+'',
                    url:url+'',
                });
        AsyncStorage.setItem('user',value);
    }
    this.setLogout =()=>{AsyncStorage.getItem('user', (err, result) => {
            var value = JSON.stringify({
                    id: null,
                    logedin:false,
                    id_profile:null,
                    nis:null,
                    email:null,
                    name:null,
                    gender:null,
                    image:null,
                    tingkat:null,
                    type:null,
                    url:'http://demo1.scola.id'
            });
            AsyncStorage.setItem('user',value);
        });
    }
}
const db = new db();
export default db;