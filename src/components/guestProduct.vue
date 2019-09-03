<template>
  <div class="row" v-masonry transition-duration="1s" item-selector=".item" origin-left="true">
    <div
      class="col-12 col-md-4 mt-3 item"
      v-for="item in productArray"
      :key="item.id"
      v-masonry-tile
      @click.prevent="toDetailPage(item.id)"
    >
      <div class="card" style="width: 100%;">
        <img :src="item.imageUrl" class="card-img-top" :alt="item.id" />
        <div class="card-body">
          <h6>
            <span class="badge badge-info">{{item.category}}</span>
          </h6>
          <h5 class="card-title text-cardTitle">{{item.title}}</h5>
          <p class="card-text">{{item.content}}</p>
          <div class="d-flex justify-content-between align-items-baseline">
            <div class="h5" v-if="!item.price">原價{{item.origin_price}}</div>
            <del class="h6 text-warning" v-if="item.price">原價{{item.origin_price | currency}}</del>
            <div class="h5" v-if="item.price">現在只要{{item.price | currency}}</div>
          </div>
        </div>
        <div class="btn-group" role="group" @click.prevent="addToCart(item.id)">
          <button type="button" class="btn btn-primary">
            <i class="fas fa-shopping-cart mr-3"></i>Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.card {
  overflow: hidden;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.075);

  &:hover {
    box-shadow: 0 8px 24px #8f8d8d;
  }
  img {
    transform: scale(1, 1);
    transition: all 0.8s ease-out;
    cursor: pointer;
    &:hover {
      transform: scale(1.1, 1.1);
    }
  }
}
</style>

<script>
export default {
  props: ["productArray"],
  methods: {
    addToCart(id) {
      const vm = this;
      const API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/cart`;
      const cart = { product_id: id, qty: 1 };
      this.$http.post(API, { data: cart }).then(response => {
        if (response.data.success) {
          vm.$bus.$emit("alert", "新增成功", "success");
          vm.$emit("renewCart");
        } else {
          vm.$bus.$emit("alert", "新增失敗", "danger");
          vm.$emit("renewCart");
        }
      });
    },
    toDetailPage(id) {
      console.log(id);
      this.$router.push(`/singleproduct/${id}`);
    }
  }
};
</script>