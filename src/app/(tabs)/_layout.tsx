import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

import { Colors } from '@/constants';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <NativeTabs
      labelStyle={styles.tabBarLabel}
      tintColor={Colors[colorScheme ?? 'light'].tint}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="ic_home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="payments">
        <Label>Payments</Label>
        <Icon sf="creditcard.fill" drawable="ic_payment" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="history">
        <Label>History</Label>
        <Icon sf="clock.fill" drawable="ic_history" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="analytics">
        <Label>Analytics</Label>
        <Icon sf="chart.bar.fill" drawable="ic_bar_chart" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="chats">
        <Label>Chats</Label>
        <Icon sf="message.fill" drawable="ic_chat" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
  } satisfies StyleProp<TextStyle>,
});
