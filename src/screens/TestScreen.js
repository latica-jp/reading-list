import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import { HeaderWithMenuIcon } from '../components/';

class TestScreen extends Component {
  render() {
    return (
      <Container>
        <HeaderWithMenuIcon {...this.props} title="Test" />

        <Content padder>
          <Text>Just for Testing...</Text>
        </Content>
      </Container>
    );
  }
}
export default TestScreen;
