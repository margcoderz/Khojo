import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import {Platform, StyleSheet, TextInput, TextInputProps} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import scaler from '../../Utils/scaler';
import Block from '../Block/Block';
import Typography from '../Typography/Typography';
import InputLabel from '../InputLabel/InputLabel';

type InputTextProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: TextInputProps;
  left?: any;
  right?: any;
  require?: boolean;
  ref?: any;
  setStoreRef?: any;
  isFrom?: any;
};

function InputText(props: InputTextProps) {
  const {
    formState,
    ref,
    setStoreRef,
    field,
    textInputProps,
    label,
    left,
    right,
    require,
    isFrom,
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
  const borderWidth = focus || errorMessage ? scaler(1.5) : scaler(1);
  const inputRef = useRef(ref ? ref : null);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        textInputStyle: {
          fontSize: scaler(15),
          paddingHorizontal: scaler(15),
          paddingBottom: Platform.OS === 'ios' ? 8.3 / 2 : 0,
          paddingVertical: Platform.OS === 'ios' ? 8.3 / 2 : 2.5,
          color: textColor,
          textAlignVertical: 'center',
          ...font.medium,
        },
      }),
    [font.medium, textColor],
  );
  useEffect(() => {
    if (isFrom === 'chat') {
      setStoreRef(inputRef);
    }
  }, [inputRef, isFrom, setStoreRef]);

  return (
    <Block>
      <InputLabel
        label={label}
        focus={focus || errorMessage || field.value}
        labelColor={labelColor}
        require={require}
      />
      <Block
        flexDirection={'row'}
        borderWidth={borderWidth}
        borderColor={borderColor}
        borderRadius={scaler(20)}
        minHeight={scaler(50)}
        backgroundColor={'#aee1da'}
        overflow="hidden">
        {left}
        <Block paddingVertical={scaler(8)} flex={1} justifyContent={'center'}>
          <TextInput
            onFocus={() => setFocus(true)}
            {...textInputProps}
            ref={
              isFrom === 'chat'
                ? inputRef
                  ? inputRef
                  : field.ref
                : ref
                ? ref
                : field.ref
            }
            value={field.value}
            onChangeText={text => field.onChange(text)}
            onBlur={() => setFocus(false)}
            placeholderTextColor={themeColors.divider}
            style={[styles.textInputStyle, textInputProps?.style]}
          />
        </Block>
        {right}
      </Block>
      {errorMessage && (
        <Typography
          marginTop={scaler(5)}
          marginHorizontal={scaler(15)}
          fontSize={scaler(12)}
          color={borderColor}>
          {errorMessage}
        </Typography>
      )}
    </Block>
  );
}

export default InputText;
