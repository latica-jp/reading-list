import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import {
  HeaderWithMenuIcon,
  EmptyBookList,
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
    const { t } = this.props.screenProps;
    return (
      <Container>
        <HeaderWithMenuIcon {...this.props} title={t('Home')} />
        <Content contentContainerStyle={styles.content}>
          {this.props.summaries && this.props.summaries.length ? (
            <SwipeableBookList
              {...this.props}
              deleteBookdata={this.onDeleteBookdata}
            />
          ) : (
            <EmptyBookList {...this.props} />
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default connect(
  state => ({ summaries: state.book.summaries }),
  // mapDispatchToProps のショートハンド、下記と等価（便利！！）
  // dispatch => {
  //   return { signOut: () => dispatch(signOut()) };
  // }
  { signOut, deleteBookdata }
)(HomeScreen);
