import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';

const emptyBookList = props => {
  const { t } = props.screenProps;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('No books yet.')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#CCC',
  },
});

export default emptyBookList;
