import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import TopicListProfile from '../../Profile/UserProfile/TopicListProfile';


const height = Dimensions.get("window").height;

const TopicListViewProfile = ({ topics, path, onRefresh  }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    if(onRefresh) {
      onRefresh(() => setRefreshing(false)); // Callback to stop refreshing
    }
  };
  return (
    <View style={styles.container}>
     
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        <TopicListProfile data={topics} path={path}  />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: height * 0.3 },
  scrollView: {height: height * 0.75 , },
});

export default TopicListViewProfile;
