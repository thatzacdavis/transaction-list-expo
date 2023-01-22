import { FlashList } from '@shopify/flash-list';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { DateButton } from './components/DateButton';
import { Header } from './components/Header';
import { Label } from './components/Label';
import { TransactionCard } from './components/TransactionCard';

import payload from './payload.json'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('screen').width
  },
  dateColumn: {
    flexDirection: 'column',
  },
  dateRow: {
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  dateColumnRow: {
    flexDirection: 'row',
  }
});

export default function App() {
  const [startDate, setStartDate] = useState(new Date(1641013200 * 1000));
  const [endDate, setEndDate] = useState(new Date(1654056000 * 1000))

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.listContainer}>
        <FlashList
          ListHeaderComponent={() => (
            <View style={styles.container}>
              <Header amountFound={payload.transactions.length} />
              <View testID='DateRow' style={styles.dateRow}>
                <View testID='FromDateColumn' style={styles.dateColumn}>
                  <View testID='FromDateColumnRow' style={styles.dateColumnRow}>
                    <Label text='From:' />
                    <DateButton date={startDate} setDate={setStartDate} />
                  </View>
                </View>
                <View testID='ToDateColumn' style={styles.dateColumn}>
                <View testID='FromDateColumnRow' style={styles.dateColumnRow}>
                    <Label text='To:' />
                    <DateButton date={endDate} setDate={setEndDate} />
                  </View>
                </View>
              </View>
            </View>
          )}
          data={payload.transactions}
          renderItem={({ item }) => (
            <TransactionCard
              title={item.title}
              description={item.description}
              amount={item.amount}
              date={item.date}
              tags={item.tags}
            />
          )}
          estimatedItemSize={15}
        />
      </View>
      
    </SafeAreaView>
  );
}
