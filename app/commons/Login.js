import React from 'react';
import { Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Spinner } from 'native-base';
import db from '../lib/db';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        const {navigate} = this.props.navigation;
        this.state = {user:{},isLoading:false};
        proc_login = ()=>{
            this.setState({isLoading:true});
            fetch(db.url+"signin?username="+this.state.text_username+"&password="+this.state.text_password,{
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
            })
            .then((response) => response.json())
            .then((responseData) => {
                
                this.setState({
                    status: responseData.status,
                    isLoading:false
                });
                if(responseData.status=="failed")
                {
                    Alert.alert(
                        'Login Gagal',
                        responseData.message,[{text: 'OK'}],
                        { cancelable: false }
                    )
                }else{
                    db.setLogin(responseData.data,db.url);
                    navigate('Routes');
                }
            })
            .done();
        }
        
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
        <Header />
        <Content>
        <Text style={{fontSize: 40,
                fontWeight: "800",
                marginTop: 150,
                marginBottom: 30,
                textAlign: 'center'}}>UMD</Text>
          <Form>
            <Item>
              <Input placeholder="Username" onChangeText={(text)=>this.setState({text_username:text})}/>
            </Item>
            <Item last>
              <Input secureTextEntry placeholder="Password" onChangeText={(text)=>this.setState({text_password:text})}/>
            </Item>
            <Button block style={{margin:10}} onPress={proc_login}>
                <Text>Masuk</Text>
            </Button>
            {this.loader()}
          </Form>
        </Content>
      </Container>
    );
  }
}