import { NotificationType } from '@/entities/notification';
import { DayNotifications, mockNotifications } from '@/shared/mocks';
import { FlatList } from 'react-native';
import { NotificationSection } from './ui/NotificationSection';

interface NotificationsScreenContentProps {
  filter: NotificationType | null;
}

export const NotificationsScreenContent = (
  props: NotificationsScreenContentProps
) => {
  const { filter } = props;

  const filteredNotifications = filter
    ? mockNotifications
        .map((day) => ({
          date: day.date,
          notifications: day.notifications.filter((n) => n.type === filter),
        }))
        .filter((day) => day.notifications.length > 0)
    : mockNotifications;

  const renderNotificationSection = ({ item }: { item: DayNotifications }) => (
    <NotificationSection date={item.date} notifications={item.notifications} />
  );

  const keyExtractor = (item: DayNotifications) =>
    item.date.getTime().toString();

  return (
    <FlatList
      data={filteredNotifications}
      renderItem={renderNotificationSection}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />
  );
};
