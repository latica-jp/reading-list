import React, { Component } from 'react';
import { connect } from 'react-redux';
import { restoreSession } from '../store/actions/auth';

import { StyleSheet } from 'react-native';
import { Container, Content, Text, Card, CardItem, Body } from 'native-base';
import WithLoading from '../hocs/WithLoading';

class StartupScreen extends Component {
  componentDidMount() {
    // セッションの復帰 via redux
    // セッションの復帰の成功／失敗（RESTORE_SESSON_SUCCESS / FAILED）に応じて navigation reducer で遷移
    this.props.restoreSession();
  }

  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={styles.container}>
          <Card>
            <CardItem>
              <Body style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text>Starting up...</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default connect(
  null,
  { restoreSession }
)(StartupScreen);
