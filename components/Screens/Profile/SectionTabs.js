// SectionTabs.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SectionTabs = ({ sectionSelected, onSelectSection }) => (
  <View style={styles.tabsContainer}>
    {["entries", "topics", "favorites"].map((section) => (
      <TouchableOpacity
        key={section}
        onPress={() => onSelectSection(section)}
        style={sectionSelected === section ? styles.selectedTab : styles.notSelectedTab}
      >
        <Text style={styles.tabText}>{section.charAt(0).toUpperCase() + section.slice(1)}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 8,
    paddingBottom: 15,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#80c04e',
  },
  notSelectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SectionTabs;
