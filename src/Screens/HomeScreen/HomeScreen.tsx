import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Touch from '../../Components/Touch/Touch';
import {getLogin, logout} from '../../Modules/AuthModule/LoginForm/LoginSlice';
import {RootState} from '../../Store/Store';
import Container from '../../Components/Container/Container';
import Typography from '../../Components/Typography/Typography';
import Block from '../../Components/Block/Block';

function HomeScreen() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const loginData = useSelector((state: RootState) => getLogin(state));
  const themeColors = useSelector((state: RootState) => state.theme?.colors);

  console.log(loginData);
  return (
    <Container
      statusBarBackgroundColor={themeColors.accent}
      statusBarStyle="default">
      <Block>
        <Typography>asd</Typography>
      </Block>
    </Container>
  );
}

export default HomeScreen;
