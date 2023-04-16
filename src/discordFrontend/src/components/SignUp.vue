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
          username: user.email ? user.email.split('@')[0] : 'defaultName',
          memberOf: ['63f87660663ff1ba522c6f6f', '6404cd0c7ab148abe1a08d62'],
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
  <div class="bg-dc-grey-300 h-screen flex justify-center items-center">
    <div class="grid grid-cols-2 grid-rows-3 bg-dc-grey-700 p-3 rounded-lg">
      <span class="col-span-2 text-white uppercase text-center">Welcome to Disclone</span>
      <span>
      </span>
      <span>
      </span>
      <span>
      </span>
      <button class="text-sm uppercase bg-dc-blue-100 p-4 rounded-md text-white" @click="googleSignIn">
        Sign In with Google
      </button>
    </div>
  </div>
</template>