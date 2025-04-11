import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Question({ data, index, handleAnswer }) {
  const question = data[index];
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const isMultipleAnswer = question.type === 'multiple-answer';

  const handleSelection = (selectedIndex) => {
    if (isMultipleAnswer) {
      if (selectedIndexes.includes(selectedIndex)) {
        setSelectedIndexes(selectedIndexes.filter(i => i !== selectedIndex)); 
      } else {
        setSelectedIndexes([...selectedIndexes, selectedIndex]); 
      }
    } else {
      setSelectedIndexes([selectedIndex]);
    }
  };

  const handleNext = () => {
    handleAnswer(selectedIndexes);
    setSelectedIndexes([]); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.prompt}>{question.prompt}</Text>
      <View style={styles.buttonContainer}>
        {question.choices.map((choice, index) => {
          const isSelected = selectedIndexes.includes(index);
          return (
            <TouchableOpacity
              key={index}
              style={[styles.choiceButton, isSelected && styles.selectedChoice]} 
              onPress={() => handleSelection(index)}
            >
              <Text style={[styles.choiceText, isSelected && styles.selectedText]}>
                {choice}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Button title="Next" testID="next-question" onPress={handleNext} disabled={selectedIndexes.length === 0} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  prompt: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20, 
  },
  choiceButton: {
    backgroundColor: 'gray', 
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  selectedChoice: {
    backgroundColor: 'blue', 
  },
  choiceText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedText: {
    fontWeight: 'bold', 
  },
});