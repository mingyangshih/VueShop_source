<template>
  <div>
    <form class="form-signin" @submit.prevent="login">
      <router-link class="text-primary font-weight-bold text-center mt-4 h2 w-100 d-block" to="/">
        <i class="far fa-clock mr-3"></i>Watches
      </router-link>
      <div class="shadow loginInput">
        <label for="inputEmail" class="w-100">會員登入</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          v-model="user.username"
          required
          autofocus
        />
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          v-model="user.password"
          required
        />
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p class="mt-3 mb-3 text-muted text-right">&copy; 2019 by mingyang</p>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}
body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}
.h2 {
  font-family: palatino;
  font-style: italic;
  &:hover {
    text-decoration: none;
  }
}
.loginInput {
  background: #fff;
  border-radius: 10px;
  margin-bottom: 60px;
  padding: 35px 15px;
}
label[for="inputEmail"] {
  font-family: "Noto Sans TC", sans-serif;
  text-align: center;
  font-size: 1.2rem;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

<script>
import navbar from "../Navbar";
export default {
  components: {
    navbar
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      const vm = this;
      const API = `${process.env.APIPATH}/admin/signin`;
      this.$http.post(API, vm.user).then(response => {
        vm.$router.push("/admin/products");
      });
    }
  }
};
</script>