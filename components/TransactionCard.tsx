import { Badge, Card, Text } from '@rneui/themed';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { computeTransactionBadgeColor } from '../utils';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    titleColumn: {
        flexDirection: 'column',
    },
    amountColumn: {
        flexDirection: 'column',
        marginLeft: 16,
        alignItems: 'center',
    },
    amountColumnItem: {
        marginVertical: 4,
    },
    amount: {
        fontWeight: 'bold',
    },
    description: {
        marginTop: 8,
    },
})

export const TransactionCard = ({ title, description, amount, date, tags }) => {
    const displayDate = useMemo(() => new Date(date).toLocaleDateString(), [date])

    return (
        <Card>
            <View testID='CardInnerContainer' style={styles.row}>
                <View testID='TransactionTitleColumn' style={styles.titleColumn}>
                    <Text h3>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <View testID='TransactionAmountColumn' style={styles.amountColumn}>
                    <Text style={[styles.amountColumnItem, styles.amount]}>${amount}</Text>
                    <Text style={styles.amountColumnItem}>{displayDate}</Text>
                    <View style={styles.amountColumnItem}>
                        <View style={styles.row}>
                            {tags.map((tag, index) => (
                                <Badge value={tag} textStyle={{ fontSize: 12, margin: 4 }} badgeStyle={{ backgroundColor: computeTransactionBadgeColor(tag), height: 24 }} containerStyle={{ paddingLeft: index > 0 ? 4 : undefined }} />
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </Card>
    )
}