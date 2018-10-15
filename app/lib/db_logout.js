import {AsyncStorage} from 'react-native';
/*
AsyncStorage.removeItem("user", (err) => {
    console.log("removed");
  // keys k1 & k2 removed, if they existed
  // do most stuff after removal (if you want)
});
*/
const db=()=>{AsyncStorage.getItem('user', (err, result) => {
            var value = JSON.stringify({
                    id: null,
                    logedin:false,
                    username:null,
                    password:null,
                    level:null,
                    url:'http://localhost/'
            });
            AsyncStorage.setItem('user',value);
        });
    }
export default db;