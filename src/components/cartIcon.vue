<template>
  <div>
    <!-- 購物車icon -->
    <div class="cart-dropdown" @click.prevent="showCart">
      <span class="badge badge-warning">{{cartNum}}</span>
      <i class="fas fa-cart-plus fa-2x text-info rounded-circle border p-3 border-primary bg-white"></i>
      <div class="cart-content p-2 rounded-sm shadow">
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
                <td class="text-right">{{item.final_total}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="cartTotal row justify-content-around">
          <span class="text-pageHover font-weight-bold">小計</span>
          <span class="text-success font-weight-bold h5">{{finalTotal | currency}}</span>
        </div>
      </div>
    </div>
    <div class="grayOverlay"></div>
  </div>
</template>

<style lang="scss">
</style>

<script>
export default {
  props: ["cartNum", "cartData", "finalTotal"],
  methods: {
    showCart() {
      this.$emit("showCart");
    }
  }
};
</script>