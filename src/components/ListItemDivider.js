import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Text } from 'native-base';

const listItemDivider = props => {
  const { text } = props;
  return (
    <ListItem itemDivider style={styles.itemDivider}>
      <Text style={styles.itemDividerText}>{text}</Text>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  itemDivider: {
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#BBB',
  },
  itemDividerText: {
    color: '#FFF',
    fontSize: 13,
  },
});

export default listItemDivider;
