import { CardItem } from '@/entities/card';
import { AddCardButton } from '@/features/card/add-card-button';
import { ActionButton } from '@/screens/home/ui/ActionButton';
import MastercardIcon from '@/shared/assets/images/mastercard.svg';
import BonusesIcon from '@/shared/ui/icon/assets/bonuses.svg';
import DeliveryIcon from '@/shared/ui/icon/assets/delivery.svg';
import SupportIcon from '@/shared/ui/icon/assets/support.svg';
import TravelIcon from '@/shared/ui/icon/assets/travel.svg';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ExpensesHeader } from './ui/ExpensesHeader';
import { ExpensesSections } from './ui/ExpensesSections';
import { mockCards, mockCategories, mockExpenses } from '@/shared/mocks';

export const HomeScreenContent = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.actionsContainer}>
          <ActionButton href="/travel" icon={TravelIcon} title="Travel" />
          <ActionButton href="/delivery" icon={DeliveryIcon} title="Delivery" />
          <ActionButton href="/bonuses" icon={BonusesIcon} title="Bonuses" />
          <ActionButton href="/support" icon={SupportIcon} title="Support" />
        </View>

        <View style={styles.cardsContainer}>
          {mockCards.map((card, index) => (
            <CardItem key={card.number} icon={MastercardIcon} data={card} />
          ))}
          <AddCardButton style={{ marginLeft: 'auto' }} />
        </View>

        <View style={styles.expansesContainer}>
          <ExpensesHeader categories={mockCategories} />
          <ExpensesSections days={mockExpenses} />
        </View>
      </View>
    </ScrollView>
  );
};

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
  },
});
