import React, {forwardRef, ReactNode, useMemo} from 'react';
import {Platform, View, ViewProps, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';

type BlockProps = {
  children?: ReactNode;
};

function Block(
  props: BlockProps & ViewProps & ViewStyle,
  ref: React.LegacyRef<View> | undefined,
) {
  const {
    children,
    elevation = 0,
    style,
    backgroundColor,
    onLayout,
    pointerEvents,
    testID,
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
              width: 0,
            },
            shadowColor: themeColors.onSurface,
          },
    [elevation, themeColors.onSurface],
  );

  return (
    <View
      ref={ref}
      testID={testID}
      onLayout={onLayout}
      pointerEvents={pointerEvents}
      style={[
        Platform.OS === 'ios' ? {...iosShadowElevation} : {elevation},
        styleProps,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : themeColors.transparent,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

export default forwardRef(Block);
