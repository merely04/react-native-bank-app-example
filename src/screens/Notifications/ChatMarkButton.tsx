import ChatMarkIcon from '@/assets/icons/chat-mark.svg';
import { Colors } from '@/constants';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Pressable, StyleSheet } from 'react-native';

export const ChatMarkButton = () => {
  const colorScheme = useColorScheme();

  return (
    <Pressable style={styles.chatMarkButton}>
      {({ pressed }) => (
        <ChatMarkIcon
          color={Colors[colorScheme ?? 'light'].foreground}
          style={{ opacity: pressed ? 0.5 : 1 }}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chatMarkButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
});
