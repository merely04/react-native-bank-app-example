import { Card } from '../card';
import { Recipient } from '../expense';

export const NotificationType = {
  Payments: 'payments',
  Travel: 'travel',
  System: 'system',
  Delivery: 'delivery',
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

interface PaymentInfo {
  amount: number;
  card: Card;
  sender: Recipient;
  recipient: Recipient;
}

interface TravelInfo {
  title: string;
  message: string;
}

interface SystemInfo {
  title: string;
  message: string;
}

export interface Notification {
  id: number;
  type: NotificationType;
  createdAt: Date;
  isRead: boolean;
  paymentInfo: PaymentInfo | null;
  travelInfo: TravelInfo | null;
  systemInfo: SystemInfo | null;
}
