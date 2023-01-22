import { StatusBar } from "expo-status-bar";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { TransactionList } from "./components/TransactionList";

const queryClient = new QueryClient();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get("screen").width,
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

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <TransactionList />
      </QueryClientProvider>
    </SafeAreaView>
  );
}
