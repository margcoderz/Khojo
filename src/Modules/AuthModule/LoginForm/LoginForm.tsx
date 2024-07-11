import React, {Fragment} from 'react';
import {useForm} from 'react-hook-form';
import Block from '../../../Components/Block/Block';
import scaler from '../../../Utils/scaler';

import FormInput from '../../../Components/FormInput/FormInput';
import Touch from '../../../Components/Touch/Touch';
import Typography from '../../../Components/Typography/Typography';
import {useSelector} from 'react-redux';
import {RootState} from '../../../Store/Store';

function LoginForm() {
  const {control} = useForm({
    defaultValues: {
      price: '',
    },
    mode: 'onChange',
  });
  const themeColors = useSelector((state: RootState) => state.theme.colors);
  return (
    <Fragment>
      <Block height={scaler(50)} />
      <Block
        backgroundColor={themeColors.backgroundColor}
        flex={1}
        marginHorizontal={scaler(16)}>
        <Block marginBottom={scaler(20)}>
          <FormInput
            textInputProps={{
              placeholder: 'Email',
              maxLength: 8,
            }}
            // setFocus={setFocus}
            label="Email"
            control={control}
            name={'Email'}
            type={'email'}
            require={true}
          />
          <FormInput
            right={true}
            textInputProps={{
              placeholder: 'Password',
              maxLength: 8,
            }}
            // setFocus={setFocus}
            label="Password"
            control={control}
            name={'password'}
            type={'password'}
            require={true}
          />
        </Block>

        <Block marginHorizontal={scaler(26)}>
          <Touch
            backgroundColor={themeColors.primary}
            borderRadius={scaler(8)}
            padding={scaler(10)}
            onPress={() => {}}>
            <Typography textAlign="center">login</Typography>
          </Touch>
        </Block>
      </Block>
    </Fragment>
  );
}

export default LoginForm;
