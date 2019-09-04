<template>
  <div class="container">
    <alert />
    <!-- nav bar -->
    <section class="container">
      <div class="row">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary w-100">
          <h2 class="text-secondary font-weight-bold italic">
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
    <div class="row">
      <div class="col-md-5">
        <div class="my-5 justify-content-center">
          <h4 class="text-primary mb-3">購物清單</h4>
          <table class="table">
            <thead>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in cart" :key="item.id">
                <td class="align-middle">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click.prevent="removeCartItem(item.id)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td class="align-middle">
                  <img :src="item.product.imageUrl" alt />
                  {{ item.product.title }}
                  <!-- <div class="text-success" v-if="item.coupon">
          已套用優惠券
                  </div>-->
                </td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr v-if="total">
                <td colspan="3" class="text-right">總計</td>
                <td class="text-right">{{ total | currency }}</td>
              </tr>
              <tr v-if="final_total">
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td class="text-right text-success">{{final_total | currency}}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <!-- 表單 -->
      <div class="col-md-7">
        <form class="my-md-5 my-0" @submit.prevent="createOrder">
          <h4 class="text-primary">訂單資訊</h4>
          <div class="form-row mb-3">
            <div class="col">
              <label for="useremail">Email</label>
              <input
                type="email"
                class="form-control"
                :class="{'is-invalid' : errors.has('email')}"
                name="email"
                id="useremail"
                v-model="form.user.email"
                placeholder="請輸入 Email"
                v-validate="'required|email'"
                data-vv-as="信箱"
              />
              <span class="text-danger d-block w-100 text-left">{{ errors.first('email') }}</span>
            </div>

            <div class="col">
              <label for="username">收件人姓名</label>
              <input
                type="text"
                class="form-control"
                :class="{'is-invalid' : errors.has('name')}"
                name="name"
                id="username"
                v-model="form.user.name"
                placeholder="輸入姓名"
                v-validate="'required'"
                data-vv-as="姓名"
              />
              <span class="text-danger d-block w-100 text-left">{{ errors.first('name') }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input
              type="tel"
              class="form-control"
              :class="{'is-invalid' : errors.has('phone')}"
              id="usertel"
              v-model="form.user.tel"
              placeholder="請輸入電話"
              name="phone"
              v-validate="'required|length:10'"
              data-vv-as="電話"
            />
            <span class="text-danger d-block w-100 text-left">{{ errors.first('phone') }}</span>
          </div>

          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input
              type="text"
              class="form-control"
              :class="{'is-invalid' : errors.has('address')}"
              id="useraddress"
              name="address"
              v-model="form.user.address"
              placeholder="請輸入地址"
              v-validate="'required'"
              data-vv-as="地址"
            />
            <span class="text-danger d-block w-100 text-left">{{ errors.first('address') }}</span>
          </div>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea
              name
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.italic {
  font-family: palatino;
  font-style: italic;
}
td {
  img {
    width: 50px;
    height: 50px;
  }
}
</style>


<script>
import alert from "../AlertMessage";
export default {
  components: {
    alert
  },
  data() {
    return {
      cart: [],
      final_total: 0,
      total: 0,
      form: {
        user: {},
        message: ""
      }
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/cart`;
      this.$http.get(API).then(response => {
        // console.log(response);
        vm.cart = response.data.data.carts;
        vm.final_total = response.data.data.final_total;
        vm.total = response.data.data.total;
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
    createOrder() {
      const vm = this;
      const API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/order`;
      vm.$validator.validate().then(valid => {
        // valid傳入true or false
        if (valid) {
          // vm.$bus.$emit("alert", "訂單新增成功", "success");
          const api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/order`;
          this.$http.post(API, { data: vm.form }).then(response => {
            if (response.data.success) {
              vm.$bus.$emit("alert", "訂單新增成功", "success");
              vm.form.user = {};
              this.getCart();
            }
          });
        } else {
          vm.$bus.$emit("alert", "欄位不完整", "danger");
        }
      });
    }
  },
  created() {
    this.getCart();
  }
};
</script>