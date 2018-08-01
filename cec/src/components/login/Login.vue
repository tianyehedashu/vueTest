<template>
  <div class="eaLogin">
    <div class="eaLogin-inner">
      <div class="eaLogin-ericssonLogo"></div>
      <div class="eaLogin-body eaLogin-licence" v-show="isShowLicence">
        <p class="eaLogin-licenceHeader">{{licenceHeader}}</p>
        <p class="eaLogin-licenceContent">{{licenceContent}}</p>
        <button type="button" v-on:click="showLogin" class="ebBtn eaLogin-licenceButton">{{licenceButton}}</button>
      </div>
      <div class="eaLogin-body eaLogin-login" v-show="isShowLogin">
        <div class="eaLogin-title">{{title}}</div>
        <form action="#" name="loginForm" class="eaLogin-form" method="POST" @submit.prevent="submitLogin">
          <div class="eaLogin-inputWrap">
            <input type="text" v-bind:class="userClass" v-model="username" autofocus="autofocus" placeholder="username"
                   class="ebInput eb_wMargin eaLogin-loginUsername">
            <div class="eaLogin-inputComposition">
              <input type="password" v-bind:class="passwordClass" v-model="password" placeholder="password"
                     class="ebInput eb_wMargin eaLogin-loginPassword">
              <button type="submit" class="ebBtn eb_wMargin eaLogin-formButton">
                <i class="ebIcon ebIcon_rightArrow"></i>
              </button>
            </div>
            <div class="eaLogin-messagesBox" v-html='message'>{{message}}</div>

            <div class="eaLogin-passRemind"></div>
          </div>
        </form>
      </div>
      <p class="eaLogin-copy">{{copyright}}</p>
    </div>
  </div>

</template>
<script>
import sha256 from 'crypto-js/sha256'
import {mapState, mapMutations, mapGetters} from 'vuex'

export default {
  name: 'login',
  props: ['redirect'],
  data () {
    return {
      title: 'Ericsson CEC',
      username: '',
      password: '',
      copyright: '© Ericsson Enterprise AB, 2018. All rights reserved.',
      licenceHeader: 'IMPORTANT LEGAL NOTICE',
      licenceContent: 'If you are not an authorized cec user, please leave.',
      licenceButton: 'OK',
      missingUsername: 'Please enter a username.',
      missingPassword: 'Please enter a password.;',
      missingUsernamePassword: 'Please enter a username and password.',
      invalidUsernamePassword: 'Invalid username/password. Please try again.',
      isShowLicence: true,
      isShowLogin: false,
      userClass: {
        error: false
      },
      passwordClass: {
        error: false
      },
      message: ''
    }
  },

  computed: {
    ...mapState({
      sessionKey: 'sessionKey'
    }),
    ...mapGetters({
      isLogin: 'isLogin'
    })
  },

  methods: {
    ...mapMutations({
      login: 'login',
      logout: 'logout'
    }),
    showLogin: function () {
      this.isShowLicence = false
      this.isShowLogin = true
    },

    submitLogin () {
      let username = this.username.trim()
      const password = this.password.trim()
      const sessionKey = this.sessionKey
      console.log(sessionKey)
      this.userClass.error = false
      this.passwordClass.error = false
      this.message = ''
      if (username === '' && password === '') {
        this.userClass.error = true
        this.passwordClass.error = true
        this.message = 'missingUsernamePassword'
      } else if (username === '') {
        this.userClass.error = true
        this.message = 'missingUsername'
      } else if (password === '') {
        this.passwordClass.error = true
        this.message = 'missingPassword'
      } else {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', '/api/1.2/login', true)

        var encryptedPassword = sha256(password)
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
        xhr.setRequestHeader('username', username)
        xhr.setRequestHeader('password', encryptedPassword)
        var vm = this
        xhr.onload = function (data) {
          if (xhr.status < 400) {
            var response = JSON.parse(xhr.response)
            console.log('success')
            vm.login({
              sessionId: response.SuccessResponse.SessionId,
              userInfo: response.SuccessResponse
            })
            if (vm.redirect && vm.redirect !== '/') {
              vm.$router.push({path: vm.redirect})
            } else {
              vm.$router.push({path: vm.$store.state.homePath})
            }
          } else {
            vm.username = ''
            vm.password = ''
            vm.passwordClass.error = true
            vm.message = xhr.response
            console.log('failed')
          }
        }

        xhr.onerror = function () {
          console.log('error occur')
        }

        xhr.send()
      }
    }
  }
}
</script>
<style src="./login.css" scoped></style>
