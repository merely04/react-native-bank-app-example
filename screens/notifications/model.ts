import { Notification, NotificationType } from "@/entities/notification";

interface DayNotifications {
	date: Date;
	notifications: Notification[];
}

export const paymentsItems: DayNotifications[] = [
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
					card: {
						type: 'debit',
						number: '2200223354124385',
						balance: 4098.12
					},
					sender: {
						avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
						name: 'Anna'
					},
					recipient: {
						avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
						name: 'Matthew Billson'
					}
				},
				travelInfo: null,
				systemInfo: null,
			}
		],
	},
]

export const travelItems: DayNotifications[] = [
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
					message: 'Would you like to visit new countries? Maybe it’s your time!'
				},
				systemInfo: null,
			},
		]
	}
]

export const systemItems: DayNotifications[] = [
	{
		date: new Date('2025-05-24'),
		notifications: [
			{
				id: 2,
				type: NotificationType.System,
				createdAt: new Date('2025-05-24 15:44:00'),
				isRead: true,
				paymentInfo: null,
				travelInfo: null,
				systemInfo: {
					title: 'New login into account',
					message: 'You have logged in from a new location:\niOS 26.0.1 · 109.255.84.7 · Spain'
				},
			},
		]
	}
]

export const allItems: DayNotifications[] = [
	...paymentsItems,
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
					message: 'Would you like to visit new countries? Maybe it’s your time!'
				},
				systemInfo: null,
			},
			{
				id: 3,
				type: NotificationType.Payments,
				createdAt: new Date('2025-07-16 06:18:00'),
				isRead: true,
				paymentInfo: {
					card: {
						type: 'debit',
						number: '2200223354124385',
						balance: 3987.5
					},
					amount: -14.62,
					recipient: {
						avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
						name: 'Anna'
					},
					sender: {
						avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
						name: 'Matthew Billson'
					}
				},
				travelInfo: null,
				systemInfo: null,
			}
		]
	},
	...systemItems,
]
