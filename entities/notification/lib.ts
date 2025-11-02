import { NotificationType } from "./model";

export const formatNotificationType = (notificationType: NotificationType) => {
	return {
		payments: 'Payments',
		travel: 'Travel',
		system: 'System',
		delivery: 'Delivery',
	}[notificationType];
}
