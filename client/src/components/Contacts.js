import React from 'react';
import _ from 'lodash';

import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
} from 'native-base';

const Contacts = props => {
  return (
    <List>
      {_.range(5).map((item, index) => {
        return (
          <ListItem key={index} thumbnail>
            <Left>
              <Thumbnail source={{uri: 'https://i.pravatar.cc/200'}} />
            </Left>
            <Body>
              <Text>Sankhadeep</Text>
              <Text note numberOfLines={1}>
                Its time to build a difference . .
              </Text>
            </Body>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Contacts;
