import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAppContext } from '../src/context/AppContext';

export default function Index() {
  const router = useRouter();
  const { hasCompletedOnboarding } = useAppContext();

  useEffect(() => {
    if (hasCompletedOnboarding) {
      router.replace('/(tabs)/recommendations');
    } else {
      router.replace('/onboarding');
    }
  }, [hasCompletedOnboarding]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
