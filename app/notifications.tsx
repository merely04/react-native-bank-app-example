import { NotificationsScreenContent } from '@/screens/notifications/NotificationsScreenContent';
import { Colors } from '@/shared/constants';
import { useColorScheme } from '@/shared/hooks/useColorScheme';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

const renderScene = SceneMap({
  all: () => NotificationsScreenContent({ filter: null }),
  payments: () => NotificationsScreenContent({ filter: 'payments' }),
  system: () => NotificationsScreenContent({ filter: 'system' }),
  delivery: () => NotificationsScreenContent({ filter: 'delivery' }),
  travel: () => NotificationsScreenContent({ filter: 'travel' }),
});

const routes = [
  { key: 'all', title: 'All' },
  { key: 'payments', title: 'Payments' },
  { key: 'system', title: 'System' },
  { key: 'delivery', title: 'Delivery' },
  { key: 'travel', title: 'Travel' },
];

export default function NotificationsScreen() {
  const layout = useWindowDimensions();

  const colorScheme = useColorScheme();

  const [index, setIndex] = useState(0);

  const activeColor = Colors[colorScheme ?? 'light'].tint;

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          scrollEnabled={true}
          activeColor={activeColor}
          inactiveColor="#AEAEAE"
          indicatorStyle={{ height: 2, backgroundColor: activeColor }}
          style={[
            styles.tabbar,
            { borderColor: Colors[colorScheme ?? 'light'].border },
          ]}
          tabStyle={styles.tab}
          pressColor="transparent"
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabbar: {
    width: 'auto',
    height: 40,
    backgroundColor: 'transparent',
    elevation: 1,
    shadowOpacity: 1,
    borderBottomWidth: 1,
  },
  tab: {
    width: 'auto',
    paddingHorizontal: 12,
    height: 40,
    marginTop: -5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#000',
    fontWeight: '600',
  },
});
