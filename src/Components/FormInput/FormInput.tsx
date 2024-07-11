import React, {Fragment, useState} from 'react';
import {Control, RegisterOptions, useController} from 'react-hook-form';
import {TextInputProps, View} from 'react-native';
import {ReactNativeModalDateTimePickerProps} from 'react-native-modal-datetime-picker';

import Block from '../Block/Block';
import InputText from '../InputText/InputText';
import {INPUT_TYPES, SELECT_OPTIONS} from '../../Utils/Types';
import scaler from '../../Utils/scaler';
import CallingCode from '../CallingCode/CallingCode';
import InputSelect from '../InputSelect/InputSelect';
import SelectComplete from '../SelectComplete/SelectComplete';
import InputDate from '../InputDate/InputDate';
import InputTime from '../InputTime/InputTime';
import IconButton from '../IconButton/IconButton';

export type FormInputProps = {
  name: string;
  callingCodeName?: string;
  onCallingCodeChanged?: () => void;
  label?: string;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  shouldUnregister?: boolean;
  defaultValue?: unknown;
  control?: Control<any>;
  setFocus?: (name: any) => void;
  type: INPUT_TYPES;
  textInputProps?: TextInputProps;
  left?: any;
  right?: any;
  options?: SELECT_OPTIONS;
  JSX?: (_props: Omit<FormInputProps, 'JSX'>) => any;
  datePickerProps?: Omit<
    ReactNativeModalDateTimePickerProps,
    'onConfirm' | 'onCancel'
  >;
  require?: boolean;
  setStoreRef?: any;
  isFrom?: any;
};

function FormInput(props: FormInputProps) {
  const {
    name,
    callingCodeName,
    onCallingCodeChanged,
    label,
    rules,
    shouldUnregister,
    defaultValue,
    control,
    type,
    textInputProps,
    left,
    right,
    options,
    JSX,
    datePickerProps,
    require,
    setStoreRef,
    isFrom,
  } = props;
  const {field, formState} = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  const [showPassword, setShowPassword] = useState(false);

  switch (type) {
    case 'text': {
      return (
        <InputText
          isFrom={isFrom}
          setStoreRef={setStoreRef}
          label={label}
          field={field}
          formState={formState}
          textInputProps={textInputProps}
          left={left}
          right={right}
          require={require}
        />
      );
    }
    case 'phone': {
      return (
        <InputText
          label={label}
          field={field}
          formState={formState}
          textInputProps={{
            keyboardType: 'decimal-pad',
            ...textInputProps,
          }}
          left={
            left ??
            (callingCodeName ? (
              <Block justifyContent={'center'}>
                <CallingCode
                  name={callingCodeName}
                  control={control}
                  callback={onCallingCodeChanged}
                />
              </Block>
            ) : (
              <Fragment />
            ))
          }
          right={right}
          require={require}
        />
      );
    }
    case 'email': {
      return (
        <InputText
          label={label}
          field={field}
          formState={formState}
          textInputProps={{
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            ...textInputProps,
          }}
          left={left}
          right={right}
          require={require}
        />
      );
    }
    case 'password': {
      return (
        <InputText
          label={label}
          field={field}
          formState={formState}
          textInputProps={{
            secureTextEntry: !showPassword,
            ...textInputProps,
          }}
          left={left}
          right={
            right ? (
              <Block justifyContent="center" marginRight={scaler(14)}>
                <IconButton
                  name={!showPassword ? 'eye-off' : 'eye'}
                  iconVariant="placeholder"
                  size={scaler(20)}
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              </Block>
            ) : (
              <></>
            )
          }
          require={require}
        />
      );
    }
    // case 'select': {
    //   return (
    //     <Fragment>
    //       {options && (
    //         <InputSelect
    //           label={label}
    //           field={field}
    //           formState={formState}
    //           textInputProps={textInputProps}
    //           left={left}
    //           right={
    //             right ?? (
    //               <Block justifyContent={'center'}>
    //                 <View pointerEvents={'none'}>
    //                   <IconButton name={'chevron-down'} iconVariant={'text'} />
    //                 </View>
    //               </Block>
    //             )
    //           }
    //           options={options}
    //           require={require}
    //         />
    //       )}
    //     </Fragment>
    //   );
    // }
    // case 'autocomplete': {
    //   return (
    //     <Fragment>
    //       {options && (
    //         <InputAutocomplete
    //           setVisible={setVisible}
    //           visible={visible}
    //           label={label}
    //           field={field}
    //           formState={formState}
    //           textInputProps={textInputProps}
    //           left={left}
    //           right={
    //             right ?? (
    //               <Block justifyContent={'center'} alignItems="center">
    //                 <Touch
    //                   onPress={() => {
    //                     if (visible) {
    //                       // closeAutocomplete();
    //                     } else {
    //                       setVisible(true);
    //                     }
    //                   }}>
    //                   <View pointerEvents={'none'}>
    //                     <IconButton
    //                       name={'chevron-down'}
    //                       iconVariant={'text'}
    //                     />
    //                   </View>
    //                 </Touch>
    //               </Block>
    //             )
    //           }
    //           options={options}
    //         />
    //       )}
    //     </Fragment>
    //   );
    // }
    case 'selectComplete': {
      return (
        <Fragment>
          {options && (
            <SelectComplete
              label={label}
              field={field}
              formState={formState}
              textInputProps={textInputProps}
              left={left}
              right={
                right ?? (
                  <Block alignItems="center" justifyContent={'center'}>
                    <View pointerEvents={'none'}>
                      <IconButton name={'chevron-down'} />
                    </View>
                  </Block>
                )
              }
              options={options}
            />
          )}
        </Fragment>
      );
    }
    case 'date': {
      return (
        <InputDate
          label={label}
          field={field}
          formState={formState}
          textInputProps={textInputProps}
          left={left}
          right={
            right ?? (
              <Block justifyContent={'center'}>
                <View pointerEvents={'none'}>
                  <IconButton
                    size={scaler(20)}
                    name={'calendar'}
                    iconVariant={'text'}
                  />
                </View>
              </Block>
            )
          }
          require={require}
          datePickerProps={datePickerProps}
        />
      );
    }
    case 'time': {
      return (
        <InputTime
          label={label}
          field={field}
          formState={formState}
          textInputProps={textInputProps}
          left={left}
          right={right ?? <></>}
          require={require}
          datePickerProps={datePickerProps}
        />
      );
    }

    case 'custom': {
      return JSX && JSX(props);
    }
  }
}

export default FormInput;
