import { Notification, NotificationType } from '@/types';
import { mockCards } from './cards';
import { mockRecipients } from './recipients';

export interface DayNotifications {
  date: Date;
  notifications: Notification[];
}

export const mockNotifications: DayNotifications[] = [
  {
    date: new Date('2025-07-17'),
    notifications: [
      {
        id: 1,
        type: NotificationType.Payments,
        createdAt: new Date('2025-07-17 17:49:00'),
        isRead: false,
        paymentInfo: {
          amount: 110,
          card: mockCards[0],
          sender: mockRecipients[1],
          recipient: mockRecipients[0],
        },
        travelInfo: null,
        systemInfo: null,
      },
    ],
  },
  {
    date: new Date('2025-07-16'),
    notifications: [
      {
        id: 2,
        type: NotificationType.Travel,
        createdAt: new Date('2025-07-16 23:08:00'),
        isRead: true,
        paymentInfo: null,
        travelInfo: {
          title: 'See our limited offer!',
          message:
            "Would you like to visit new countries? Maybe it's your time!",
        },
        systemInfo: null,
      },
      {
        id: 3,
        type: NotificationType.Payments,
        createdAt: new Date('2025-07-16 06:18:00'),
        isRead: true,
        paymentInfo: {
          card: mockCards[0],
          amount: -14.62,
          recipient: mockRecipients[1],
          sender: mockRecipients[0],
        },
        travelInfo: null,
        systemInfo: null,
      },
    ],
  },
  {
    date: new Date('2025-05-24'),
    notifications: [
      {
        id: 4,
        type: NotificationType.System,
        createdAt: new Date('2025-05-24 15:44:00'),
        isRead: true,
        paymentInfo: null,
        travelInfo: null,
        systemInfo: {
          title: 'New login into account',
          message:
            'You have logged in from a new location:\niOS 26.0.1 · 109.255.84.7 · Spain',
        },
      },
    ],
  },
];
