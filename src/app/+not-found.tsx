import { NotFoundScreenContent } from '@/screens/NotFound';
import { Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <NotFoundScreenContent />
    </>
  );
}
