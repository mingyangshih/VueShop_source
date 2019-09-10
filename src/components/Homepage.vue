<template>
  <div>
    <!-- Swiper component -->
    <div class="container px-0 banner">
      <swiper />
    </div>
    <div class="container px-md-0 mt-3 mb-3">
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
          <pagination
            :pagination="pagination"
            @pageTrigger="getProducts"
            class="mt-3"
            v-if="watchType == 'all'"
          />
        </div>
      </div>
    </div>
    <bottom />
    <carticon
      :cartNum="cartNum"
      :cartData="cartData"
      :finalTotal="finalTotal"
      @showCart="showCart"
      @removeCartItem="removeCartItem"
    />
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
</style>

<script>
import swiper from "./Swiper";
import sidebar from "./Sidebar";
import guestproduct from "./guestProduct";
import pagination from "./Pagination";
import alert from "./AlertMessage";
import carticon from "./cartIcon";
import bottom from "./Footer";
export default {
  data() {
    return {
      status: {
        // 載入畫面特效參數
        isLoading: false
      },
      watchType: "all",
      // 存放取得的各份商品
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
  components: {
    swiper,
    sidebar,
    guestproduct,
    pagination,
    alert,
    carticon,
    bottom
  },
  methods: {
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