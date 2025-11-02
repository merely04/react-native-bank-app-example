import { Card } from './model';

export const formatCard = (card: Card) => {
  const title = card.type === 'debit' ? 'Debit' : 'Virtual';

  const safeCardNumber = `•• ${card.number.slice(card.number.length - 4)}`;

  return `${title} ${safeCardNumber}`;
};
