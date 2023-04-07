<script setup lang="ts">
import { createUser } from "../services/users";
import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth"
import messageService from '../services/messages'

interface User {
  username: string
  memberOf: string[]
  profilePicture: string
  firebaseId: string
}

const googleSignIn = () => {
  let provider = new GoogleAuthProvider()

  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken as string
      messageService.setToken(token)
      const user = result.user
      console.log(auth.currentUser)
      const additional = getAdditionalUserInfo(result)
      if (additional?.isNewUser && user) {
        const newUser: User = {
          username: user.email ? user.email : '',
          memberOf: [],
          profilePicture: '',
          firebaseId: user.uid,
        }
        createUser(newUser)
      }
    })
    .catch(e => {
      console.log(e)
    })
}

</script>

<template>
  <div>
    <button @click="googleSignIn">
      Sign In with Google
    </button>

  </div>
</template>