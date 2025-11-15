import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../src/context/AppContext';

export default function MonthlyPlan() {
  const [amount, setAmount] = useState('');
  const [dayOfMonth, setDayOfMonth] = useState('');
  const [autoInvest, setAutoInvest] = useState(true);
  const router = useRouter();
  const { setMonthlyPlan, generateRecommendations } = useAppContext();

  const handleContinue = () => {
    if (amount && dayOfMonth) {
      setMonthlyPlan({
        amount: parseFloat(amount),
        dayOfMonth: parseInt(dayOfMonth),
        autoInvest,
      });
      generateRecommendations();
      router.replace('/(tabs)/recommendations');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Plan</Text>
        <Text style={styles.subtitle}>Set up your automatic investment schedule</Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Monthly Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="$500"
              placeholderTextColor="#666"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              returnKeyType="done"
              blurOnSubmit={true}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Payment Day</Text>
            <TextInput
              style={styles.input}
              placeholder="15"
              placeholderTextColor="#666"
              value={dayOfMonth}
              onChangeText={setDayOfMonth}
              keyboardType="numeric"
              returnKeyType="done"
              blurOnSubmit={true}
            />
          </View>

          <View style={styles.switchContainer}>
            <View>
              <Text style={styles.switchLabel}>Auto-Invest</Text>
              <Text style={styles.switchSubtext}>Let Empathy choose investments automatically</Text>
            </View>
            <Switch
              value={autoInvest}
              onValueChange={setAutoInvest}
              trackColor={{ false: '#2A2E45', true: '#4CAF50' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    marginTop: 60,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 40,
  },
  form: {
    flex: 1,
  },
  field: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1A1E35',
    padding: 16,
    borderRadius: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1E35',
    padding: 16,
    borderRadius: 12,
  },
  switchLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  switchSubtext: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
