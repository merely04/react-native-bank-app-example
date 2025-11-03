import { Text } from '@/components';
import { Colors } from '@/constants';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Expense } from '@/types';
import {
  convertExpenseTypeToColor,
  formatExpenseType,
  formatUSD,
} from '@/utils';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

interface DayExpenses {
  date: Date;
  expanses: Expense[];
}

interface ExpansesSections {
  days: DayExpenses[];
}

export const ExpensesSections = (props: ExpansesSections) => {
  const { days } = props;

  return (
    <View style={styles.container}>
      {days.map((day) => (
        <DaySection
          key={day.date.getTime()}
          date={day.date}
          expanses={day.expanses}
        />
      ))}
    </View>
  );
};

interface DaySectionProps {
  date: Date;
  expanses: Expense[];
}

const DaySection = (props: DaySectionProps) => {
  const { date, expanses } = props;

  return (
    <View style={styles.daySectionContainer}>
      <View>
        <Text style={styles.daySectionTitle}>{formatSectionDate(date)}</Text>
      </View>

      <View style={styles.daySectionItemsContainer}>
        {expanses.map((expanse) => (
          <SectionItem
            key={expanse.date + expanse.recipient.name}
            data={expanse}
          />
        ))}
      </View>
    </View>
  );
};

interface SectionItemProps {
  data: Expense;
}

const SectionItem = (props: SectionItemProps) => {
  const { data } = props;

  const colorSchema = useColorScheme();

  return (
    <View
      style={[
        styles.sectionItem,
        { backgroundColor: Colors[colorSchema ?? 'light'].container },
      ]}
    >
      <Image source={{ uri: data.recipient.avatarUrl }} style={styles.avatar} />

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.recipientName}>{data.recipient.name}</Text>
        </View>

        <View style={styles.row}>
          <View
            style={[
              styles.typeCirle,
              { backgroundColor: convertExpenseTypeToColor(data.type) },
            ]}
          />

          <View>
            <Text
              style={[
                styles.typeName,
                { color: Colors[colorSchema ?? 'light'].extra },
              ]}
            >
              {formatExpenseType(data.type)}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.infoContainer, { marginLeft: 'auto' }]}>
        <Text style={styles.amount}>{formatUSD(data.amount)}</Text>

        <Text
          style={[styles.date, { color: Colors[colorSchema ?? 'light'].extra }]}
        >
          {formatDate(data.date)}
        </Text>
      </View>
    </View>
  );
};

function formatSectionDate(date: Date): string {
  const now = new Date();

  const zeroTime = (d: Date) => {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

  const dateZero = zeroTime(date);
  const nowZero = zeroTime(now);

  const diffDays = Math.round((+nowZero - +dateZero) / (24 * 60 * 60 * 1000));
  if (diffDays === 0) {
    return 'Today';
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }

  const dayOfWeek = nowZero.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const weekStart = new Date(nowZero);
  weekStart.setDate(nowZero.getDate() - dayOfWeek);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  if (dateZero >= weekStart && dateZero <= weekEnd) {
    return 'This week';
  }

  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }); // "14 September"
  }

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }); // "14 September 2024"
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 24,
  },
  daySectionContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  daySectionTitle: {
    fontSize: 16,
    fontWeight: 'medium',
  },
  daySectionItemsContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  sectionItem: {
    height: 70,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 12,
    overflow: 'hidden',
  },
  recipientName: {
    fontSize: 14,
    fontWeight: 'medium',
  },
  infoContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  typeCirle: {
    width: 6,
    height: 6,
    borderRadius: 6,
  },
  typeName: {
    fontSize: 14,
    fontWeight: 'regular',
  },
  amount: {
    fontSize: 14,
    fontWeight: 'medium',
    textAlign: 'right',
  },
  date: {
    fontSize: 14,
    fontWeight: 'regular',
    textAlign: 'right',
  },
});
