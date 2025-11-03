import { NotificationType } from '@/types';

export const formatNotificationType = (notificationType: NotificationType) => {
  return {
    payments: 'Payments',
    travel: 'Travel',
    system: 'System',
    delivery: 'Delivery',
  }[notificationType];
};
