import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';

import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import {SELECT_OPTIONS} from '../../Utils/Types';
import scaler from '../../Utils/scaler';
import Block from '../Block/Block';
import InputLabel from '../InputLabel/InputLabel';
import Autocomplete from '../Autocomplete/Autocomplete';
import Typography from '../Typography/Typography';

type SelectCompleteProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: TextInputProps;
  left?: any;
  right?: any;
  options: SELECT_OPTIONS;
};

function SelectComplete(props: SelectCompleteProps) {
  const {formState, field, textInputProps, label, left, right, options} = props;
  const themeColors = useSelector((state: RootState) => state.theme.colors);
  const errorMessage = formState.errors?.[field.name]?.message;
  const borderColor = errorMessage
    ? themeColors.error
    : themeColors.placeholder;
  const labelColor = errorMessage ? themeColors.error : themeColors.text;
  const textColor = errorMessage ? themeColors.error : themeColors.text;
  const font = useSelector((state: RootState) => state.theme.font);
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
          textTransform: 'capitalize',
        },
      }),
    [font.medium, textColor],
  );

  const capitalizeFirstLetter = (text: string | undefined) => {
    return (text ?? '').charAt(0).toUpperCase() + (text ?? '').slice(1);
  };

  return (
    <Block>
      <InputLabel
        label={label}
        focus={errorMessage || field.value}
        labelColor={labelColor}
      />
      <Pressable
        onPress={() => {
          setVisible(true);
        }}>
        <View pointerEvents={'none'}>
          <Block
            flexDirection="row"
            elevation={0}
            borderWidth={1}
            borderColor={borderColor}
            borderRadius={scaler(6)}
            height={scaler(50)}
            backgroundColor={themeColors.surface}
            overflow="hidden"
            //    variant={'divider'}
          >
            {left}
            <Block
              paddingVertical={scaler(7)}
              flex={1}
              justifyContent={'center'}>
              <TextInput
                autoCapitalize="characters"
                ref={field.ref}
                {...textInputProps}
                value={capitalizeFirstLetter(
                  options.find(({value}) => `${value}` === `${field.value}`)
                    ?.label,
                )}
                placeholderTextColor={themeColors.divider}
                style={[styles.textInputStyle, textInputProps?.style]}
              />
            </Block>
            {right}
          </Block>
        </View>
      </Pressable>
      <Autocomplete
        visible={visible}
        setVisible={setVisible}
        options={options}
        label={label}
        placeholder={textInputProps?.placeholder}
        field={field}
      />
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

export default SelectComplete;
