import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Content, Text, Button } from 'native-base';
import { View } from 'react-native';

import AuthForm from '../components/AuthForm';
import { WithLoading } from '../hocs';
import { expoSignInWithGoogle } from '../services/google';
import {
  signInWithEmail,
  signInWithGoogle,
  signUp,
} from '../store/actions/auth';

class LoginScreen extends Component {
  state = { isSignIn: true };

  onSwitchType = () => {
    this.setState(prevState => ({
      ...prevState,
      isSignIn: !prevState.isSignIn,
    }));
  };

  signInWithGoogle = async () => {
    try {
      const token = await expoSignInWithGoogle();
      if (token !== null) {
        this.props.signInWithGoogle(token);
      }
    } catch (error) {
      // do something
    }
  };

  render() {
    const switchText = this.state.isSignIn ? 'SignUp' : 'LogIn';
    const submitText = this.state.isSignIn ? 'LogIn' : 'SignUp';
    const submitHandler = this.state.isSignIn
      ? this.props.signInWithEmail
      : this.props.signUp;
    return (
      <Container>
        <Content
          padder
          contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
        >
          <View style={{ flex: 0.5 }}>
            <AuthForm submitText={submitText} onSubmit={submitHandler} />
            <Button transparent block onPress={this.onSwitchType}>
              <Text>Switch To {switchText}</Text>
            </Button>
            <Button transparent block onPress={this.signInWithGoogle}>
              <Text>with Google</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(
  null,
  { signInWithEmail, signInWithGoogle, signUp }
)(WithLoading(LoginScreen, ['SIGNIN', 'SIGNUP', 'SIGNOUT']));
