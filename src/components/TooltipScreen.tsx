import { Text } from '@/components';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

export const TooltipScreen = (props: PropsWithChildren) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.children}</Text>
    </View>
  );
};

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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
