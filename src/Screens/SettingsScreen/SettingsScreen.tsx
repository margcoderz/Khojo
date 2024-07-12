import React from 'react';
import Block from '../../Components/Block/Block';
import Container from '../../Components/Container/Container';
import Picture from '../../Components/Picture/Picture';
import {images} from '../../Assets/Images';
import scaler from '../../Utils/scaler';
import Body from '../../Components/Body/Body';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';

const SettingsScreen = () => {
  const themeColors = useSelector((state: RootState) => state.theme.colors);

  return (
    <Container backgroundColor={themeColors.accent} fullScreen>
      <Body>
        <Block backgroundColor={themeColors.accent} flex={1}>
          <Block flex={0.7} alignItems="center">
            <Block flex={0.9} />
            <Picture
              source={images.logo}
              height={scaler(150)}
              width={scaler(150)}
            />
          </Block>
        </Block>
      </Body>
    </Container>
  );
};

export default SettingsScreen;
