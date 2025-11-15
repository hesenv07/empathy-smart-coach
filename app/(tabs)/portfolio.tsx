import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppContext } from '../../src/context/AppContext';

export default function Portfolio() {
  const { portfolio } = useAppContext();

  const assetTotals = portfolio.investments.reduce((acc, inv) => {
    acc[inv.asset] = (acc[inv.asset] || 0) + inv.amount;
    return acc;
  }, {} as Record<string, number>);

  const totalReturn = portfolio.investments.reduce(
    (sum, inv) => sum + inv.amount * inv.expectedReturn,
    0
  );

  const returnPercent =
    portfolio.totalBalance > 0
      ? (totalReturn / portfolio.totalBalance) * 100
      : 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Portfolio</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>
          ${portfolio.totalBalance.toFixed(2)}
        </Text>
        <Text
          style={[
            styles.returnText,
            returnPercent >= 0 ? styles.positive : styles.negative,
          ]}
        >
          {returnPercent >= 0 ? '+' : ''}
          {returnPercent.toFixed(2)}% expected return
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Asset Distribution</Text>
      {Object.entries(assetTotals).map(([asset, amount]) => {
        const percentage = (amount / portfolio.totalBalance) * 100;
        return (
          <View key={asset} style={styles.assetRow}>
            <View style={styles.assetInfo}>
              <Text style={styles.assetName}>
                {asset === 'gold'
                  ? 'Gold'
                  : asset === 'bonds'
                  ? 'Government Bonds'
                  : 'Low-Risk ETF'}
              </Text>
              <Text style={styles.assetAmount}>${amount.toFixed(2)}</Text>
            </View>
            <Text style={styles.assetPercent}>{percentage.toFixed(1)}%</Text>
          </View>
        );
      })}

      {portfolio.investments.length === 0 && (
        <Text style={styles.emptyText}>No investments yet</Text>
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
  balanceCard: {
    backgroundColor: '#1A1E35',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  returnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  positive: {
    color: '#4CAF50',
  },
  negative: {
    color: '#F44336',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  assetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1E35',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  assetAmount: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  assetPercent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  emptyText: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
    marginTop: 40,
  },
});
