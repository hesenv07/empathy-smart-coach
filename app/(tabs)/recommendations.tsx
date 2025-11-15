import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppContext } from '../../src/context/AppContext';

const assetLabels = {
  gold: 'Gold',
  bonds: 'Government Bonds',
  etf: 'Low-Risk ETF',
};

export default function Recommendations() {
  const { recommendations, monthlyPlan, addInvestment } = useAppContext();
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const handleInvest = () => {
    const asset = selectedAsset || recommendations[0]?.asset;
    if (asset && monthlyPlan) {
      const rec = recommendations.find((r) => r.asset === asset);
      addInvestment({
        id: Date.now().toString(),
        asset: asset as any,
        amount: monthlyPlan.amount,
        date: new Date(),
        expectedReturn: rec?.expectedReturn || 0,
        riskLevel: 'Low',
      });
      setSelectedAsset(null);
    }
  };

  const topRec = recommendations.find((r) => r.isTop);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Empathy Recommends</Text>
      <Text style={styles.subtitle}>Based on current market analysis</Text>

      {topRec && (
        <View style={styles.topCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>TOP CHOICE</Text>
          </View>
          <Text style={styles.assetName}>{assetLabels[topRec.asset]}</Text>
          <Text style={styles.return}>
            {(topRec.expectedReturn * 100).toFixed(2)}% expected return
          </Text>
          <Text style={styles.risk}>Risk: {topRec.riskLevel}</Text>
          <View style={styles.reasonBox}>
            <Text style={styles.reasonTitle}>Why this choice?</Text>
            <Text style={styles.reasonText}>{topRec.reason}</Text>
          </View>
        </View>
      )}

      <Text style={styles.sectionTitle}>Alternatives</Text>
      {recommendations
        .filter((r) => !r.isTop)
        .map((rec) => (
          <TouchableOpacity
            key={rec.asset}
            style={[
              styles.altCard,
              selectedAsset === rec.asset && styles.selectedCard,
            ]}
            onPress={() => setSelectedAsset(rec.asset)}
          >
            <Text style={styles.altAssetName}>{assetLabels[rec.asset]}</Text>
            <Text style={styles.altReturn}>
              {(rec.expectedReturn * 100).toFixed(2)}% return
            </Text>
            <Text style={styles.altReason}>{rec.reason}</Text>
          </TouchableOpacity>
        ))}

      <TouchableOpacity style={styles.investButton} onPress={handleInvest}>
        <Text style={styles.investButtonText}>
          {monthlyPlan?.autoInvest
            ? 'Approve Auto-Invest'
            : 'Invest Now'}
        </Text>
      </TouchableOpacity>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 24,
  },
  topCard: {
    backgroundColor: '#1A3A1A',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginBottom: 24,
  },
  badge: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  assetName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  return: {
    fontSize: 18,
    color: '#4CAF50',
    marginBottom: 4,
  },
  risk: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 16,
  },
  reasonBox: {
    backgroundColor: '#0F1A0F',
    padding: 12,
    borderRadius: 8,
  },
  reasonTitle: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  altCard: {
    backgroundColor: '#1A1E35',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  altAssetName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  altReturn: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 8,
  },
  altReason: {
    fontSize: 13,
    color: '#A0A0A0',
    lineHeight: 18,
  },
  investButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  investButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
