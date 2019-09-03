<template>
  <div>
    <alert />
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
    <!-- Swiper component -->
    <div class="container px-0 banner">
      <swiper />
    </div>
    <!-- side bar -->
    <div class="container px-0 mt-3">
      <div class="row">
        <div class="col-md-2">
          <sidebar class="sticky-top" @watchType="changeWatchType" />
        </div>
        <div class="col-md-10">
          <!-- vue loading overlay 效果放在最頂部-->
          <div class="vld-parent">
            <loading :active.sync="status.isLoading" loader="dots"></loading>
          </div>
          <!-- 產品列表(客戶端) -->
          <guestproduct :productArray="productArray" @renewCart="renewCart" />
          <!-- 產品列表頁碼 -->
          <pagination :pagination="pagination" @pageTrigger="getProducts" class="mt-3" />
        </div>
      </div>
    </div>
    <!-- 購物車icon -->
    <carticon
      :cartNum="cartNum"
      :cartData="cartData"
      :finalTotal="finalTotal"
      @showCart="showCart"
    />
  </div>
</template>

<style lang="scss">
// 點擊購物車特效
body.show {
  height: 100vh;
  overflow: hidden;
  width: 100%;
  .grayOverlay {
    display: block;
  }
}
// 點擊購物車特效
body {
  .grayOverlay {
    display: none;
  }
}
.grayOverlay {
  background: hsla(0, 0%, 100%, 0.65);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10000;
}

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
.cart-dropdown {
  position: fixed;
  bottom: 45px;
  cursor: pointer;
  right: 30px;
  z-index: 10001;
  .badge {
    position: absolute;
    right: 2px;
    top: 2px;
  }
  &.show {
    .cart-content {
      display: block;
    }
  }
  .cart-content {
    min-width: 330px;
    background: white;
    position: absolute;
    bottom: 75px;
    right: 10px;
    display: none;
    z-index: 10001;
    &:before {
      content: "";
      border-style: solid;
      border-color: white transparent transparent;
      border-width: 14px 13px 0;
      bottom: -14px;
      right: 23px;
      z-index: 10001;
      position: absolute;
    }
  }
  .cart-menu-scroll {
    border-bottom: 1px solid #dee2e6;
    max-height: 30vh;
    overflow-y: auto;
    overflow-x: auto;
  }
}
</style>

<script>
import swiper from "../Swiper";
import sidebar from "../Sidebar";
import guestproduct from "../guestProduct";
import pagination from "../Pagination";
import alert from "../AlertMessage";
import carticon from "../cartIcon";
export default {
  components: {
    swiper,
    sidebar,
    guestproduct,
    pagination,
    alert,
    carticon
  },
  data() {
    return {
      status: {
        // 載入畫面特效參數
        isLoading: false
      },
      // 存放取得的各分商品
      productArray: [],
      // 分頁物件參數
      pagination: {},
      // 存放取得的所有產品
      tempProductArray: [],
      // 購物車資訊
      cartNum: 0,
      cartData: [],
      finalTotal: 0
    };
  },
  methods: {
    // 取得個分頁商品(無分類)
    getProducts(page = 1) {
      const vm = this;
      const API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/products?page=${page}`;
      this.status.isLoading = true;
      this.$http.get(API).then(response => {
        // console.log(response);
        if (response.data.success) {
          vm.status.isLoading = false;
          vm.productArray = response.data.products;
          vm.pagination = response.data.pagination;
        } else {
        }
      });
    },
    // 左邊選單切換(by switch)
    changeWatchType(type) {
      const vm = this;
      vm.watchType = type;
      const API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/products/all`;
      this.$http.get(API).then(response => {
        // console.log(response);
        if (response.data.success) {
          vm.tempProductArray = response.data.products;
          switch (type) {
            case "all":
              vm.getProducts();
            case "mechanic":
              vm.productArray = vm.tempProductArray.filter((item, index) => {
                return item.category == "機械錶";
              });
              return;
            case "smart":
              vm.productArray = vm.tempProductArray.filter((item, index) => {
                return item.category == "Smart Watch";
              });
              return;
            case "digital":
              vm.productArray = vm.tempProductArray.filter((item, index) => {
                return item.category == "Digital Watch";
              });
              return;
          }
        }
      });
    },
    // 取得購物車資料
    getCart() {
      const vm = this;
      const API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/cart`;
      this.$http.get(API).then(response => {
        vm.cartNum = response.data.data.carts.length;
        vm.cartData = response.data.data.carts;
        vm.finalTotal = response.data.data.final_total;
      });
    },
    removeCartItem(id) {
      const vm = this;
      const API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/cart/${id}`;
      this.$http.delete(API).then(response => {
        if (response.data.success) {
          this.getCart();
        }
      });
    },
    // 產品卡片按下add to cart後重新取得購物車資料
    renewCart() {
      this.getCart();
    },
    // 購物車icon特效
    showCart() {
      $("body").toggleClass("show");
      $("div.cart-dropdown").toggleClass("show");
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>
