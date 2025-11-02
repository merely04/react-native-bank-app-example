import { NotificationType } from "@/entities/notification";
import { ScrollView } from "react-native";
import { allItems, paymentsItems, systemItems, travelItems } from "./model";
import { NotificationSection } from "./ui/NotificationSection";

interface NotificationsScreenContentProps {
	filter: NotificationType | null;
}

export const NotificationsScreenContent = (props: NotificationsScreenContentProps) => {
	const {filter} = props;

	const items = filter ? {
		payments: paymentsItems,
		travel: travelItems,
		system: systemItems,
		delivery: [],
	}[filter] : allItems;

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			{items.map((item) =>
				<NotificationSection
					key={item.date.getTime()}
					date={item.date}
					notifications={item.notifications} />
			)}
		</ScrollView>
	)
}
