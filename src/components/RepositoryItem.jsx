import React from 'react';
import { View, Text } from 'react-native';



const RenderItem = ({ item }) => (
    //console.log('ITEM', item.fullName);
    <View >
        <Text > Full name: {item.fullName}</Text>
        <Text > Description: {item.description}</Text>
        <Text > Language: {item.language}</Text>
        <Text > Forksitko: {item.forksCount}</Text>
        <Text > Reviews: {item.reviewCount}</Text>
        <Text > Rating: {item.ratingAverage}</Text>
    </View>
);

export default RenderItem;