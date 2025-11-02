import { formatCard } from '@/entities/card';
import { formatUSD } from '@/entities/currency';
import { type Notification } from '@/entities/notification';
import { formatNotificationType } from '@/entities/notification/lib';
import { Colors } from '@/shared/constants';
import { useColorScheme } from '@/shared/hooks/useColorScheme';
import { Text } from '@/shared/ui';
import ShieldIcon from '@/shared/ui/icon/assets/shield.svg';
import TransferIcon from '@/shared/ui/icon/assets/transfer.svg';
import TravelIcon from '@/shared/ui/icon/assets/travel.svg';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

interface NotificationSectionProps {
  date: Date;
  notifications: Notification[];
}

export const NotificationSection = (props: NotificationSectionProps) => {
  const { date, notifications } = props;

  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.notificationSectionContainer,
        { borderBottomColor: Colors[colorScheme ?? 'light'].border },
      ]}
    >
      <View style={styles.notificationSectionDateContainer}>
        <Text style={[styles.notificationSectionDateText]}>
          {formatDate(date)}
        </Text>
      </View>

      <View style={styles.notificationSectionItemsContainer}>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} data={notification} />
        ))}
      </View>
    </View>
  );
};

interface NotificationItemProps {
  data: Notification;
}

const NotificationItem = (props: NotificationItemProps) => {
  const { data } = props;

  const colorScheme = useColorScheme();

  const Icon = {
    payments: TransferIcon,
    travel: TravelIcon,
    delivery: null,
    system: ShieldIcon,
  }[data.type];

  const title = {
    payments: data.paymentInfo
      ? data.paymentInfo.amount > 0
        ? `Received from ${data.paymentInfo.sender.name}`
        : `Sent to ${data.paymentInfo.recipient.name}`
      : null,
    travel: data.travelInfo?.title ?? 'Travel info',
    delivery: null,
    system: data.systemInfo?.title ?? 'System info',
  }[data.type];

  const message = {
    payments: null,
    travel: data.travelInfo?.message ?? null,
    delivery: null,
    system: data.systemInfo?.message ?? null,
  }[data.type];

  return (
    <View style={styles.notificationItemContainer}>
      {data.paymentInfo !== null && data.paymentInfo.amount > 0 ? (
        <Image
          source={{ uri: data.paymentInfo.sender.avatarUrl }}
          style={styles.notificationItemIconContainer}
        />
      ) : Icon === null ? null : (
        <View
          style={[
            styles.notificationItemIconContainer,
            { backgroundColor: Colors[colorScheme ?? 'light'].container },
          ]}
        >
          <Icon
            style={styles.notificationItemIcon}
            color={Colors[colorScheme ?? 'light'].tint}
          />
        </View>
      )}

      <View style={styles.notificationItemInfoContainer}>
        <View>
          <Text style={styles.notificationItemInfoTitle}>{title}</Text>
        </View>

        {data.paymentInfo !== null && (
          <View style={{ marginTop: -2 }}>
            <Text
              style={[
                styles.notificationItemInfoAmount,
                { color: Colors[colorScheme ?? 'light'].tint },
              ]}
            >
              {formatAmount(data.paymentInfo.amount)}
            </Text>
          </View>
        )}
        {message && (
          <View>
            <Text style={styles.notificationItemInfoMessage}>{message}</Text>
          </View>
        )}
        {data.paymentInfo !== null && (
          <View>
            <Text style={styles.notificationItemInfoCard}>
              {`${formatCard(data.paymentInfo.card)}\n${formatUSD(data.paymentInfo.card.balance)}`}
            </Text>
          </View>
        )}

        <View>
          <Text style={styles.notificationItemInfoExtra}>
            {formatCreatedAt(data.createdAt)} ·{' '}
            {formatNotificationType(data.type)}
          </Text>
        </View>
      </View>

      {!data.isRead && (
        <View style={styles.notificationItemStatusContainer}>
          <View
            style={[
              styles.notificationItemStatus,
              { backgroundColor: Colors[colorScheme ?? 'light'].tint },
            ]}
          />
        </View>
      )}
    </View>
  );
};

function formatCreatedAt(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

function formatAmount(amount: number) {
  const sign = amount >= 0 ? '+' : '';

  const isInteger = Number.isInteger(amount);

  const formattedNumber = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    signDisplay: 'always',
    minimumFractionDigits: isInteger ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${sign}${formattedNumber}`;
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffDays = Math.round((+now - +date) / (24 * 60 * 60 * 1000));
  if (diffDays === 0) {
    return 'Today';
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }

  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  }
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const styles = StyleSheet.create({
  notificationSectionContainer: {
    paddingBottom: 17,
    flexDirection: 'column',
    gap: 16,
    borderBottomWidth: 1,
  },
  notificationSectionDateContainer: {
    paddingHorizontal: 16,
    height: 31,
    justifyContent: 'flex-end',
  },
  notificationSectionDateText: {
    fontSize: 12,
    fontWeight: 'semibold',
    color: '#AEAEAE',
  },
  notificationSectionItemsContainer: {
    flexDirection: 'column',
    gap: 24,
  },
  notificationItemContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 12,
  },
  notificationItemIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationItemIcon: {
    width: 20,
    height: 20,
  },
  notificationItemInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 6,
  },
  notificationItemInfoTitle: {
    fontSize: 14,
    fontWeight: 'medium',
  },
  notificationItemInfoMessage: {
    fontSize: 14,
    fontWeight: 'regular',
    color: '#AEAEAE',
  },
  notificationItemInfoCard: {
    fontSize: 14,
    fontWeight: 'regular',
    color: '#AEAEAE',
  },
  notificationItemInfoAmount: {
    fontSize: 21,
    fontWeight: 'semibold',
  },
  notificationItemInfoExtra: {
    fontSize: 12,
    fontWeight: 'regular',
    color: '#616161',
  },
  notificationItemStatusContainer: {
    width: 18,
    height: 18,
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationItemStatus: {
    width: 6,
    height: 6,
    borderRadius: 6,
  },
});
