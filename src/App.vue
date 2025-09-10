<script setup>
import { ref } from 'vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Form from './components/Form.vue'
import UserHome from './components/UserHome.vue'
import AdminHome from './components/AdminHome.vue'



// currentpage：'home' | 'login' | 'register' | 'userHome' | 'adminHome'
const currentPage = ref('home')
// login type：'user' | 'admin'
const loginType = ref(null)
// current user
const currentUser = ref(null) 




// 
const goTo = (page, type = null) => {
  currentPage.value = page
  if (page === 'login') loginType.value = type
}


// login successfully
const loginSuccess = (payload) => {
  // payload = { username: 'xxx', type: 'user' | 'admin' }
  loginType.value = payload.type
  currentUser.value = payload.username
  currentPage.value = payload.type === 'admin' ? 'adminHome' : 'userHome'
}
</script>

<template>
  <main class="container mt-5">
    <!-- home -->
    <Home
      v-if="currentPage === 'home'"
      @go-login="goTo('login', $event)"
      @go-register="goTo('register')"
    />

    <!-- login -->
    <Login
      v-else-if="currentPage === 'login'"
      :loginType="loginType"
      @go-home="goTo('home')"
      @go-register="goTo('register')"
      @login-success="loginSuccess"
    />

    <!-- register -->
    <Form
      v-else-if="currentPage === 'register'"
      @go-home="goTo('home')"
      @go-login="goTo('login')"
    />



    <!-- userhome -->
<UserHome 
 v-else-if="currentPage === 'userHome'" 
  :current-user="currentUser"
 @logout="goTo('home')"
 @go-home="goTo('home')"
/>

<!-- admin -->
<AdminHome 
  v-else-if="currentPage === 'adminHome'" 
  @logout="goTo('home')"
/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
