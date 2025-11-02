import { Colors } from '@/shared/constants';
import { useColorScheme } from '@/shared/hooks/useColorScheme';
import { Text } from '@/shared/ui';
import { Link, LinkProps } from 'expo-router';
import { ElementType } from 'react';
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

export const ActionButton = (props: ActionButtonProps) => {
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
};

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
