import { Text } from '@/shared/ui';
import { StyleSheet, View } from "react-native";

export default function DeliveryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery</Text>
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
