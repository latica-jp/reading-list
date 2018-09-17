import React from 'react';

import { BarCodeScanner } from 'expo';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const barcodeReader = props => {
  const { type, onBarCodeRead, onPressClose } = props;
  return (
    <BarCodeScanner
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}
      type={type}
      onBarCodeRead={onBarCodeRead}
    >
      <View
        style={{
          flex: 0.15,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={onPressClose}>
          <Ionicons name="ios-close-circle-outline" size={48} color="white" />
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
        {!props.loading && (
          <Ionicons
            name="ios-barcode-outline"
            size={72}
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
    </BarCodeScanner>
  );
};

export default barcodeReader;
