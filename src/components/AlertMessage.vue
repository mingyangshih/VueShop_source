<template>
  <div class="message-alert">
    <div
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
      v-if="status == 'danger'"
    >
      {{message}}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div
      class="alert alert-success alert-dismissible fade show"
      role="alert"
      v-if="status == 'success'"
    >
      {{message}}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
      status: ""
    };
  },
  methods: {
    showAlert() {
      const vm = this;
      $(".alert").removeClass("d-none");
      setTimeout(function() {
        vm.status = "";
      }, 4000);
    }
  },
  created() {
    const vm = this;
    this.$bus.$on("alert", (message, status = "danger") => {
      vm.message = message;
      vm.status = status;
      vm.showAlert();
    });
  }
};
</script>

<style lang="scss" scoped>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
  font-family: "Noto Sans TC", sans-serif;
}
</style>