import React from 'react';
import Modal from 'react-native-modal';
import { Image, StyleSheet } from 'react-native';
import { Card, CardItem, Left, Body, Text } from 'native-base';

const bookInfoModal = props => {
  const { isbn, title, publisher, author, cover } = props.summary;
  return (
    <Modal {...props}>
      <Card>
        <CardItem header>
          <Text>{title}</Text>
        </CardItem>
        <CardItem>
          <Left>
            <Body cardBody>
              <Image
                source={{ uri: cover }}
                style={styles.coverImage}
                resizeMode="contain"
              />
              <Text>{author}</Text>
              <Text>{publisher}</Text>
              <Text>{isbn}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  coverImage: {
    padding: 20,
    height: 150,
  },
});

export default bookInfoModal;
