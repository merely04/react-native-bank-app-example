import { NotificationType } from '@/entities/notification';
import { ScrollView } from 'react-native';
import { mockNotifications } from '@/shared/mocks';
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {filteredNotifications.map((item) => (
        <NotificationSection
          key={item.date.getTime()}
          date={item.date}
          notifications={item.notifications}
        />
      ))}
    </ScrollView>
  );
};
