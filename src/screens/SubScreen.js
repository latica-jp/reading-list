import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';

class SubScreen extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Text>SubScreen</Text>
        </Content>
      </Container>
    );
  }
}

export default SubScreen;
