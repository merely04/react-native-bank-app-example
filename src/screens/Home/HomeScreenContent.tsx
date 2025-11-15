import BonusesIcon from '@/assets/icons/bonuses.svg';
import DeliveryIcon from '@/assets/icons/delivery.svg';
import SupportIcon from '@/assets/icons/support.svg';
import TravelIcon from '@/assets/icons/travel.svg';
import MastercardIcon from '@/assets/images/mastercard.svg';
import { Colors } from '@/constants';
import { useColorScheme } from '@/hooks/useColorScheme';
import { mockCards, mockCategories, mockExpenses } from '@/mocks';
import { ActionButton } from '@/screens/Home/ActionButton';
import { memo, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AddCardButton } from './AddCardButton';
import { CardItem } from './CardItem';
import { ExpensesHeader } from './ExpensesHeader';
import { ExpensesSections } from './ExpensesSections';

export const HomeScreenContent = memo(() => {
  const colorScheme = useColorScheme();

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: Colors[colorScheme ?? 'light'].background,
      }}
    >
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
