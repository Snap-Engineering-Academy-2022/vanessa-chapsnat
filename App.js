import React from "react";
import { StyleSheet } from "react-native";
import "./firebase";
import RootNavigation from "./navigation/Index";

function App() {
  return <RootNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;
