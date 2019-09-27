
<!--AdminNav-->
<template>
  <div>
    <nav class="navbar navbar-dark flex-md-nowrap p-0 shadow">
      <router-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
        <span class="h3 font-weight-bold">Watches</span> Admin
      </router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link font-weight-bold" href="#" @click.prevent="signOut">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style lang="scss" scoped>
.navbar {
  background-image: linear-gradient(
    to right,
    #2b2b2b,
    rgb(245, 245, 242),
    #2b2b2b
  );
  font-family: palatino;
  font-style: italic;
}
</style>

<script>
export default {
  methods: {
    signOut() {
      const vm = this;
      const API = `${process.env.APIPATH}/logout`;
      this.$http.post(API, vm.user).then(response => {
        // console.log(response);
        vm.$router.push("/login");
      });
    }
  }
};
</script>
