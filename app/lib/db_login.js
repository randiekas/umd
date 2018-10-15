import {AsyncStorage} from 'react-native';
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
            url:'http://localhost/'
        });
        AsyncStorage.setItem('user',value);
    }
});
/*
AsyncStorage.removeItem("user", (err) => {
    console.log("removed");
  // keys k1 & k2 removed, if they existed
  // do most stuff after removal (if you want)
});
*/
const db = (responseData,url)=>{
    var value = JSON.stringify({
                id: 1,
                logedin:true,
                username:responseData.username,
                level:responseData.level,
            });
    AsyncStorage.setItem('user',value);
}
export default db;