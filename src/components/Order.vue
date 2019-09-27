<!--order template-->
<template>
  <div class="table-responsive mt-3">
    <table class="table">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in orders" :key="item.id">
          <td>{{`${new Date(item.create_at*1000).getFullYear()}/${new Date(item.create_at*1000).getMonth()+1}/${new Date(item.create_at*1000).getDate()}`}}</td>
          <td>{{email[index]}}</td>
          <td>
            <div v-for="(item1,index1) in productsDetailTitle[index]" :key="index1">
              {{item1}}
              數量: {{productsDetailNum[index][index1]}}
              {{productsDetailUnit[index][index1]}}
            </div>
          </td>

          <td>{{item.total | currency}}</td>
          <td>
            <span v-if="item.is_paid" class="text-success font-weight-bold">已付款</span>
            <span v-else class="text-secondary font-weight-bold">尚未啟用</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orders: [],
      email: [],
      products: [],
      id: [],
      productsDetailTitle: [],
      productsDetailNum: [],
      productsDetailUnit: []
    };
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/admin/orders?page=${page}`;
      const vm = this;
      this.$http.get(api).then(response => {
        // console.log(response);
        if (response.data.success) {
          this.orders = response.data.orders;
          this.orders.forEach(element => {
            this.products.push(element.products);
            this.id.push(element.id);
            this.email.push(element.user.email);
            // 彌補當初新增訂單忘記打email問題
            // if (element.user) {
            //   this.email.push(element.user.email);
            // } else {
            //   this.email.push("jsps595214@gmail.com");
            // }
          });
          this.productDetail();
        }
      });
    },
    productDetail() {
      const vm = this;
      vm.products.forEach(function(item, index) {
        var idx = 0;
        var tempTitleArray = [];
        var tempNumArray = [];
        var tempUnitArray = [];
        //products array內每個Order的物件長度
        var eachOrderLength = Object.keys(item).length;
        for (let i = 0; i < eachOrderLength; i++) {
          // console.log(eachOrderLength);
          //取出products中的所有對應id(key)
          const id = Object.keys(vm.products[index])[i];
          //取得key對應的title value,index是products array的index
          const titleValue = vm.products[index][id].product.title;
          const numValue = vm.products[index][id].product.num;
          const unitValue = vm.products[index][id].product.unit;
          tempTitleArray.push(titleValue);
          tempNumArray.push(numValue);
          tempUnitArray.push(unitValue);
          // console.log(tempArray);
          if (i === eachOrderLength - 1) {
            // console.log(i);
            vm.productsDetailTitle.push(tempTitleArray);
            vm.productsDetailNum.push(tempNumArray);
            vm.productsDetailUnit.push(tempUnitArray);
          }
        }
      });
    }
  },
  created() {
    this.getOrders();
  }
};
</script>
