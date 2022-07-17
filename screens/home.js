import React, { useState, useEffect } from 'react';
import { Box, FlatList, Center, NativeBaseProvider, Text } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

export default function CoffeeAutonomous() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch('https://meendah.s3.us-east-2.amazonaws.com/allposts.json');
    const data = await resp.json();
    setData(data);
    setLoading(false);
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={style.card}>
        <Image style={style.cardImage} source={{ uri: item.image }} />
        <Text style={style.cardText}> {item.title}</Text>
        <Text style={style.cardbody}> {item.body}</Text>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Box> </Box>
        {loading && <Box>Loading..</Box>}
        {data && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </Center>
    </NativeBaseProvider>
  );
}

const style = StyleSheet.create({
  cardText: {
    fontSize: 24,
    padding: 5,
    marginTop:10,
  },
  cardbody: {
    fontSize: 14,
    padding: 5,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: '2%',
    width: '96%',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});
