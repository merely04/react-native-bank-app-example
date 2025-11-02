import { ChatMarkButton } from '@/features/notifications/chat-mark-button';
import { Colors } from '@/shared/constants';
import { DarkTheme, DefaultTheme } from '@/shared/constants/themes';
import { useClientOnlyValue } from '@/shared/hooks/useClientOnlyValue';
import { useColorScheme } from '@/shared/hooks/useColorScheme';
import BackIcon from '@/shared/ui/icon/assets/arrow2.svg';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { HeaderBackButton } from '@react-navigation/elements';
import { ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
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
    // SpaceMono: require('../shared/assets/fonts/SpaceMono-Regular.ttf'),
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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
  backButton: {
    width: 40, // 24 - original size, 40 - size with padding
    height: 24,
    marginLeft: -8, // 16 header padding, 40 (width with button padding for accessibility) - (24 / 2) half from origin size
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: 'medium',
  },
});
