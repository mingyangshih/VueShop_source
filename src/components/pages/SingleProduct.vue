<template>
  <div>
    <!-- vue loading overlay 效果放在最頂部-->
    <div class="vld-parent">
      <loading :active.sync="status.isLoading" loader="dots"></loading>
    </div>
    <!-- 產品內容 -->
    <div class="container mt-3 detail">
      <div class="row">
        <div class="col-md-7">
          <div class="shadow-self">
            <img :src="product.imageUrl" class="w-100" alt />
          </div>
        </div>
        <div class="col-md-5">
          <span class="badge badge-info p-2 mt-2 mt-md-0">{{product.category}}</span>
          <h2 class="mt-2 text-cardTitle font-weight-bold">{{product.title}}</h2>
          <hr />
          <u class="h4 mt-3 d-block">Product Description</u>
          <p class>{{product.description}}</p>
          <hr />
          <p class="d-flex justify-content-end align-items-end mb-0">
            <span v-if="!product.price" class="text-sideBar">{{product.origin_price | currency}}</span>
            <del v-if="product.price" class="h3">{{product.origin_price | currency}}</del>
            <span class="h1 ml-3">{{product.price | currency}}</span>
          </p>
          <form>
            <div class="from-group">
              <label for="num" class="h5 text-right w-100">數量</label>
              <select name="num" id="num" class="form-control form-control-sm" v-model="qty">
                <option :value="item" v-for="item in 10" :key="item">{{item}}</option>
              </select>
            </div>
            <div class="d-flex justify-content-end mt-4">
              <button
                type="button"
                class="btn btn-primary mb-2"
                @click.prevent="addToCart"
              >Add to cart</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <bottom class="fixed-bottom" />
    <carticon
      :cartNum="cartNum"
      :cartData="cartData"
      :finalTotal="finalTotal"
      @showCart="showCart"
      @removeCartItem="removeCartItem"
    />
  </div>
</template>

<style lang="scss" scoped>
%italicFont {
  font-family: "Roboto", "Noto Sans TC";
  font-style: italic;
}

.h4 {
  // @extend %italicFont;
  color: rgb(22, 34, 138);
}
p {
  // @extend %italicFont;
  font-size: 1.2rem;
}
del {
  color: rgba(128, 128, 128, 0.5);
}
// 圖片陰影
.shadow-self {
  box-shadow: 0.5rem 0.5rem 1rem 1px rgba(0, 0, 0, 0.5);
}
</style>

<script>
import carticon from "../cartIcon";
import bottom from "../Footer";
export default {
  components: {
    carticon,
    bottom
  },
  data() {
    return {
      product: {},
      status: {
        isLoading: false
      },
      qty: 1,
      cartData: [],
      cartNum: 0,
      finalTotal: 0
    };
  },
  methods: {
    getSingleProduct() {
      const id = this.$route.params.productId;
      const vm = this;
      const API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/product/${id}`;
      vm.status.isLoading = true;
      this.$http.get(API).then(response => {
        // console.log(response);
        vm.product = response.data.product;
        vm.status.isLoading = false;
      });
    },
    getCart() {
      const vm = this;
      const API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/cart`;
      this.$http.get(API).then(response => {
        vm.cartNum = response.data.data.carts.length;
        vm.cartData = response.data.data.carts;
        vm.finalTotal = response.data.data.final_total;
      });
    },
    addToCart() {
      const vm = this;
      const API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/cart`;
      const cart = { product_id: vm.product.id, qty: vm.qty };
      // console.log(vm.qty);
      this.$http.post(API, { data: cart }).then(response => {
        // console.log(response);
        if (response.data.success) {
          vm.$bus.$emit("alert", "新增成功", "success");
          this.getCart();
        } else {
          vm.$bus.$emit("alert", "新增失敗", "danger");
          vm.$emit("renewCart");
        }
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
    showCart() {
      $("body").toggleClass("show");
      $("div.cart-dropdown").toggleClass("show");
    }
  },
  created() {
    this.getSingleProduct();
    this.getCart();
  }
};
</script>