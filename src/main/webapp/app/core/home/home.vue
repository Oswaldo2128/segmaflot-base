<template>
  <div class="container">
    <div class="card text-center">
      <div class="card-header">
        <h1 class="display-4" v-text="$t('home.title')">Welcome to SEGMAFLOT</h1>
      </div>

      <div class="card-body">
        <div class="alert alert-success" v-if="authenticated">
          <span v-if="username" v-text="$t('home.logged.message', { username: username })">You are logged in as user "{{ username }}"</span>
        </div>

        <div class="alert alert-primary" v-if="!authenticated">
          <a class="alert-link" v-on:click="openLogin()" v-text="$t('global.messages.info.authenticated.link')"> Sign in </a>
        </div>

        <div class="alert alert-primary" v-if="!authenticated">
          <router-link class="alert-link" to="/register" v-text="$t('global.messages.info.register.link')">
            Register a new account
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
