/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useMemo, useState} from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import SafeAreaBlock from '../SafeAreaBlock/SafeAreaBlock';
import InputLabel from '../InputLabel/InputLabel';
import {SELECT_OPTIONS} from '../../Utils/Types';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import Block from '../Block/Block';
import Typography from '../Typography/Typography';
import Touch from '../Touch/Touch';
import scaler from '../../Utils/scaler';
import Body from '../Body/Body';

type InputSelectProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: TextInputProps;
  left?: any;
  right?: any;
  options: SELECT_OPTIONS;
  require?: boolean;
};

function InputSelect(props: InputSelectProps) {
  const {
    formState,
    field,
    textInputProps,
    label,
    left,
    right,
    options,
    require,
  } = props;
  const themeColors = useSelector((state: RootState) => state.theme?.colors);
  const font = useSelector((state: RootState) => state.theme.font);

  const errorMessage = formState.errors?.[field.name]?.message;
  const [focus, setFocus] = useState(false);
  const borderColor = errorMessage
    ? themeColors.error
    : focus
    ? themeColors.primary
    : themeColors.placeholder;
  const labelColor = errorMessage
    ? themeColors.error
    : focus
    ? themeColors.primary
    : themeColors.primary;
  const textColor = errorMessage ? themeColors.error : themeColors.text;
  const borderWidth = focus || errorMessage ? scaler(2) : scaler(1);
  const [visible, setVisible] = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        textInputStyle: {
          fontSize: scaler(15),
          paddingHorizontal: scaler(15),
          paddingBottom: Platform.OS === 'ios' ? 8.3 / 2 : 0,
          paddingVertical: Platform.OS === 'ios' ? 8.3 / 2 : 0,
          color: textColor,
          textAlignVertical: 'center',
          ...font.medium,
        },
      }),
    [font.medium, textColor],
  );

  return (
    <Fragment>
      {label && (
        <InputLabel
          label={label}
          focus={focus || errorMessage || field.value}
          labelColor={labelColor}
          require={require}
        />
      )}

      <Pressable
        onPress={() => {
          setVisible(true);
          setFocus(true);
        }}>
        <View pointerEvents={'none'}>
          <Block
            flexDirection={'row'}
            borderWidth={borderWidth}
            borderColor={borderColor}
            borderRadius={scaler(8)}
            height={scaler(50)}
            backgroundColor={themeColors.surface}
            overflow="hidden">
            {left}
            <Block paddingVertical={8} flex={1} justifyContent={'center'}>
              <TextInput
                ref={field.ref}
                {...textInputProps}
                value={
                  options.find(({value}) => `${value}` === `${field.value}`)
                    ?.label
                }
                onFocus={() => {
                  Keyboard.dismiss();
                  setFocus(true);
                  // menuRef.current?.show();
                }}
                placeholderTextColor={themeColors.disabled}
                style={[styles.textInputStyle, textInputProps?.style]}
              />
            </Block>
            {right}
          </Block>
        </View>
      </Pressable>

      {errorMessage && (
        <Typography fontSize={12} color={borderColor}>
          {errorMessage}
        </Typography>
      )}

      <ReactNativeModal
        isVisible={visible}
        onBackButtonPress={() => {
          setVisible(false);
        }}
        onBackdropPress={() => {
          setVisible(false);
        }}
        onModalShow={() => {
          setFocus(true);
        }}
        onModalHide={() => {
          setFocus(false);
        }}
        animationInTiming={500}
        animationOutTiming={1000}
        style={{margin: 0, justifyContent: 'flex-end'}}
        useNativeDriver
        hardwareAccelerated
        useNativeDriverForBackdrop>
        <SafeAreaBlock
          backgroundColor={themeColors.surface}
          flex={1}
          maxHeight={scaler(400)}>
          <Block
            flex={1}
            maxHeight={scaler(400)}
            backgroundColor={themeColors.surface}>
            <Typography fontSize={scaler(20)} margin={scaler(20)}>
              {label}
            </Typography>
            <Body>
              {options.map(({label: _label, value: _value}, _index) => {
                return (
                  <Fragment key={_value}>
                    <Touch
                      height={scaler(50)}
                      onPress={() => {
                        field.onChange(_value);
                        setVisible(false);
                      }}>
                      <Block
                        height={scaler(50)}
                        paddingHorizontal={scaler(20)}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}>
                        <Typography
                          textTransform="capitalize"
                          fontSize={scaler(15)}
                          variant={_value === field.value ? 'primary' : 'text'}>
                          {_label}
                        </Typography>
                        {/* {_value === field.value && (
                          <IconButton name="check" iconVariant={'primary'} />
                        )} */}
                      </Block>
                    </Touch>
                  </Fragment>
                );
              })}
            </Body>
          </Block>
        </SafeAreaBlock>
      </ReactNativeModal>
    </Fragment>
  );
}

export default InputSelect;
