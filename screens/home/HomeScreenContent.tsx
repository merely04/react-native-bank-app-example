import { CardItem } from '@/entities/card';
import { AddCardButton } from '@/features/card/add-card-button';
import { ActionButton } from '@/screens/home/ui/ActionButton';
import MastercardIcon from '@/shared/assets/images/mastercard.svg';
import BonusesIcon from '@/shared/ui/icon/assets/bonuses.svg';
import DeliveryIcon from '@/shared/ui/icon/assets/delivery.svg';
import SupportIcon from '@/shared/ui/icon/assets/support.svg';
import TravelIcon from '@/shared/ui/icon/assets/travel.svg';
import { memo, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ExpensesHeader } from './ui/ExpensesHeader';
import { ExpensesSections } from './ui/ExpensesSections';
import { mockCards, mockCategories, mockExpenses } from '@/shared/mocks';

export const HomeScreenContent = memo(() => {
  const memoizedCards = useMemo(
    () =>
      mockCards.map((card) => (
        <CardItem key={card.number} icon={MastercardIcon} data={card} />
      )),
    []
  );

  const actionButtons = useMemo(
    () => [
      { href: '/travel' as const, icon: TravelIcon, title: 'Travel' },
      { href: '/delivery' as const, icon: DeliveryIcon, title: 'Delivery' },
      { href: '/bonuses' as const, icon: BonusesIcon, title: 'Bonuses' },
      { href: '/support' as const, icon: SupportIcon, title: 'Support' },
    ],
    []
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.actionsContainer}>
          {actionButtons.map((button) => (
            <ActionButton
              key={button.href}
              href={button.href}
              icon={button.icon}
              title={button.title}
            />
          ))}
        </View>

        <View style={styles.cardsContainer}>
          {memoizedCards}
          <AddCardButton style={{ marginLeft: 'auto' }} />
        </View>

        <View style={styles.expansesContainer}>
          <ExpensesHeader categories={mockCategories} />
          <ExpensesSections days={mockExpenses} />
        </View>
      </View>
    </ScrollView>
  );
});

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
