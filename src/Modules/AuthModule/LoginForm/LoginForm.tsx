import React, {Fragment} from 'react';
import {useForm} from 'react-hook-form';
import Block from '../../../Components/Block/Block';
import scaler from '../../../Utils/scaler';

import FormInput from '../../../Components/FormInput/FormInput';
import Touch from '../../../Components/Touch/Touch';
import Typography from '../../../Components/Typography/Typography';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../Store/Store';
import {getLogin, setLogin} from './LoginSlice';
import {Alert} from 'react-native';

function LoginForm() {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const dispatch = useDispatch();
  const loginData = useSelector((state: RootState) => getLogin(state));
  console.log(loginData);
  // const [data, setData] = useState<{
  //   email: string;
  //   password: string;
  //   isLogin: boolean;
  // }>(loginData);
  const themeColors = useSelector((state: RootState) => state.theme.colors);
  return (
    <Fragment>
      <Block
        backgroundColor={themeColors.accent}
        flex={1}
        marginHorizontal={scaler(16)}>
        <Block>
          <FormInput
            textInputProps={{
              placeholder: 'Enter your email',
              //  maxLength: 8,
            }}
            // setFocus={setFocus}
            //  label="Email"
            control={control}
            name={'email'}
            type={'email'}
            require={true}
          />
          <Block height={scaler(20)} />
          <FormInput
            right={true}
            textInputProps={{
              placeholder: 'Emter your password',
            }}
            // setFocus={setFocus}
            // label="Password"
            control={control}
            name={'password'}
            type={'password'}
            require={true}
          />
        </Block>
        <Block height={scaler(40)} />
        <Block marginHorizontal={scaler(26)}>
          <Touch
            backgroundColor={themeColors.primary}
            borderRadius={scaler(15)}
            padding={scaler(10)}
            onPress={handleSubmit(values => {
              if (
                loginData?.email === values?.email &&
                loginData?.password === values?.password
              ) {
                dispatch(setLogin({...values, isLogin: true}));
              } else {
                Alert.alert('You have entered wrong email or password');
              }

              // setData({
              //   ...values,
              //   isLogin: true,
              // });
            })}>
            <Typography
              fontSize={scaler(16)}
              color={'white'}
              textAlign="center">
              Log In
            </Typography>
          </Touch>
        </Block>
      </Block>
    </Fragment>
  );
}

export default LoginForm;
