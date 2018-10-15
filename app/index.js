import React,{Component} from 'react';
import { createStackNavigator,NavigationActions } from 'react-navigation';//npm install --save react-navigation
import Routes from './lib/routes';
import Login from './commons/Login';
import HomeCompany from './page/Home_company';
/*
const App = StackNavigator({
        Routes : {screen:Routes,navigationOptions:{header:null}},
        Login : {screen:Login,navigationOptions:{header:null}},
        HomeCompany : {screen:HomeCompany,navigationOptions:{header:null}}
});
export default App;
*/
export default createStackNavigator({
    Routes : {screen:Routes,navigationOptions:{header:null}},
    Login : {screen:Login,navigationOptions:{header:null}},
    HomeCompany : {screen:HomeCompany,navigationOptions:{header:null}}
});
  
