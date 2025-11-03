import { Colors } from '@/constants';
import { memo, useMemo } from 'react';
import {
  Text as NativeText,
  TextProps as NativeTextProps,
  useColorScheme,
} from 'react-native';

type TextProps = NativeTextProps;

export const Text = memo<TextProps>((props) => {
  const { style, ...otherProps } = props;

  const colorScheme = useColorScheme();

  const memoizedValues = useMemo(() => {
    const fontWeight = getLastFontWeight(style) ?? 'regular';

    const fontFamily = {
      regular: 'Inter_400Regular',
      medium: 'Inter_500Medium',
      semibold: 'Inter_600SemiBold',
      bold: 'Inter_700Bold',
    }[fontWeight];

    return {
      fontFamily,
      textStyle: [
        { fontFamily, color: Colors[colorScheme ?? 'light'].foreground },
        style,
      ],
    };
  }, [style, colorScheme]);

  return <NativeText style={memoizedValues.textStyle} {...otherProps} />;
});

function getLastFontWeight(style: any): string | undefined {
  if (!style) return undefined;

  if (Array.isArray(style)) {
    for (let i = style.length - 1; i >= 0; i--) {
      const result = getLastFontWeight(style[i]);
      if (result) return result;
    }
  } else if (typeof style === 'object') {
    if ('fontWeight' in style && style.fontWeight) return style.fontWeight;
  }
  return undefined;
}
