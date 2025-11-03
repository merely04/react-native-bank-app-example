import PlusIcon from '@/assets/icons/plus.svg';
import { Colors } from '@/constants';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface AddCardButtonProps {
  style?: StyleProp<ViewStyle>;
}

export const AddCardButton = (props: AddCardButtonProps) => {
  const { style } = props;

  const colorScheme = useColorScheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: Colors[colorScheme ?? 'light'].container,
          opacity: pressed ? 0.5 : 1,
        },
        style,
      ]}
    >
      <PlusIcon color={Colors[colorScheme ?? 'light'].foreground} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 98,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
});
