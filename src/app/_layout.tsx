import ArrowIcon from '@/assets/icons/arrow.svg';
import BackIcon from '@/assets/icons/arrow2.svg';
import QrIcon from '@/assets/icons/qr.svg';
import UserIcon from '@/assets/icons/user.svg';
import { Text } from '@/components';
import { Colors } from '@/constants';
import { DarkTheme, DefaultTheme } from '@/constants/themes';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ChatMarkButton } from '@/screens/Notifications/ChatMarkButton';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { HeaderBackButton } from '@react-navigation/elements';
import { ThemeProvider } from '@react-navigation/native';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import 'react-native-reanimated';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const router = useRouter();

  const segments = useSegments();
  const isModal = segments[0] === 'modal';

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: useClientOnlyValue(false, true),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          },
          headerBackButtonDisplayMode: 'minimal',
          headerLeft: (props) => {
            if (isModal || !props.canGoBack) {
              return null;
            }

            return (
              <HeaderBackButton
                {...props}
                displayMode="minimal"
                style={styles.backButton}
                backImage={() => <BackIcon color={props.tintColor} />}
                onPress={router.back}
              />
            );
          },
          headerTintColor: Colors[colorScheme ?? 'light'].foreground,
          headerTitleStyle: styles.headerTitle,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            title: '',
            headerLeft: () => (
              <Link href="/notifications" asChild={true}>
                <Pressable style={styles.profileButton}>
                  <View
                    style={[
                      {
                        backgroundColor:
                          Colors[colorScheme ?? 'light'].container,
                      },
                      styles.avatarContainer,
                    ]}
                  >
                    <UserIcon
                      color={Colors[colorScheme ?? 'light'].foreground}
                    />
                  </View>

                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.profileName}>Charlotte</Text>
                  </View>

                  <View style={{ marginLeft: 8, marginTop: 4 }}>
                    <ArrowIcon
                      color={Colors[colorScheme ?? 'light'].foreground}
                    />
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
        <Stack.Screen
          name="notifications"
          options={{
            headerTitle: 'Notifications',
            headerRight: ChatMarkButton,
          }}
        />
        <Stack.Screen name="profile" />
        <Stack.Screen name="travel" />
        <Stack.Screen name="delivery" />
        <Stack.Screen name="bonuses" />
        <Stack.Screen name="support" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  profileButton: {
    height: 36,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: -10,
    marginHorizontal: 10,
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
  } satisfies StyleProp<TextStyle>,
  qrButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: 'medium',
  },
});
