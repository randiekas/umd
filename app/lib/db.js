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
                    username:null,
                    level:null,
                    url:'http://13.251.185.179/'
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
                    username:responseData.username,
                    level:responseData.level,
                });
        AsyncStorage.setItem('user',value);
    }
    this.setLogout = ()=>{
        var value = JSON.stringify({
                id: null,
                logedin:false,
                username:null,
                level:null,
                url:'http://13.251.185.179/'
            });
            AsyncStorage.setItem('user',value);
    }
    this.url        = "http://13.251.185.179/"
}
const db = new db();
export default db;