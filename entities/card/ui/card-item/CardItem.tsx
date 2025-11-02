import { Card } from '@/entities/card';
import { formatUSD } from '@/entities/currency';
import { Colors } from '@/shared/constants';
import { Text } from '@/shared/ui';
import { ElementType, memo } from 'react';
import { Image } from 'expo-image';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
} from 'react-native';

const DebitCardCover = require('@/shared/assets/images/debit-card-cover.png');
const VirtualCardCover = require('@/shared/assets/images/virtual-card-cover.png');

interface CardItemProps {
  icon: ElementType;
  data: Card;
}

export const CardItem = memo<CardItemProps>((props) => {
  const { icon: Icon, data } = props;

  const CardCover = data.type === 'debit' ? DebitCardCover : VirtualCardCover;

  const title = data.type === 'debit' ? 'Debit' : 'Virtual';

  const safeCardNumber = `•• ${data.number.slice(data.number.length - 4)}`;

  return (
    <Pressable style={styles.container}>
      <Image
        source={CardCover}
        style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
      />

      <Icon style={styles.icon} />

      <View style={styles.dataContainer}>
        <View>
          <Text style={[styles.moneyText, { color: Colors.dark.foreground }]}>
            {formatUSD(data.balance)}
          </Text>
        </View>

        <View style={styles.cardInfo}>
          <Text
            style={[styles.cardInfoText, { color: Colors.dark.foreground }]}
          >
            {title}
          </Text>

          <Text
            style={[styles.cardInfoText, { color: Colors.dark.foreground }]}
          >
            {safeCardNumber}
          </Text>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 142,
    height: 98,
    padding: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    left: 12,
    top: 12,
  },
  dataContainer: {
    marginTop: 'auto',
    flexDirection: 'column',
    gap: 6,
  },
  moneyText: {
    fontSize: 18,
    fontWeight: 'semibold',
    textShadowColor: 'rgba(0, 0, 0, 0.12)',
    textShadowRadius: 2,
    textShadowOffset: { width: 0, height: 1 },
  } satisfies StyleProp<TextStyle>,
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfoText: {
    fontSize: 14,
    fontWeight: 'regular',
  } satisfies StyleProp<TextStyle>,
});
