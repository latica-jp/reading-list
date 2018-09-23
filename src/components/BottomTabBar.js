import React from 'react';
import { Footer, FooterTab, Button, Text, Icon } from 'native-base';

const bottomTabBar = props => {
  const { t } = props.screenProps;
  return (
    <Footer>
      <FooterTab>
        <Button
          vertical
          active={props.navigation.state.index === 0}
          onPress={() => props.navigation.navigate('Home')}
        >
          <Icon type="MaterialCommunityIcons" name="library-books" />
          <Text>{t('Books')}</Text>
        </Button>
      </FooterTab>
      <FooterTab>
        <Button
          vertical
          active={props.navigation.state.index === 1}
          onPress={() => props.navigation.navigate('CameraModal')}
        >
          <Icon name="barcode" />
          <Text>{t('Barcode')}</Text>
        </Button>
      </FooterTab>
      {/* <FooterTab>
        <Button
          vertical
          active={props.navigation.state.index === 2}
          onPress={() => props.navigation.navigate('Test')}
        >
          <Icon name="home" />
          <Text>Test</Text>
        </Button>
      </FooterTab> */}
    </Footer>
  );
};

export default bottomTabBar;
