<script setup lang="ts">
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { store } from '../store'

const googleSignIn = () => {
  let provider = new GoogleAuthProvider()

  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      const user = result.user
      console.log(auth.currentUser)
      store.loggedInUser = auth.currentUser?.uid ? auth.currentUser?.uid : ''
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