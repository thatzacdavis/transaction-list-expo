import { StyleSheet } from "react-native";
import { Text } from "@rneui/themed";

const styles = StyleSheet.create({
  label: {
    marginTop: 8,
    color: "grey",
    fontWeight: "500",
  },
});

export const Label = ({ text }) => {
  return <Text style={styles.label}>{text}</Text>;
};
