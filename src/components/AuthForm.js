import React, { Component } from 'react';
import { Form, Item, Input, Button, Text } from 'native-base';

class AuthForm extends Component {
  state = {
    email: '',
    password: '',
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.email, this.state.password);
  };

  onEmailChanged = text => {
    this.setState({ ...this.state, email: text });
  };

  onPasswordChanged = text => {
    this.setState({ ...this.state, password: text });
  };

  render() {
    return (
      <Form>
        <Item>
          <Input
            placeholder="E-mail"
            onChangeText={this.onEmailChanged}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
          />
        </Item>
        <Item last>
          <Input
            placeholder="Password"
            onChangeText={this.onPasswordChanged}
            secureTextEntry
          />
        </Item>
        <Button onPress={this.onSubmit} primary block>
          <Text>{this.props.submitText}</Text>
        </Button>
      </Form>
    );
  }
}

export default AuthForm;
