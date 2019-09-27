
<!--Admin component-->
<template>
  <div>
    <AdminNav />
    <alert />
    <div class="container-fluid">
      <div class="row">
        <AdminSide />
        <main class="col-md-9 ml-sm-auto col-lg-10 px-4 pt-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/*自訂*/
</style>

<script>
import AdminNav from "../AdminNav";
import AdminSide from "../AdminSide";
import alert from "../AlertMessage";

export default {
  components: {
    AdminNav,
    AdminSide,
    alert
  },
  data() {
    return {};
  }
};
</script>
