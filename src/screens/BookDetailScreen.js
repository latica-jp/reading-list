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
            <Text>Back</Text>
          </Button>
        </Left>
        <Body>
          <Title>Book Detail</Title>
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
          <ListItemDivider text="TITLE" />
          <ListItem>
            <Text>{title}</Text>
          </ListItem>
          <ListItemDivider text="AUTHOR" />
          <ListItem>
            <Text>{author}</Text>
          </ListItem>
          <ListItemDivider text="PUBLISHER" />
          <ListItem>
            <Text>{publisher}</Text>
          </ListItem>
          <ListItemDivider text="CAPTION" />
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
