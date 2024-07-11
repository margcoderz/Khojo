import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';

interface BodyProps extends KeyboardAwareScrollViewProps {
  backgroundColor?: string;
  children?: any;
}

function Body(props: BodyProps) {
  const themeColors = useSelector((state: RootState) => state.theme?.colors);

  const {style, backgroundColor = themeColors.transparent} = props;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        containerStyle: {
          flexGrow: 1,
          backgroundColor: backgroundColor,
        },
      }),
    [backgroundColor],
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.containerStyle, style]}
      keyboardShouldPersistTaps={'handled'}
      enableOnAndroid={false}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      {...props}
    />
  );
}

export default Body;
