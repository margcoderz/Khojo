import React from 'react';
import {ImageResizeMode, ImageSourcePropType} from 'react-native';
import {IconProps} from 'react-native-vector-icons/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Touch, {TouchProps} from '../Touch/Touch';
import scaler from '../../Utils/scaler';
import {VARIANT} from '../../Modules/ThemeModule/Types/ThemeTypes';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import Picture from '../Picture/Picture';

type IconButtonProps = {
  type?: 'MaterialCommunityIcons' | 'Image';
  iconVariant?: VARIANT;
  dark?: boolean;
  name?: string;
  source?: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
};

function IconButton(
  props: IconButtonProps & Omit<IconProps, 'onPress' | 'name'> & TouchProps,
) {
  const themetype = useSelector((state: RootState) => state.theme.type);
  const themeColors = useSelector((state: RootState) => state.theme?.colors);

  const {
    type = 'MaterialCommunityIcons',
    color,
    dark = themetype === 'dark',
    iconVariant = dark ? 'white' : 'black',
    size = scaler(24),
    borderRadius = (size * 1.5) / 2,
    name,
    source,
    resizeMode = 'contain',
    backgroundColor = themeColors.transparent,
    ...touchProps
  } = props;

  switch (type) {
    case 'MaterialCommunityIcons': {
      return (
        <Touch
          justifyContent={'center'}
          alignItems={'center'}
          height={size * 1.5}
          width={size * 1.5}
          borderRadius={borderRadius}
          backgroundColor={backgroundColor}
          {...touchProps}>
          {name && (
            <MaterialCommunityIcons
              name={name}
              size={size}
              color={color ? color : themeColors[iconVariant]}
            />
          )}
        </Touch>
      );
    }

    case 'Image': {
      return (
        <Touch
          justifyContent={'center'}
          alignItems={'center'}
          height={size * 1.5}
          width={size * 1.5}
          borderRadius={borderRadius}
          backgroundColor={backgroundColor}
          android_ripple={null}
          {...touchProps}>
          {source && (
            <Picture
              source={source}
              height={size * 1.5}
              width={size * 1.5}
              borderRadius={borderRadius}
              padding={size * 1.5 - size}
              resizeMode={resizeMode}
            />
          )}
        </Touch>
      );
    }

    default: {
      return (
        <Touch
          justifyContent={'center'}
          alignItems={'center'}
          height={size * 1.5}
          width={size * 1.5}
          borderRadius={(size * 1.5) / 2}
          backgroundColor={backgroundColor}
          {...touchProps}>
          {name && (
            <MaterialCommunityIcons
              name={name}
              size={size}
              color={color ? color : themeColors[iconVariant]}
            />
          )}
        </Touch>
      );
    }
  }
}

export default IconButton;
