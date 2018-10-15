import * as React from 'react';
import { View, Alert } from 'react-native';
import { Container, Content, Form, Label, Header, Item, Input, Icon, Button, Text, Spinner } from 'native-base';
import db from '../lib/db';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={user:{},isLoading:false,data:{}}
    const {navigate} = this.props.navigation;
    
    proc_logout = async ()=>{
      await db.setLogout();
      navigate('Routes');
    }
    proc_find   =()=>{
      this.setState({isLoading:true});
      
            fetch(db.url+"umd/detail?username="+this.state.user.username+"&techid="+this.state.text_techid,{
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({isLoading:false,data:{}});
                if(responseData.status=="exist"){
                  this.setState({data: responseData.data});
                }else{
                  Alert.alert(
                      'Not Found',
                      'Nopol tidak ditemukan',[{text: 'OK'}],
                      { cancelable: false }
                  )
                }
            })
            .done();
    }
    proc_save   =()=>{
      this.setState({isLoading:true});
      fetch(db.url+"umd/save",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.data)
      })
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({isLoading:false});
          console.log(responseData);
          Alert.alert(
            'Success',
            responseData.message,[{text: 'OK'}],
            { cancelable: false }
          )
      })
      .done();
    }
    //setter      =(text)=>{this.state.data.equipment    = text; this.setState({data:this.state.data})}
  }
  async componentDidMount() {
    let values = JSON.parse(await db.getData());
    if(values==null){
        await db.init();
        let values = JSON.parse(await db.getData());
    }
    this.setState({user:values});
}
  loader(){
    if(this.state.isLoading)
    {
        return <Spinner color='blue'/>;
    }else{
        return null;
    }
  }
  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search NOPOL" onChangeText={(text)=>this.setState({text_techid:text})}/>
            <Icon name="ios-people" />
          </Item>
          <Button transparent onPress={proc_find}>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
        {this.loader()}
          <Form>
            <Item floatingLabel>
              <Label>Equipment</Label>
              <Input value={this.state.data.equipment} onChangeText={(text)=>{this.state.data.equipment=text; this.setState({data:this.state.data})}}/>
            </Item>
            <Item floatingLabel>
              <Label>Description of Technical </Label>
              <Input value={this.state.data.description} onChangeText={(text)=>{this.state.data.description=text; this.setState({data:this.state.data})}}/>
            </Item>
            <Item floatingLabel>
              <Label>Sort field</Label>
              <Input value={this.state.data.sort_field} onChangeText={(text)=>{this.state.data.sort_field=text; this.setState({data:this.state.data})}}/>
            </Item>
            <Item floatingLabel>
              <Label>User Status</Label>
              <Input value={this.state.data.user_status} onChangeText={(text)=>{this.state.data.user_status=text; this.setState({data:this.state.data})}}/>
            </Item>
            <Item floatingLabel>
              <Label>List name</Label>
              <Input value={this.state.data.list_name} onChangeText={(text)=>{this.state.data.list_name=text; this.setState({data:this.state.data})}}/>
            </Item>
            <Item floatingLabel>
              <Label>Telephone</Label>
              <Input value={this.state.data.telephone} onChangeText={(text)=>{this.state.data.telephone=text; this.setState({data:this.state.data})}}/>
            </Item>
            <Item floatingLabel>
              <Label>Street</Label>
              <Input value={this.state.data.street} onChangeText={(text)=>{this.state.data.street=text; this.setState({data:this.state.data})}}/>
            </Item>
            <Item floatingLabel>
              <Label>City</Label>
              <Input value={this.state.data.city} onChangeText={(text)=>{this.state.data.city=text; this.setState({data:this.state.data})}}/>
            </Item>
          </Form>
          <View style={{padding:5,marginTop:10}}>
            <Button block onPress={proc_save}>
              <Text>Save</Text>
            </Button>
            <Button block style={{marginTop:5}} onPress={proc_logout}>
              <Text>Logout</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}