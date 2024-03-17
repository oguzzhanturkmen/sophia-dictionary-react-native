import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';

const TagList = ({ tags, onSelectionChange }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTagSelection = (tagName) => {
    const isAlreadySelected = selectedTags.includes(tagName);
    const updatedSelectedTags = isAlreadySelected
      ? selectedTags.filter(name => name !== tagName)
      : [...selectedTags, tagName];

    setSelectedTags(updatedSelectedTags);
    onSelectionChange(updatedSelectedTags); // Notify the parent component about the change
  };

  const tagsPerRow = Math.ceil(tags.length / 3);
  const rows = Array.from({ length: 3 }, (_, rowIndex) =>
    tags.slice(rowIndex * tagsPerRow, (rowIndex + 1) * tagsPerRow)
  );

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <ScrollView key={rowIndex} style={styles.row} horizontal={true}>
          {row.map((tag, tagIndex) => (
            <TouchableOpacity
              key={tagIndex}
              style={[styles.tag, selectedTags.includes(tag.name) ? styles.tagSelected : null]}
              onPress={() => toggleTagSelection(tag.name)}
            >
              <Text style={styles.tagText}>{tag.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    
    marginVertical: 5,
  },
  tag: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 4,
  },
  tagSelected: {
    backgroundColor: '#80c04e',
  },
  tagText: {
    color: '#ffffff',
  },
});

export default TagList;
