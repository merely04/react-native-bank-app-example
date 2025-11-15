import { Text } from '@/components';
import { Colors } from '@/constants';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

export const TooltipScreen = (props: PropsWithChildren) => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? 'light'].background },
      ]}
    >
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
