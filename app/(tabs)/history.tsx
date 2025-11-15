import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppContext } from '../../src/context/AppContext';

export default function History() {
  const { portfolio } = useAppContext();

  const sortedInvestments = [...portfolio.investments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Investment History</Text>

      {sortedInvestments.map((investment) => (
        <View key={investment.id} style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.assetName}>
              {investment.asset === 'gold'
                ? 'Gold'
                : investment.asset === 'bonds'
                ? 'Government Bonds'
                : 'Low-Risk ETF'}
            </Text>
            <Text style={styles.amount}>${investment.amount.toFixed(2)}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailText}>
              {formatDate(investment.date)}
            </Text>
            <Text style={styles.returnText}>
              {(investment.expectedReturn * 100).toFixed(2)}% return
            </Text>
          </View>
        </View>
      ))}

      {sortedInvestments.length === 0 && (
        <Text style={styles.emptyText}>No investment history yet</Text>
      )}
    </ScrollView>
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
    marginTop: 60,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#1A1E35',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 13,
    color: '#A0A0A0',
  },
  returnText: {
    fontSize: 13,
    color: '#4CAF50',
  },
  emptyText: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
    marginTop: 40,
  },
});
