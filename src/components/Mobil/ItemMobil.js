import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Container,Footer,List,ListItem,Left,Body,Right,Button } from 'native-base';
import { connect } from 'react-redux';

class ItemMobil extends React.Component{
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}
  render(){
    return(
      <Container>
        <View>

        </View>
      </Container>
    )
  }

}


ItemMobil.propTypes = {
  navigation: PropTypes.object.isRequired,
};

ItemMobil.navigationOptions = {
  title: 'Mobil ',
};

const mapStateToProps = (state) => ({
	
});

const mapActionCreators = {
	
};

export default connect(mapStateToProps, mapActionCreators)(ItemMobil);
//export default ItemMobil;
