
export default {
  state: {
    sessionKey: 'cecSession',
    sessionId: '',
    userInfo: '',
    isLogin: false
  },
  mutations: {
    login (state, data) {
      sessionStorage.setItem(state.sessionKey, JSON.stringify(data))
      state.userInfo = data.userInfo
      state.sessionId = data.sessionId
      state.isLogin = true
    },
    logout (state) {
      sessionStorage.removeItem(state.sessionKey)
      state.userInfo = ''
      state.sessionId = ''
      state.isLogin = false
    }
  },
  getters: {
    sessionInfo: (state, getters) => {
      return JSON.parse(sessionStorage.getItem(state.sessionKey))
    },
    isLogin (state) {
      if (!state.isLogin) {
        const temp = sessionStorage.getItem(state.sessionKey)
        if (temp) {
          state.isLogin = true
          return true
        } else {
          return false
        }
      }
      return true
    }
  }
}
