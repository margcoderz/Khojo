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
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import moment from 'moment';
import InputLabel from '../InputLabel/InputLabel';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import Typography from '../Typography/Typography';
import scaler from '../../Utils/scaler';
import Block from '../Block/Block';

type InputTimeProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: TextInputProps;
  left?: any;
  right?: any;
  datePickerProps?: Omit<
    ReactNativeModalDateTimePickerProps,
    'onConfirm' | 'onCancel'
  >;
  require?: boolean;
};

function InputTime(props: InputTimeProps) {
  const {
    formState,
    field,
    textInputProps,
    label,
    left,
    right,
    datePickerProps,
    require,
  } = props;
  const themeColors = useSelector((state: RootState) => state.theme.colors);
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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
      <InputLabel
        label={label}
        focus={focus || errorMessage || field.value}
        labelColor={labelColor}
        require={require}
      />

      <Pressable
        onPress={() => {
          setDatePickerVisibility(true);
          setFocus(true);
        }}>
        <View pointerEvents={'none'}>
          <Block
            flexDirection={'row'}
            backgroundColor={themeColors.surface}
            borderWidth={borderWidth}
            borderColor={borderColor}
            height={scaler(45)}
            borderRadius={scaler(5)}
            overflow="hidden">
            {left}
            <Block
              paddingVertical={scaler(8)}
              flex={1}
              justifyContent={'center'}>
              <TextInput
                {...textInputProps}
                ref={field.ref}
                value={
                  field.value !== '00'
                    ? field.value
                      ? moment(field.value).format('LT')
                      : ''
                    : 'Closed'
                }
                onFocus={() => {
                  Keyboard.dismiss();
                  setDatePickerVisibility(true);
                  setFocus(true);
                }}
                placeholderTextColor={themeColors.placeholder}
                style={[styles.textInputStyle, textInputProps?.style]}
              />
            </Block>
            {right}
          </Block>
        </View>
      </Pressable>

      {errorMessage && (
        <Typography
          fontSize={scaler(12)}
          marginHorizontal={scaler(30)}
          color={borderColor}>
          {errorMessage}
        </Typography>
      )}
      {/* @ts-ignore */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        date={field.value ? new Date(field.value) : undefined}
        onConfirm={date => {
          setDatePickerVisibility(false);
          if (datePickerProps?.maximumDate) {
            if (datePickerProps.maximumDate.getTime() < date.getTime()) {
              field.onChange(datePickerProps.maximumDate.toISOString());
            } else {
              field.onChange(date.toISOString());
            }
          } else {
            field.onChange(date.toISOString());
          }
          setFocus(false);
        }}
        onCancel={() => {
          setDatePickerVisibility(false);
          setFocus(false);
        }}
        {...datePickerProps}
      />
    </Fragment>
  );
}

export default InputTime;
