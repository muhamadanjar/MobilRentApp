import React from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
export class Loading extends React.Component{
    render() {
        
        const {
            loader,
        } = this.props;
      return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loader}
            onRequestClose={() => {console.log('close modal')}}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator
                    animating={loader} />
                </View>
            </View>
        </Modal>
      )
    }
  }

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})
const mapStateToProps = (state) => ({
	loader: state.loading.loader
});

export default connect(mapStateToProps)(Loading);