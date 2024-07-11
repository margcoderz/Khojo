import React, {forwardRef, memo, ReactNode} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import {FONT_TYPES, VARIANT} from '../../Modules/ThemeModule/Types/ThemeTypes';
import {RootState} from '../../Store/Store';
import {useSelector} from 'react-redux';

export type TypographyProps = {
  variant?: VARIANT;
  type?: FONT_TYPES;
  children?: ReactNode;
} & TextProps &
  TextStyle;

function Typography(
  props: TypographyProps,
  ref: React.LegacyRef<Text> | undefined,
) {
  const {
    style,
    color,
    textDecorationColor = color,
    type,
    variant,
    children,
    testID,
    accessibilityHint,
    accessibilityLabel,
    accessibilityRole,
    accessibilityState,
    accessible,
    adjustsFontSizeToFit,
    allowFontScaling = false,
    ellipsizeMode,
    maxFontSizeMultiplier,
    numberOfLines,
    onLongPress,
    onLayout,
    selectionColor,
    onTextLayout,
    selectable,
    textBreakStrategy,
    onPress,
    ...textStyleProps
  } = props;
  const themeColors = useSelector((state: RootState) => state.theme.colors);
  const fonts = useSelector((state: RootState) => state.theme.font);
  const {fontFamily, fontWeight} = fonts[type ?? 'regular'];

  return (
    <Text
      ref={ref}
      onPress={onPress}
      testID={testID}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      accessible={accessible}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      allowFontScaling={allowFontScaling}
      ellipsizeMode={ellipsizeMode}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      numberOfLines={numberOfLines}
      onLongPress={onLongPress}
      onLayout={onLayout}
      selectionColor={selectionColor}
      onTextLayout={onTextLayout}
      selectable={selectable}
      textBreakStrategy={textBreakStrategy}
      style={[
        {fontFamily, fontWeight},
        textStyleProps,
        {
          color: color
            ? color
            : variant
            ? themeColors[variant]
            : themeColors.text,
          textDecorationColor: textDecorationColor
            ? textDecorationColor
            : variant
            ? themeColors[variant]
            : themeColors.text,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

export default memo(forwardRef(Typography));
