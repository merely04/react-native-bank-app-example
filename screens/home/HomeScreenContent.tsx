import { CardItem } from "@/entities/card";
import { AddCardButton } from '@/features/card/add-card-button';
import { ActionButton } from "@/screens/home/ui/ActionButton";
import MastercardIcon from '@/shared/assets/images/mastercard.svg';
import BonusesIcon from '@/shared/ui/icon/assets/bonuses.svg';
import DeliveryIcon from '@/shared/ui/icon/assets/delivery.svg';
import SupportIcon from '@/shared/ui/icon/assets/support.svg';
import TravelIcon from '@/shared/ui/icon/assets/travel.svg';
import { ScrollView, StyleSheet, View } from "react-native";
import { ExpensesHeader } from './ui/ExpensesHeader';
import { ExpensesSections } from './ui/ExpensesSections';

export const HomeScreenContent = () => {
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
				<View style={styles.actionsContainer}>
					<ActionButton href="/travel" icon={TravelIcon} title='Travel' />
					<ActionButton href="/delivery" icon={DeliveryIcon} title='Delivery' />
					<ActionButton href="/bonuses" icon={BonusesIcon} title='Bonuses' />
					<ActionButton href="/support" icon={SupportIcon} title='Support' />
				</View>

				<View style={styles.cardsContainer}>
					<CardItem
						icon={MastercardIcon}
						data={{
							type: 'debit',
							number: '2200223354124385',
							balance: 4098.12
						}}
					/>
					<CardItem
						icon={MastercardIcon}
						data={{
							type: 'virtual',
							number: '2200223354129081',
							balance: 14.71
						}}
					/>

					<AddCardButton style={{marginLeft: 'auto'}} />
				</View>

				<View style={styles.expansesContainer}>
					<ExpensesHeader categories={[
							{ type: 'moneyTransfer', amount: 300 },
							{ type: 'food', amount: 220 },
							{ type: 'entertainment', amount: 200 },
							{ type: 'other', amount: 150 }
						]}
					/>

					<ExpensesSections days={[
						{
							date: new Date(),
							expanses: [
								{
									type: 'moneyTransfer',
									recipient: {
										avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
										name: 'Matthew Billson'
									},
									amount: 5.555,
									date: new Date(),
								}
							]
						},
						{
							date: new Date(2024, 5, 10),
							expanses: [
								{
									type: 'moneyTransfer',
									recipient: {
										avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
										name: 'Matthew Billson'
									},
									amount: 56.19,
									date: new Date(2024, 5, 10, 13, 24)
								},
								{
									type: 'food',
									recipient: {
										avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
										name: 'Pizza Place'
									},
									amount: 122.47,
									date: new Date(2024, 5, 10, 12, 12)
								}
							]
						},
						{
							date: new Date(2024, 5, 9),
							expanses: [
								{
									type: 'entertainment',
									recipient: {
										avatarUrl: 'https://1000logos.net/wp-content/uploads/2023/04/Starbucks-logo-1536x864.png',
										name: 'Starbucks'
									},
									amount: 13.17,
									date: new Date(2024, 5, 9, 21, 2)
								},
								{
									type: 'other',
									recipient: {
										avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
										name: 'Book Store'
									},
									amount: 28,
									date: new Date(2024, 5, 9, 18, 33)
								}
							]
						}
					]} />
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexDirection: 'column',
    gap: 24,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expansesContainer: {
    paddingHorizontal: 16,
    flexDirection: 'column',
    gap: 32,
  }
});
