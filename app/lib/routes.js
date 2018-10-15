import React,{Component} from 'react';
import {View,AsyncStorage} from 'react-native';
import { Spinner} from 'native-base';
import { NavigationActions,StackActions } from 'react-navigation';
import db from './db';
class App extends Component {
    async componentWillMount(){
        let values = JSON.parse(await db.getData());
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
          }).then(() => {
            this.setState({ready: true});
          });
        if(values==null || values.logedin==false){
            var navigate = 'Login';
        }else{
            /*
            if(values.type=="2")
            {
                var navigate = 'HomeTeacher';
            }else if(values.type=="3"){
                var navigate = 'HomeStudent';
            }else{
                var navigate = 'HomeParent';
            }
            */
           var navigate = 'HomeCompany';
        } 
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: navigate })],
          });
          this.props.navigation.dispatch(resetAction);
        
    }
    render(){
        return <View><Spinner color='blue'/></View>
    }
}
export default App;