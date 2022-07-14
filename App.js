import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Picard from "./assets/picard.webp";
import Kirk from "./assets/kirk.webp";
import db from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getChat() {
      console.log("starting get!");
      const chatsCol = collection(db, "Chats");
      const chatsDoc = await getDocs(chatsCol);
      const chatData = chatsDoc.docs.map((doc) => doc.data());
      console.log("here chatData", chatData);
      setMessages(chatData[0].messages);
    }

    getChat();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <GiftedChat
        showUserAvatar={true}
        renderUsernameOnMessage={true}
        alwaysShowSend={true}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: "1",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
});
