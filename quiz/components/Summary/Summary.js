import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Summary({ data, answers }) {
  let score = 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quiz Summary</Text>

      {data.map((q, idx) => {
        const userAnswer = answers[idx];
        const correct = q.correct;
        let isCorrect = false;

        if (Array.isArray(correct)) {
          isCorrect = Array.isArray(userAnswer) &&
            correct.length === userAnswer.length &&
            correct.every(c => userAnswer.includes(c)) &&
            userAnswer.every(u => correct.includes(u));
        } else {
          isCorrect = userAnswer[0] === correct;
        }

        if (isCorrect) score++;

        return (
          <View key={idx} style={styles.questionBlock}>
            <Text style={styles.question}>{q.prompt}</Text>
            {q.choices.map((choice, i) => {
              const isUserSelected = userAnswer.includes(i);
              const isCorrectChoice = Array.isArray(correct) ? correct.includes(i) : correct === i;

              let style = styles.choice;
              if (isUserSelected && isCorrectChoice) style = [styles.choice, styles.correct];
              else if (isUserSelected && !isCorrectChoice) style = [styles.choice, styles.incorrect];

              return (
                <Text key={i} style={style}>
                  • {choice}
                </Text>
              );
            })}
          </View>
        );
      })}

      <Text testID="total" style={styles.score}>Total Score: {score} / {data.length}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  questionBlock: {
    marginBottom: 20,
  },
  question: {
    fontWeight: '600',
    marginBottom: 5,
  },
  choice: {
    marginLeft: 10,
    marginBottom: 2,
  },
  correct: {
    fontWeight: 'bold',
    color: 'green',
  },
  incorrect: {
    color: 'red',
  },
  score: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});