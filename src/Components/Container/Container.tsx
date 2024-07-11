import {useFocusEffect} from '@react-navigation/core';
import React, {Fragment, useCallback} from 'react';
import {Platform, StatusBar, StatusBarStyle} from 'react-native';
import Block from '../Block/Block';
import SafeAreaBlock from '../SafeAreaBlock/SafeAreaBlock';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';

export type ContainerProps = {
  children?: React.ReactNode;
  backgroundColor?: string;
  statusBarBackgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  fullScreen?: boolean;
};

function Container(props: ContainerProps) {
  const {
    children,
    backgroundColor,
    fullScreen,
    statusBarBackgroundColor,
    statusBarStyle = 'light-content',
  } = props;
  const themeColors = useSelector((state: RootState) => state.theme?.colors);

  const statusBarBackgroundColorIos =
    statusBarBackgroundColor ??
    (fullScreen ? themeColors.transparent : themeColors.adaptivePrimary);
  const screenBackgroundColor = backgroundColor
    ? backgroundColor
    : themeColors.surface;

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(fullScreen ?? false);
        StatusBar.setBackgroundColor(
          statusBarBackgroundColor ?? themeColors.adaptivePrimary,
        );
      }
      StatusBar.setBarStyle(statusBarStyle);
    }, [
      fullScreen,
      statusBarBackgroundColor,
      statusBarStyle,
      themeColors.adaptivePrimary,
    ]),
  );

  return (
    <Block flex={1} backgroundColor={screenBackgroundColor}>
      {fullScreen ? (
        <Fragment>{children}</Fragment>
      ) : (
        <Fragment>
          <SafeAreaBlock
            flex={0}
            backgroundColor={statusBarBackgroundColorIos}
          />
          <SafeAreaBlock flex={1} backgroundColor={screenBackgroundColor}>
            {children}
          </SafeAreaBlock>
        </Fragment>
      )}
    </Block>
  );
}

export default Container;
