import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from "react-native-maps";
import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';
import PesanButton from './Mobil/PesanButton';
import PesanMobil from './Mobil/PesanMobil';
import {Header,Title,Text,Body,Container,Card,CardItem,Content,Left,Right,Button} from 'native-base';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map:{
		...StyleSheet.absoluteFillObject
	}
});

const MainScreen = ({}) => {
  const region = {
    latitude:4.906694,
    longitude:95.3096745,
    
    latitudeDelta:0.0922,
    longitudeDelta:0.042
  }
  return(

    <Container>
        <Header>
          <Left />
            <Body>
              <Title>Halaman Utama</Title>
            </Body>
          <Right />
        </Header>
        <Content contentContainerStyle ={{
          justifyContent: 'center', alignItems: 'center',
          paddingTop: 40, paddingHorizontal: 10}}>
          <MapView 
            region={region}
            provider={MapView.PROVIDER_GOOGLE}
            style={styles.map}>
          </MapView>
          <LoginStatusMessage />
          <Card>
            <CardItem>
              <Text>
                Welcome to Candy Land Folks ;)
              </Text>
            </CardItem>
            <CardItem>
              <Text>
                Press Button to fetch Github Repos
              </Text>
            </CardItem>
          </Card>
          <Button dark block
            onPress= {() =>{ console.log()}} style= {{marginTop: 40}}>
              <Text> Fetch Github Repos </Text>
          </Button>
          <PesanButton />
          
        </Content>
    </Container>);
};

MainScreen.navigationOptions = {
  title: 'Halaman Utama',
  header:null
};

export default MainScreen;
