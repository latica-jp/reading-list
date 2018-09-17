import React, { Component } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Left, Right, Body, Thumbnail, Icon } from 'native-base';

class SwipeableBookList extends Component {
  state = { openKey: null };

  renderItem = (rowData, rowMap) => {
    const { item: summary } = rowData;
    return (
      <ListItem
        thumbnail
        style={styleSheet.listItem}
        onPress={() => {
          if (this.state.openKey === summary.isbn) {
            rowMap[summary.isbn].closeRow();
          } else {
            Alert.alert('hello');
          }
        }}
      >
        <Left>
          <Thumbnail
            square
            source={
              summary.cover
                ? { uri: summary.cover }
                : require('../assets/no_image.png')
            }
          />
        </Left>
        <Body>
          <Text>{summary.title}</Text>
          <Text note numberOfLines={1}>
            {summary.author}
          </Text>
        </Body>
        <Right />
      </ListItem>
    );
  };

  renderHiddenItem = (rowData, rowMap) => (
    <TouchableOpacity
      style={styleSheet.rightButton}
      onPress={() => {
        const { isbn } = rowData.item;
        this.props.deleteBookdata(isbn);
      }}
    >
      <Icon active name="trash" style={styleSheet.buttonIcon} />
    </TouchableOpacity>
  );

  onRowOpen = (rowKey, rowMap, toValue) => {
    this.setState(...this.state, { openKey: rowKey });
  };

  onRowClose = (rowKey, rowMap) => {
    this.setState(...this.state, { openKey: null });
  };

  render() {
    return (
      <SwipeListView
        useFlatList
        data={this.props.summaries}
        keyExtractor={item => item.isbn}
        renderItem={this.renderItem}
        renderHiddenItem={this.renderHiddenItem}
        onRowOpen={this.onRowOpen}
        onRowClose={this.onRowClose}
        rightOpenValue={-75}
        disableRightSwipe
      />
    );
  }
}

const styleSheet = StyleSheet.create({
  listItem: {
    backgroundColor: '#FFFFFF',
  },
  rightButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#C73436',
  },
  buttonIcon: {
    color: '#FFFFFF',
  },
});

export default SwipeableBookList;
