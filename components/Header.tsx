import { Text } from "@rneui/themed";

export const Header = ({ amountFound }: { amountFound: number }) => {
  return <Text h3>Found {amountFound} transactions</Text>;
};
