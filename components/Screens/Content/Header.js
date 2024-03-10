import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ChevronLeftIcon, PencilSquareIcon } from 'react-native-heroicons/outline';
import { useRouter } from 'expo-router';

const width = Dimensions.get('window').width;

const Header = ({ name, onRefresh, onOpenModal }) => {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back({refresh : true} ) }>
        <ChevronLeftIcon size="38" strokeWidth={2.5} color="#80c04e" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.titleContainer} onPress={onRefresh}>
        <Text style={styles.titleText}>
          {name?.length > 74 ? name.substring(0, 74) + "..." : name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onOpenModal}>
        <PencilSquareIcon size="38" strokeWidth={2} color={"#80c04e"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 8,
    paddingBottom: 15,
    backgroundColor: '#191919'

  },
  backButton: { marginLeft: -8 },
  titleContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titleText: { color: 'white', fontSize: 20, textAlign: 'center', width: width * 0.8 },
});

export default Header;
