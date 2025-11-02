import { Text } from '@/shared/ui';
import AnalyticsIcon from '@/shared/ui/icon/assets/analytics.svg';
import ArrowIcon from '@/shared/ui/icon/assets/arrow.svg';
import ChatsIcon from '@/shared/ui/icon/assets/chats.svg';
import HistoryIcon from '@/shared/ui/icon/assets/history.svg';
import HomeIcon from '@/shared/ui/icon/assets/home.svg';
import PaymentsIcon from '@/shared/ui/icon/assets/payments.svg';
import QrIcon from '@/shared/ui/icon/assets/qr.svg';
import UserIcon from '@/shared/ui/icon/assets/user.svg';
import { Link, Tabs } from 'expo-router';
import { ElementType } from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import { Colors } from '@/shared/constants';
import { useClientOnlyValue } from '@/shared/hooks/useClientOnlyValue';
import { useColorScheme } from '@/shared/hooks/useColorScheme';

interface TabBarIconProps {
  icon: ElementType,
  color: string;
}

const TabBarIcon = (props: TabBarIconProps) => {
  const {icon: Icon, color} = props;

  return <Icon width={20} height={20} color={color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].foreground,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].tabs,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        animation: 'fade',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon icon={HomeIcon} color={color} />,
          headerLeft: () => (
            <Link href="/notifications" asChild={true}>
               <Pressable style={styles.profileButton}>
                  <View style={[ {
                    backgroundColor: Colors[colorScheme ?? 'light'].container,
                  }, styles.avatarContainer]}>
                    <UserIcon color={Colors[colorScheme ?? 'light'].foreground}/>
                  </View>

                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.profileName}>Charlotte</Text>
                  </View>

                  <View style={{ marginLeft: 8, marginTop: 4 }}>
                    <ArrowIcon color={Colors[colorScheme ?? 'light'].foreground} />
                  </View>
              </Pressable>
            </Link>
          ),
          headerTitle: () => null,
          headerRight: () => (
            <Link href="/modal" asChild={true}>
              <Pressable style={styles.qrButton}>
                {({ pressed }) => (
                  <QrIcon
                    color={Colors[colorScheme ?? 'light'].foreground}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: 'Payments',
          tabBarIcon: ({ color }) => <TabBarIcon icon={PaymentsIcon} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <TabBarIcon icon={HistoryIcon} color={color} />,
        }}
      />
       <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color }) => <TabBarIcon icon={AnalyticsIcon} color={color} />,
        }}
      />
       <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => <TabBarIcon icon={ChatsIcon} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  profileButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    flexDirection: 'row',
  } satisfies StyleProp<ViewStyle>,
  profileName: {
    fontSize: 16,
    fontWeight: 'medium',
  }  satisfies StyleProp<TextStyle>,
  qrButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tabBarLabel: {
    fontSize: 12,
  } satisfies StyleProp<TextStyle>,
})
