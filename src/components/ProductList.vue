<template>
  <div>
    <!-- vue loading overlay 效果放在最頂部-->
    <div class="vld-parent">
      <loading :active.sync="status.isLoading" loader="dots"></loading>
    </div>
    <!-- 新增產品的button -->
    <div class="text-right">
      <button class="btn btn-outline-primary" id="addModal" @click.prevent="openModal(true)">建立新的產品</button>
    </div>
    <!-- product list table -->
    <div class="table-responsive mt-3">
      <table class="table">
        <thead>
          <th width="120">分類</th>
          <th>商品名稱</th>
          <th class="text-right" width="120">原價</th>
          <th class="text-right" width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200" class="text-right">編輯</th>
        </thead>
        <tbody>
          <tr v-for="(item) in products" :key="item.id">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td class="text-right">{{item.origin_price}}</td>
            <td class="text-right">{{item.price}}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else class="text-danger">未啟用</span>
            </td>
            <td class="text-right">
              <div class="btn-group btn-group-sm" role="group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click.prevent="openModal(false,item)"
                >編輯</button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click.prevent="deleteModal(item)"
                >刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination :pagination="pagination" @pageTrigger="getProducts" />
    </div>
    <!-- add product Modal  -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">新增產品</span>
              <span v-else>編輯產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <!-- 下方ref屬性設定的files會影響到寫js時尋找檔案的路徑 -->
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    name="file-to-upload"
                    @change="uploadFile"
                  />
                </div>
                <img :src="tempProduct.imageUrl" class="img-fluid" />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delete modal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click.prevent="deleteProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.btn,
table,
.modal {
  font-family: "Noto Sans TC", sans-serif;
}
</style>

<script>
import Pagination from "./Pagination";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      status: {
        isLoading: false,
        fileUploading: false
      }
    };
  },
  methods: {
    // 取得產品資訊
    getProducts(page = 1) {
      const vm = this;
      const API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/admin/products?page=${page}`;
      vm.status.isLoading = true;
      this.$http.get(API).then(response => {
        console.log(response);
        if (response.data.success) {
          vm.products = response.data.products;
          vm.pagination = response.data.pagination;
          //overlay loading關閉
          vm.status.isLoading = false;
        } else {
          this.$router.push("/login");
        }
      });
    },
    // 新增修改產品，透過isNew做判斷
    updateProduct() {
      const vm = this;
      let API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/admin/product`;
      let httpMethod = "post";
      if (vm.isNew == false) {
        API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](API, { data: vm.tempProduct }).then(response => {
        // console.log(response);
        $("#productModal").modal("hide");
        vm.tempProduct = {};
        vm.getProducts();
      });
    },
    // 刪除產品
    deleteProduct() {
      const vm = this;
      let API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(API).then(response => {
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getProducts();
        }
      });
    },
    uploadFile() {
      // console.log(this.$refs);
      // 創建form
      let formData = new FormData();
      // 取得上傳檔案資料
      let file = this.$refs.files.files[0];
      const vm = this;
      formData.append("file-to-upload", file);
      let API = `${process.env.APIPATH}/api/${process.env.PATHNAME}/admin/upload`;
      vm.status.fileUploading = true; //啟用旋轉fontawesome
      this.$http
        .post(API, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          if (response.data.success) {
            vm.$bus.$emit("alert", "上傳成功", "success");
            // console.log(response);
            if (vm.tempProduct.imageUrl) {
              // 若當初在新增產品時就有上傳相片，就可以直接透過指派的方法
              vm.tempProduct.imageUrl = response.data.imageUrl;
            } else {
              // 若當初新增產品沒有上傳相片，就需要重新設定，否則無法雙向綁定
              vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
            }
            vm.status.fileUploading = false;
          } else {
            // console.log(response);
            vm.$bus.$emit("alert", response.data.message, "danger");
            vm.status.fileUploading = false;
          }
        });
    },
    // 打開新增或編輯modal(同一個)並透過帶入的變數判斷是新增還是修改
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = item;
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    // 開啟刪除的modal，並將tempProduct設為item
    deleteModal(item) {
      $("#delProductModal").modal("show");
      this.tempProduct = item;
    }
  },
  created() {
    this.getProducts();
  }
};
</script>