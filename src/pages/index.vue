<script setup lang="ts">
import firebase from 'firebase'
import { useAuth } from '@vueuse/firebase'
import { useClipboard } from '@vueuse/core'

const { isAuthenticated, user } = useAuth(firebase.auth)

const { copy, text } = useClipboard()

const login = async() => {
  const provider = new firebase.auth.TwitterAuthProvider()
  await firebase.auth().signInWithPopup(provider)
}

const logout = async() => {
  await firebase.auth().signOut()
}
</script>

<template>
  <div>
    <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>

    <div v-if="isAuthenticated">
      <div>
        <button
          class="m-3 text-sm btn"
          @click="logout"
        >
          Logout
        </button>
      </div>
      <div class="avatar">
      </div>
      <div class="shadow stats grid grid-flow-row">
        <div class="stat w-full">
          <div class="stat-figure text-primary">
            <img class="rounded-full ring" :src="user?.photoURL ?? ''">
          </div>
          <div class="stat-title">
            displayName
          </div>
          <div class="stat-value text-primary">
            {{ user?.displayName }}
          </div>
        </div>
        <div class="stat w-full">
          <button class="stat-figure btn btn-circle btn-outline" @click="copy(user?.toJSON().stsTokenManager.apiKey)">
            <akar-icons:check v-if="text === user?.toJSON().stsTokenManager.apiKey" />
            <akar-icons:clipboard v-else />
          </button>
          <div class="stat-title">
            apiKey
          </div>
          <div class="stat-value">
            {{ user?.toJSON().stsTokenManager.apiKey }}
          </div>
        </div>
        <div class="stat w-full">
          <button class="stat-figure btn btn-circle btn-outline" @click="copy(user?.toJSON().stsTokenManager.accessToken)">
            <akar-icons:check v-if="text === user?.toJSON().stsTokenManager.accessToken" />
            <akar-icons:clipboard v-else />
          </button>
          <div class="stat-title">
            accessToken
          </div>
          <div class="stat-value truncate">
            {{ user?.toJSON().stsTokenManager.accessToken }}
          </div>
        </div>
        <div class="stat w-full">
          <button class="stat-figure btn btn-circle btn-outline" @click="copy(user?.toJSON().stsTokenManager.refreshToken)">
            <akar-icons:check v-if="text === user?.toJSON().stsTokenManager.refreshToken" />
            <akar-icons:clipboard v-else />
          </button>
          <div class="stat-title">
            refreshToken
          </div>
          <div class="stat-value truncate">
            {{ user?.toJSON().stsTokenManager.refreshToken }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <button
        class="m-3 text-sm btn"
        @click="login"
      >
        Login with Twitter
      </button>
    </div>
  </div>
</template>
