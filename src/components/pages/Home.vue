
<template>
  <div>
    <alert />
    <!-- navbar -->
    <section class="container">
      <div class="row">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary w-100">
          <h2 class="text-secondary font-weight-bold">
            <i class="far fa-clock mr-3"></i>Watches
          </h2>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul class="navbar-nav mr-auto mt-0 mt-lg-0 w-100">
              <li class="nav-item active ml-lg-auto">
                <div>
                  <router-link class="nav-link py-0 text-center" to="/Home">
                    <i class="fas fa-home w-100"></i>
                    Home
                  </router-link>
                </div>
              </li>
              <li class="nav-item">
                <div>
                  <router-link
                    class="nav-link py-0 text-center"
                    to="/admin"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    <i class="fas fa-clipboard-list w-100"></i>
                    Admin
                  </router-link>
                </div>
              </li>
              <li class="nav-item">
                <router-link to="/login" class="nav-link py-0 text-center">
                  <i class="fas fa-user-alt w-100"></i>
                  Login
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    <router-view></router-view>    
  </div>
</template>

<style lang="scss">
.banner {
  position: relative;
  z-index: 1;
}
.swiper {
  height: 500px;
}
h2 {
  font-family: palatino;
  font-style: italic;
}
</style>

<script>
import swiper from "../Swiper";
import sidebar from "../Sidebar";
import guestproduct from "../guestProduct";
import pagination from "../Pagination";
import alert from "../AlertMessage";
import carticon from "../cartIcon";
import bottom from "../Footer";
export default {
  components: {
    swiper,
    sidebar,
    guestproduct,
    pagination,
    alert,
    carticon,
    bottom
  }  
};
</script>
