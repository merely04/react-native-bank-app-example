import { Text } from '@/shared/ui';
import { View, StyleSheet } from 'react-native';

export default function TravelScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
