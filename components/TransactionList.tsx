import { FlashList } from "@shopify/flash-list";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { DateButton } from "./DateButton";
import { Header } from "./Header";
import { Label } from "./Label";
import { TransactionCard } from "./TransactionCard";
import { Divider } from "@rneui/themed";

import { useInfiniteQuery } from "react-query";

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 8,
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  dateColumn: {
    flexDirection: "column",
  },
  dateRow: {
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
  dateColumnRow: {
    flexDirection: "row",
  },
});

export const TransactionList = () => {
  const [startDate, setStartDate] = useState(new Date(1641013200 * 1000)); // January 1, 2022
  const [endDate, setEndDate] = useState(new Date(1654056000 * 1000)); // June 1, 2022
  const [shouldCallOnScrollEnd, setShouldCallOnScrollEnd] = useState(false);

  const fetchTransactions = async (pageParam) => {
    const response = await fetch(
      `https://assignment.alza.app/transactions?dateGTE=${
        startDate.getTime() / 1000
      }&dateLTE=${endDate.getTime() / 1000}${
        pageParam ? `&startingAfter=${pageParam}` : ""
      }`
    );
    return response.json();
  };

  const { data, fetchNextPage, isLoading, refetch } = useInfiniteQuery(
    "transactions",
    async ({ pageParam }) => fetchTransactions(pageParam),
    {
      getNextPageParam: (lastPage) => {
        // The last page might not have any results or might indicate that there will be no more results.
        if (!lastPage || !lastPage.hasMore || !lastPage.transactions.length)
          return undefined;

        return lastPage.transactions[lastPage.transactions.length - 1].id;
      },
    }
  );

  const transactions = useMemo(() => {
    return data?.pages.reduce((acc, page) => acc.concat(page.transactions), []);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [startDate, endDate]);

  return (
    <View style={styles.listContainer}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.headerContainer}>
            <Header amountFound={transactions?.length ?? 0} />
            <View testID="DateRow" style={styles.dateRow}>
              <View testID="FromDateColumn" style={styles.dateColumn}>
                <View testID="FromDateColumnRow" style={styles.dateColumnRow}>
                  <Label text="From:" />
                  <DateButton date={startDate} setDate={setStartDate} />
                </View>
              </View>
              <View testID="ToDateColumn" style={styles.dateColumn}>
                <View testID="FromDateColumnRow" style={styles.dateColumnRow}>
                  <Label text="To:" />
                  <DateButton date={endDate} setDate={setEndDate} />
                </View>
              </View>
            </View>
          </View>
          <Divider />
          <FlashList
            data={transactions}
            renderItem={({ item }) => (
              <TransactionCard
                id={item.id}
                title={item.title}
                description={item.description}
                amount={item.amount}
                date={item.date}
                tags={item.tags}
              />
            )}
            keyExtractor={(item) => `TransactionCard-${item.id}`}
            estimatedItemSize={10}
            onEndReached={() => setShouldCallOnScrollEnd(true)}
            onMomentumScrollEnd={() => {
              if (shouldCallOnScrollEnd) {
                setShouldCallOnScrollEnd(false);
                fetchNextPage();
              }
            }}
          />
        </>
      )}
    </View>
  );
};
