<!--cartIcon template-->
<template>
  <div>
    <!-- 購物車icon -->
    <div class="cart-dropdown">
      <span class="badge badge-warning">{{cartNum}}</span>
      <i
        class="fas fa-cart-plus fa-2x rounded-circle border p-3 border-primary"
        @click.prevent="showCart"
      ></i>
      <div class="cart-content p-2 rounded-sm shadow">
        <span class="closeCartMenu" @click.prevent="closeCart">&times;</span>
        <h6 class="text-pageHover">Choosed Item</h6>
        <div class="cart-menu-scroll mb-2">
          <table class="table table-sm">
            <tbody>
              <tr v-for="item in cartData" :key="item.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click.prevent="removeCartItem(item.id)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td>{{item.product.title}}</td>
                <td class="text-right">{{item.final_total | currency}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="cartTotal row justify-content-around">
          <span class="text-pageHover font-weight-bold">小計</span>
          <span class="text-success font-weight-bold h5">{{finalTotal | currency}}</span>
        </div>
        <router-link class="d-flex w-100" to="/Home/checkout">
          <button type="button" class="btn btn-primary btn-sm btn-block" @click="closeCart">結帳去</button>
        </router-link>
      </div>
    </div>
    <div class="grayOverlay"></div>
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
  .closeCartMenu {
    text-align: center;
    line-height: 18px;
    display: block;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    position: absolute;
    top: -5px;
    right: 5px;
    border: 1px solid #0b0b0b;
    border-radius: 50%;
    &:hover {
      background: #0b0b0b;
      color: white;
    }
  }
}
.fa-cart-plus {
  background: white;
  color: #17a2b8;
  transition: all 0.5s;
  &:hover {
    background: #2b2b2b;
    color: white;
  }
}
</style>

<script>
export default {
  props: ["cartNum", "cartData", "finalTotal"],
  methods: {
    showCart() {
      this.$emit("showCart");
    },
    removeCartItem(id) {
      this.$emit("removeCartItem", id);
    },
    closeCart() {
      $("body").toggleClass("show");
      $("div.cart-dropdown").toggleClass("show");
    }
  }
};
</script>
