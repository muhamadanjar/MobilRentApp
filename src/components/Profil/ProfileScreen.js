import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Header,Title,Text,Body,Container,Card,CardItem,Content,Left,Right,Button} from 'native-base';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const ProfileScreen = ({logout,profil,token})=> {
  
  return (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Selamat Datang {profil.name}
    </Text>
    <Button dark block
      onPress={() =>logout()}
    ><Text>Logout</Text></Button>
  </View>
  )
};

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;
