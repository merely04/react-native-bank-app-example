import { Text } from '@/components';
import { Colors } from '@/constants';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Link, LinkProps } from 'expo-router';
import { ElementType, memo } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
} from 'react-native';

interface ActionButtonProps extends LinkProps {
  icon: ElementType;
  title: string;
}

export const ActionButton = memo<ActionButtonProps>((props) => {
  const { href, icon: Icon, title } = props;

  const themeColor = useColorScheme();

  return (
    <Link href={href} asChild={true}>
      <Pressable style={styles.container}>
        <View>
          <Icon
            width={24}
            height={24}
            color={Colors[themeColor ?? 'light'].tint}
          />
        </View>

        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </Link>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    paddingTop: 7.5,
    gap: 8,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'medium',
    textAlign: 'center',
  } satisfies StyleProp<TextStyle>,
});
