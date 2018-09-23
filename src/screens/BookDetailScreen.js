import React from 'react';
import { StyleSheet, Image } from 'react-native';
import {
  Header,
  Container,
  Content,
  Left,
  Body,
  Right,
  Title,
  List,
  ListItem,
  Button,
  Text,
  Icon,
} from 'native-base';

import { ListItemDivider } from '../components';

const bookDetailScreen = props => {
  const { t } = props.screenProps;

  // getParam はフォールバックが効くので使ってみているが、もうちょっと簡潔に書きたい
  const title = props.navigation.getParam('title', '');
  const author = props.navigation.getParam('author', '');
  const publisher = props.navigation.getParam('publisher', '');
  const cover = props.navigation.getParam('cover', '');
  const itemCaption = props.navigation.getParam('itemCaption', '');
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
            <Text>{t('Back')}</Text>
          </Button>
        </Left>
        <Body>
          <Title>{t('Book Detail')}</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        {cover && (
          <Image
            source={{ uri: cover }}
            style={styles.coverImage}
            resizeMode="contain"
          />
        )}
        <List>
          <ListItemDivider text={t('Title')} />
          <ListItem>
            <Text>{title}</Text>
          </ListItem>
          <ListItemDivider text={t('Author')} />
          <ListItem>
            <Text>{author}</Text>
          </ListItem>
          <ListItemDivider text={t('Publisher')} />
          <ListItem>
            <Text>{publisher}</Text>
          </ListItem>
          <ListItemDivider text={t('Caption')} />
          <ListItem>
            <Text>{itemCaption}</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  coverImage: {
    margin: 20,
    height: 200,
  },
});

export default bookDetailScreen;
