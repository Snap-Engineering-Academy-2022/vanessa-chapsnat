// The import section imports all the functions, elements from react-native, react, and firebase/auth that we are using in this file
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import db from "../firebase";

export default function LoginScreen({ navigation }) {
  // Email saves the email address input by the user. setEmail changes the email.
  // We use the useState() hook because we know we want the email variable to change
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const auth = getAuth();

  // what is async?
  // async function handleSubmit() {
  //   console.log("handle submit envoked!!");

  //   await createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       auth.currentUser = user;
  //       console.log("this is user (signup screen): ", user);

  //       setDoc(doc(db, "Users", user1.uid)),
  //         {
  //           avatar:
  //             "https://cdn.vox-cdn.com/thumbor/vRX6hpRWQzsCxYjfPe7NyhvL5NY=/0x28:600x428/1820x1213/filters:focal(0x28:600x428):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/46810120/picard-engage.0.0.jpg",
  //           bio: "Write something about yourself here.",
  //           displayName: "Your display name",
  //           username: "Default username",
  //         };
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode, "<---- error code");
  //       console.log(errorMessage, "<--- error message");
  //     });
  // }

  async function handleSubmit() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        auth.currentUser = user;
        console.log("making a new user on firestroe");
        setDoc(doc(db, "Users", user.uid), {
          avatar:
            "https://www.pennington.com/-/media/Project/OneWeb/Pennington/Images/blog/fertilizer/Succulent-Savvy-Gardening--Creating-A-Unique-Look-Indoors-or-Out/succulent_garden_header_01.jpg?h=480&iar=0&w=1140&hash=C389094AB8A8F7D1C997DAA97BB5CCFA",
          bio: "Write something about yourself here.",
          displayName: "Default display name",
          username: "Default username",
        });
      })
      .catch((error) => {
        console.log("Error when signing up new user:".error);
      });
  }

  return (
    <>
      <Text style={styles.bigBlue}>Signup Here</Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)} // every time we write a character, it will call setEmail and reload the component
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          handleSubmit();
        }}
      >
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.redirectBtn}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text>Already have an account? Login here</Text>
      </TouchableOpacity>
    </>
  );
}

// These are the styles for the component
const styles = StyleSheet.create({
  redirectBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "grey",
    color: "white",
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
    padding: 50,
  },
});
