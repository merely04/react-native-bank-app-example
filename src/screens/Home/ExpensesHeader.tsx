import { Text } from '@/components';
import { Colors } from '@/constants';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ExpenseType } from '@/types';
import { convertExpenseTypeToColor, formatUSD } from '@/utils';
import { memo, useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface Category {
  type: ExpenseType;
  amount: number;
}

interface ExpensesProps {
  categories: Category[];
  style?: StyleProp<ViewStyle>;
}

const GAP = 2;

export const ExpensesHeader = memo<ExpensesProps>((props) => {
  const { categories, style } = props;

  const colorSheme = useColorScheme();

  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  const date = useMemo(() => new Date(), []);

  const memoizedValues = useMemo(() => {
    const totalAmount = categories.reduce((sum, c) => sum + c.amount, 0);
    const gapCount = Math.max(0, categories.length - 1);
    const totalGapWidth = GAP * gapCount;
    const availableWidth = containerWidth ? containerWidth - totalGapWidth : 0;

    const categoriesWithPercent = categories.map((c) => ({
      ...c,
      percent: totalAmount === 0 ? 0 : (c.amount / totalAmount) * 100,
    }));

    return {
      totalAmount,
      availableWidth,
      categoriesWithPercent,
    };
  }, [categories, containerWidth]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Expenses in{' '}
          <Text style={{ color: Colors[colorSheme ?? 'light'].tint }}>
            {formatMonth(date)}
          </Text>
        </Text>

        <Text style={styles.totalAmount}>
          {formatUSD(memoizedValues.totalAmount)}
        </Text>
      </View>

      <View style={styles.categoriesContainer} onLayout={handleLayout}>
        {memoizedValues.categoriesWithPercent.map((c) => {
          const width =
            memoizedValues.availableWidth > 0 && memoizedValues.totalAmount > 0
              ? (c.amount / memoizedValues.totalAmount) *
                memoizedValues.availableWidth
              : 0;

          const finalWidth = Math.max(
            width,
            memoizedValues.totalAmount > 0 && width > 0 ? 1 : 0
          );

          return (
            <View
              key={c.type}
              style={[
                styles.category,
                {
                  width: finalWidth,
                  backgroundColor: convertExpenseTypeToColor(c.type),
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
});

function formatMonth(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 21,
    fontWeight: 'medium',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'regular',
  },
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GAP,
  },
  category: {
    height: 8,
    borderRadius: 3,
  },
});
