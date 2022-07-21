// useAuthentication is a custom hook, (useState() is a builtin React hook, but they work in a similar way). We're using it to act like a "global state variable" for user data. We can import it in any component to get access to our custom user data, instead of having to make repetitive fetches to Firestore for every component that needs the user data.

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase";

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(user);

          const docRef = doc(db, "Users", user.uid);
          const docSnap = getDoc(docRef).then((mySnapshot) => {
            console.log("this is the user data: ", mySnapshot.data());
            setUserData(mySnapshot.data());
          });
        } else {
          // User is signed out
          setUser(undefined);
        }
      }
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user,
    userData,
  };
}
