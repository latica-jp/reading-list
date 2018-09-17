import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Header,
  Title,
  Body,
  Footer,
  Button,
  List,
  ListItem,
  Left,
  Right,
  Text,
  Thumbnail,
} from 'native-base';
import {
  HeaderWithMenuIcon,
  BookList,
  SwipeableBookList,
} from '../components/';

import { signOut, deleteBookdata } from '../store/actions';

class HomeScreen extends Component {
  // redux 経由
  signOut = () => {
    this.props.signOut();
  };

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  onDeleteBookdata = isbn => {
    this.props.deleteBookdata(isbn);
  };

  render() {
    return (
      <Container>
        <HeaderWithMenuIcon {...this.props} title="Home" />
        <Content style={styles.content}>
          <SwipeableBookList
            {...this.props}
            deleteBookdata={this.onDeleteBookdata}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
const mapStateToProps = state => {
  return { summaries: state.book.summaries };
};

export default connect(
  mapStateToProps,
  // ショートハンド（便利！！）下記と等価
  // dispatch => {
  //   return { signOut: () => dispatch(signOut()) };
  // }
  { signOut, deleteBookdata }
)(HomeScreen);
