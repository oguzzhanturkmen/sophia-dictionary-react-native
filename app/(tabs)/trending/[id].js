import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ContentListView from '../../../components/Screens/Content/ContentListView';
import PostModalWrapper from '../../../components/Screens/Content/PostModalWrapper';
import Header from '../../../components/Screens/Content/Header';
import PostModal from '../../../components/Utils/PostModal';

export default function Index() {
  const { id, name } = useLocalSearchParams();
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshPage = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleRefresh = () => {
    setModalVisible(false); 
  };
  

 

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <Header name={name} onRefresh={refreshPage} onOpenModal={() => setModalVisible(true)} />
      </SafeAreaView>
      <ContentListView id={id} refreshKey={refreshKey} />
      <PostModal
      isModalVisible={modalVisible}
      setModalVisible={setModalVisible}
      inputText={inputText}
      setInputText={setInputText}
      topicId={id}
      setRefresh={handleRefresh}
    />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#191919' },
  safeArea: { backgroundColor: '#191919' },
});
