import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View,TextInput } from 'react-native';
import { Container,Footer,List,ListItem,Left,Body } from 'native-base';

const ItemMobil = ({ navigation }) => (
    <Container>
        <View>
          
        </View>
    </Container>
);

ItemMobil.propTypes = {
  navigation: PropTypes.object.isRequired,
};

ItemMobil.navigationOptions = {
  title: 'Mobil ',
};

export default ItemMobil;
