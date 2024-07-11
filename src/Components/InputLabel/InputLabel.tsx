import {MotiView} from 'moti';
import React, {Fragment} from 'react';
import Block from '../Block/Block';
import Typography from '../Typography/Typography';
import scaler from '../../Utils/scaler';

function InputLabel(props: {
  label?: string;
  focus: boolean;
  labelColor: string;
  require?: boolean;
}) {
  const {label, focus, labelColor, require} = props;

  return (
    <Fragment>
      {label ? (
        <MotiView
          animate={{
            opacity: focus ? 1 : 0,
            zIndex: 1,
          }}>
          <Typography
            marginHorizontal={scaler(15)}
            type={'medium'}
            fontSize={scaler(15)}
            color={labelColor}
            backgroundColor={'white'}
            paddingHorizontal={scaler(5)}
            position="absolute">
            {label}
            {require && <Typography color={labelColor}>*</Typography>}
          </Typography>
          <Block height={scaler(10)} />
        </MotiView>
      ) : (
        <></>
      )}
    </Fragment>
  );
}

export default InputLabel;
