import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-screens';
import TopicList from '../../Utils/TopicList';


const height = Dimensions.get("window").height;

const TopicListView = ({ topics }) => {
  return (
    <View style={styles.container}>
      <SearchBar />
      <ScrollView style={styles.scrollView}>
        <TopicList data={topics} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: height * 0.3 },
  scrollView: {},
});

export default TopicListView;
