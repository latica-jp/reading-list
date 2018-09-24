import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Text,
  Icon,
} from 'native-base';

import { WithLoading } from '../hocs/';

import { signOut, loginWordpress } from '../store/actions';

class SideDrawer extends Component {
  onSignOut = () => {
    this.props.signOut();
  };

  onLoginWordpress = () => {
    this.props.loginWordpress();
    this.props.navigation.closeDrawer();
  };

  render() {
    const { t } = this.props.screenProps;
    return (
      <Container>
        <Content bounces={false} style={{ marginTop: 20 }}>
          <List>
            <ListItem button onPress={this.onLoginWordpress}>
              <Left>
                <Icon
                  type="MaterialCommunityIcons"
                  name="wordpress"
                  style={{ fontSize: 26, width: 32 }}
                />
                <Text style={{ paddingLeft: 10 }}>
                  {t('Connect to Wordpress')}
                </Text>
              </Left>
            </ListItem>
            <ListItem button onPress={this.onSignOut}>
              <Left>
                <Icon
                  type="MaterialCommunityIcons"
                  name="logout"
                  style={{ fontSize: 26, width: 32 }}
                />
                <Text style={{ paddingLeft: 10 }}>{t('Sign Out')}</Text>
              </Left>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default connect(
  null,
  { signOut, loginWordpress }
)(WithLoading(SideDrawer, ['SIGNOUT']));
