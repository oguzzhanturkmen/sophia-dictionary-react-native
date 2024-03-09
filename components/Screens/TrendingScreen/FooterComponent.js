import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ChevronLeftIcon, ChevronRightIcon } from "react-native-heroicons/outline";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Footer = ({ handlePrevPage, handleNextPage, currentPage, totalPages }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={handlePrevPage}>
        <ChevronLeftIcon size="38" strokeWidth={2.5} color="#80c04e" />
      </TouchableOpacity>
      <Text style={styles.pageText}>
        {currentPage + 1} / {totalPages}
      </Text>
      <TouchableOpacity onPress={handleNextPage}>
        <ChevronRightIcon size="38" strokeWidth={2.5} color="#80c04e" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    height: height * 0.045,
    width: width,
    backgroundColor: "#191919",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    position: "absolute",
    alignItems: "center",
    bottom: height * 0.0935,
    zIndex: 100,
  },
  pageText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default Footer;
