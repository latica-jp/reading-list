import React, { Component } from 'react';

import { Camera } from 'expo';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class BarcodeReader extends Component {
  state = { flash: false };

  onFlashPress = () => {
    this.setState({ flash: !this.state.flash });
  };

  onBarCodeScanned = async ({ data: isbn }) => {
    await this.props.onBarCodeScanned(isbn);
  };

  render() {
    const { type, onPressClose } = this.props;
    return (
      <Camera
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        type={type}
        onBarCodeScanned={this.onBarCodeScanned}
        flashMode={
          this.state.flash
            ? Camera.Constants.FlashMode.torch
            : Camera.Constants.FlashMode.off
        }
      >
        <View
          style={{
            flex: 0.15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          }}
        >
          <TouchableOpacity onPress={onPressClose}>
            <Ionicons name="ios-close-circle-outline" size={60} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onFlashPress}>
            <Ionicons
              name={this.state.flash ? 'ios-flash' : 'ios-flash-outline'}
              size={60}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {!this.props.loading && (
            <Ionicons
              name="ios-barcode-outline"
              size={84}
              color="white"
              style={{ opacity: 0.7 }}
            />
          )}
        </View>
        <View
          style={{
            flex: 0.15,
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          {/* <TouchableOpacity>
          <Ionicons name="ios-radio-button-on" size={48} color="white" />
        </TouchableOpacity> */}
        </View>
      </Camera>
    );
  }
}

export default BarcodeReader;
