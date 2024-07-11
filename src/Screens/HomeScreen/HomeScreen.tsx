import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {useGetPostsQuery} from '../../Store/ApiSlice';

function HomeScreen() {
  const {isLoading, isError, isSuccess, data} = useGetPostsQuery('');
  console.log(isLoading, isError, isSuccess);
  console.log(data);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Email:</Text>
        <Text>Name:</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
