/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  useController,
  useForm,
} from 'react-hook-form';
import {FlatList, Pressable} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import InputText from '../InputText/InputText';
import {SELECT_OPTIONS} from '../../Utils/Types';
import Container from '../Container/Container';
import Block from '../Block/Block';
import Typography from '../Typography/Typography';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';

type AutocompleteProps = {
  visible: boolean;
  options: SELECT_OPTIONS;
  field: ControllerRenderProps<FieldValues, string>;
  setVisible: (visible: boolean) => void;
  label?: string;
  placeholder?: string;
};

function Autocomplete(props: AutocompleteProps) {
  const {visible, options, field, setVisible, label, placeholder} = props;
  const {control, watch} = useForm({
    defaultValues: {
      search: '',
    },
  });
  const controller = useController({control, name: 'search'});
  const themeColors = useSelector((state: RootState) => state.theme.colors);

  return (
    <ReactNativeModal
      isVisible={visible}
      useNativeDriver
      useNativeDriverForBackdrop
      hardwareAccelerated
      onBackButtonPress={() => {
        setVisible(false);
      }}
      onBackdropPress={() => {
        setVisible(false);
      }}
      animationInTiming={500}
      animationOutTiming={500}
      style={{margin: 0}}>
      <Container>
        <Block>
          <Block flexDirection={'row'} padding={10}>
            <Block flex={1} />
            <Block justifyContent={'center'} flex={10}>
              <Typography fontSize={22} textAlign={'center'}>
                {placeholder ?? label}
              </Typography>
            </Block>
            <Block flex={1} alignItems={'center'}>
              {/* <IconButton
                name={'close'}
                iconVariant={'onSurface'}
                onPress={() => {
                  setVisible(false);
                }}
              /> */}
            </Block>
          </Block>
          <Block padding={10}>
            <InputText
              //@ts-ignore
              field={controller.field}
              formState={controller.formState}
              textInputProps={{
                placeholder: 'Search',
              }}
            />
          </Block>
        </Block>
        <FlatList
          data={options.filter(
            option =>
              option?.label
                .toLowerCase()
                .indexOf(watch('search')?.toLowerCase()) !== -1,
          )}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                field.onChange(`${item.value}`);
                setTimeout(() => {
                  setVisible(false);
                }, 100);
              }}>
              <Block
                alignItems={'center'}
                paddingHorizontal={20}
                flexDirection={'row'}
                height={50}>
                <Typography
                  textTransform="capitalize"
                  variant={
                    `${item.value}` === `${field.value}` ? 'primary' : 'text'
                  }>
                  {item.label}
                </Typography>
              </Block>
            </Pressable>
          )}
          keyExtractor={item => `${item.value}`}
          ItemSeparatorComponent={() => (
            <Block height={1} backgroundColor={themeColors.divider} />
          )}
          ListFooterComponent={() => (
            <Block height={1} backgroundColor={themeColors.divider} />
          )}
        />
      </Container>
    </ReactNativeModal>
  );
}

export default Autocomplete;
