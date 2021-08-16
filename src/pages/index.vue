<script setup lang="ts">
import firebase from 'firebase'
import { useAuth } from '@vueuse/firebase'
import { set, useClipboard, useSessionStorage } from '@vueuse/core'

const { isAuthenticated, user } = useAuth(firebase.auth)

const { copy, text } = useClipboard()

const accessToken = useSessionStorage('accessToken', '')
const secret = useSessionStorage('secret', '')

const login = async() => {
  const provider = new firebase.auth.TwitterAuthProvider()
  const { credential } = await firebase.auth().signInWithPopup(provider)

  set(accessToken, (credential as any).accessToken)
  set(secret, (credential as any).secret)
}

const logout = async() => {
  await firebase.auth().signOut()
}

const toBlank = (v: null | undefined | string) => v ?? ''
const toAny = (v: any) => v

const fn = async() => {
}
</script>

<template>
  <div>
    <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>

    <div v-if="isAuthenticated && user">
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
            <img class="rounded-full ring" :src="toBlank(user.photoURL)">
          </div>
          <div class="stat-title">
            displayName
          </div>
          <div class="stat-value text-primary">
            {{ user.displayName }}
          </div>
        </div>
        <div class="stat w-full">
          <button class="stat-figure btn btn-circle btn-outline" @click="copy(toAny(user?.toJSON()).stsTokenManager.apiKey)">
            <akar-icons:check v-if="text === toAny(user.toJSON()).stsTokenManager.apiKey" />
            <akar-icons:clipboard v-else />
          </button>
          <div class="stat-title">
            apiKey
          </div>
          <div class="stat-value">
            {{ toAny(user.toJSON()).stsTokenManager.apiKey }}
          </div>
        </div>
        <div class="stat w-full">
          <button class="stat-figure btn btn-circle btn-outline" @click="copy(toAny(user?.toJSON()).stsTokenManager.accessToken)">
            <akar-icons:check v-if="text === toAny(user.toJSON()).stsTokenManager.accessToken" />
            <akar-icons:clipboard v-else />
          </button>
          <div class="stat-title">
            accessToken
          </div>
          <div class="stat-value truncate">
            {{ toAny(user.toJSON()).stsTokenManager.accessToken }}
          </div>
        </div>
        <div class="stat w-full">
          <button class="stat-figure btn btn-circle btn-outline" @click="copy(toBlank(user?.refreshToken))">
            <akar-icons:check v-if="text === user.refreshToken" />
            <akar-icons:clipboard v-else />
          </button>
          <div class="stat-title">
            refreshToken
          </div>
          <div class="stat-value truncate">
            {{ user.refreshToken }}
          </div>
        </div>
        <div v-if="accessToken !== ''" class="stat w-full">
          <button class="stat-figure btn btn-circle btn-outline" @click="copy(accessToken)">
            <akar-icons:check v-if="text === accessToken" />
            <akar-icons:clipboard v-else />
          </button>
          <div class="stat-title">
            accessToken
          </div>
          <div class="stat-value truncate">
            {{ accessToken }}
          </div>
        </div>
        <div v-if="secret !== ''" class="stat w-full">
          <button class="stat-figure btn btn-circle btn-outline" @click="copy(secret)">
            <akar-icons:check v-if="text === secret" />
            <akar-icons:clipboard v-else />
          </button>
          <div class="stat-title">
            secret
          </div>
          <div class="stat-value truncate">
            {{ secret }}
          </div>
        </div>
      </div>
      <button
        class="m-3 text-sm btn"
        @click="fn"
      >
        Exec
      </button>
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
