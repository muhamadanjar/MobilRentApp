import React from 'react';
import { StyleSheet, View } from 'react-native';

import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';
import PesanButton from './Mobil/PesanButton';
import PesanMobil from './Mobil/PesanMobil';
import {Body,Content,Left,Right} from 'native-base';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const MainScreen = () => (
  <View style={styles.container}>
    <LoginStatusMessage />
    <Body>
      <Content>
        <Left>
          <AuthButton/>
        </Left>
        <Right>
          <PesanButton />
        </Right>
      </Content>
      
    </Body>
    
  </View>
);

MainScreen.navigationOptions = {
  title: 'Halaman Utama',
  header:null
};

export default MainScreen;
