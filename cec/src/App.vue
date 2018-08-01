<template>
<div>
<el-menu
  :default-active="$route.path"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="/hello">hello</el-menu-item>
  <el-menu-item index="/profile">profile</el-menu-item>
  <el-menu-item index="/serviceArea">serviceArea</el-menu-item>
  <el-menu-item index="/login">login</el-menu-item>
  <el-menu-item v-show="isLogin" index="/logout">logout</el-menu-item>
</el-menu>
 <router-view></router-view>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '/logout') {
        this.logout()
        this.$router.push({path: '/login'})
      } else {
        this.$router.push({ path: key })
      }
      console.log(key, keyPath)
    },
    ...mapMutations({
      logout: 'logout'
    })
  }
}
</script>
<style scoped>
.el-menu-demo {
  background-color: rgba(34, 8, 29, 0.47);
}
</style>
