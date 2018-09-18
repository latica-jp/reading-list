import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Left, Body, Right, Title, Icon, Button } from 'native-base';

import { WithLoading } from '../hocs/';

import { uploadBookData } from '../store/actions';

class HeaderWithMenuIcon extends Component {
  onMenuButtonPress = () => {
    this.props.navigation.openDrawer();
  };

  onWordpressButtonPress = () => {
    this.props.uploadBookData();
  };

  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={this.onMenuButtonPress}>
            <Icon type="Ionicons" name="ios-menu" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.onWordpressButtonPress}>
            {this.props.token ? (
              <Icon type="MaterialCommunityIcons" name="wordpress" />
            ) : null}
          </Button>
        </Right>
      </Header>
    );
  }
}

export default connect(
  state => ({
    token: state.auth.token,
  }),
  { uploadBookData }
)(WithLoading(HeaderWithMenuIcon, ['UPLOAD_BOOKDATA']));
