import React, {forwardRef, useMemo} from 'react';
import {Platform, SafeAreaView, View, ViewProps, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';

type SafeAreaBlockProps = {
  children?: any;
};

function SafeAreaBlock(
  props: SafeAreaBlockProps & ViewProps & ViewStyle,
  ref: React.LegacyRef<View> | undefined,
) {
  const {
    children,
    elevation = 0,
    style,
    onLayout,
    pointerEvents,
    testID,
    backgroundColor,
    ...styleProps
  } = props;
  const themeColors = useSelector((state: RootState) => state.theme.colors);

  const iosShadowElevation = useMemo(
    () =>
      elevation === 0
        ? {}
        : {
            shadowOpacity: 0.0015 * elevation + 0.18,
            shadowRadius: 0.54 * elevation,
            shadowOffset: {
              height: 0.6 * elevation,
              width: 0.6 * elevation,
            },
            shadowColor: themeColors.onSurface,
          },
    [elevation, themeColors.onSurface],
  );

  return (
    <SafeAreaView
      ref={ref}
      testID={testID}
      onLayout={onLayout}
      pointerEvents={pointerEvents}
      style={[
        styleProps,
        Platform.OS === 'ios' ? {...iosShadowElevation} : {elevation},
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : themeColors.transparent,
        },
        style,
      ]}>
      {children}
    </SafeAreaView>
  );
}

export default forwardRef(SafeAreaBlock);
