<template>
  <div>
    <!-- nav bar -->
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
                  <router-link class="nav-link py-0 text-center" to="/">
                    <i class="fas fa-home w-100"></i>
                    Home
                  </router-link>
                </div>
              </li>
              <li class="nav-item">
                <div>
                  <router-link
                    class="nav-link py-0 text-center"
                    to="/admin/products"
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
    <!-- 產品內容 -->
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-7">
          <div class="shadow-self">
            <img :src="product.imageUrl" class="w-100" alt />
          </div>
        </div>
        <div class="col-md-5">
          <span class="badge badge-info p-2">{{product.category}}</span>
          <h1>{{product.title}}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
h2 {
  font-family: palatino;
  font-style: italic;
}
.shadow-self {
  box-shadow: 0.5rem 0.5rem 1rem 1px rgba(0, 0, 0, 0.5);
}
</style>

<script>
export default {
  data() {
    return {
      product: {}
    };
  },
  methods: {
    getSingleProduct() {
      const id = this.$route.params.productId;
      const vm = this;
      const API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/product/${id}`;
      this.$http.get(API).then(response => {
        console.log(response);
        vm.product = response.data.product;
      });
      // console.log(this.$route.params.productId);
    }
  },
  created() {
    this.getSingleProduct();
  }
};
</script>