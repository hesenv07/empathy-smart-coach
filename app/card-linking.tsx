import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../src/context/AppContext';

export default function CardLinking() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const router = useRouter();
  const { setCardLinked } = useAppContext();

  const handleConnect = () => {
    if (cardNumber && expiry && cvv) {
      setCardLinked(true);
      router.replace('/monthly-plan');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect Your Card</Text>
      <Text style={styles.subtitle}>Link your payment method to start investing</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          placeholderTextColor="#666"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
          maxLength={16}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="MM/YY"
            placeholderTextColor="#666"
            value={expiry}
            onChangeText={setExpiry}
            maxLength={5}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="CVV"
            placeholderTextColor="#666"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            maxLength={3}
            secureTextEntry
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConnect}>
        <Text style={styles.buttonText}>Connect Card</Text>
      </TouchableOpacity>
    </View>
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
  input: {
    backgroundColor: '#1A1E35',
    padding: 16,
    borderRadius: 12,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
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
