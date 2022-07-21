import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../firebase";
import firebase from "firebase/app";
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuthentication } from "../utils/hooks/useAuthentication";

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const { user, userData } = useAuthentication();

  console.log("this is user: ", user);
  console.log("this is userData: ", userData);
  // console.log("user providerData", user.providerData[0].displayName);
  // console.log(userData.displayName);

  useEffect(() => {
    let unsubscribeFromNewSnapshots = onSnapshot(
      doc(db, "Chats", "myfirstchat"),
      (snapshot) => {
        console.log("New Snapshot! ", snapshot.data().messages);
        setMessages(snapshot.data().messages);
      }
    );

    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  const onSend = useCallback(async (messages = []) => {
    await updateDoc(doc(db, "Chats", "myfirstchat"), {
      messages: arrayUnion(messages[0]),
    });
    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, messages)
    // );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        // current "blue bubble" user
        _id: user ? user.uid : "2",
        name: userData ? userData.displayName : "Anonymous",
        avatar: userData
          ? userData.avatar
          : "https://cdn.vox-cdn.com/thumbor/vRX6hpRWQzsCxYjfPe7NyhvL5NY=/0x28:600x428/1820x1213/filters:focal(0x28:600x428):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/46810120/picard-engage.0.0.jpg",
      }}
      inverted={false}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}
