import React, {Fragment} from 'react';
import {Control, RegisterOptions, useController} from 'react-hook-form';
import CountryPicker from 'react-native-country-picker-modal';
// @ts-ignore
import {MaterialIndicator} from 'react-native-indicators';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import scaler from '../../Utils/scaler';
import useCountryCode from '../../Hooks/useCountryCode';

type CallingCodeProps = {
  name: string;
  label?: string;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  control?: Control<any>;
  callback?: () => void;
};

function CallingCode({name, rules, control, callback}: CallingCodeProps) {
  const {field} = useController({
    name,
    rules,
    control,
  });
  const {onSelect, countryCode} = useCountryCode(field);
  const themeColors = useSelector((state: RootState) => state.theme.colors);
  const font = useSelector((state: RootState) => state.theme.font);

  return (
    <Fragment>
      {countryCode ? (
        <CountryPicker
          countryCode={countryCode}
          withCallingCode
          withCallingCodeButton
          onSelect={(country: any) => {
            onSelect(country);
            if (callback) {
              setTimeout(() => {
                callback();
              }, 150);
            }
          }}
          excludeCountries={['AQ', 'TF', 'HM', 'BV']}
          withFilter
          theme={{
            fontSize: scaler(15),
            ...font.bold,
            onBackgroundTextColor: themeColors.text,
          }}
        />
      ) : (
        <MaterialIndicator size={scaler(15)} />
      )}
    </Fragment>
  );
}

export default CallingCode;
