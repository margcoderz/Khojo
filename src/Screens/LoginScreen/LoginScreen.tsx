import React from 'react';
import LoginForm from '../../Modules/AuthModule/LoginForm/LoginForm';
import Block from '../../Components/Block/Block';
import Container from '../../Components/Container/Container';

const LoginScreen = () => {
  return (
    <Container>
      <Block flex={1}>
        <LoginForm />
      </Block>
    </Container>
  );
};

export default LoginScreen;
