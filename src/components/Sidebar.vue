<template>
  <div>
    <div class="accordion" id="accordionExample">
      <div
        class="card w-100 mb-3 rounded-sm shadow border-0"
        :class="{'bg-primary' : watchType =='all'}"
        @click="watchTypeChange('all')"
      >
        <div class="card-header text-center py-0 px-0" id="heading">
          <h2 class="text-left">
            <button class="btn btn-link" type="button">全部商品</button>
          </h2>
        </div>
      </div>
      <div
        class="card w-100 mb-3 rounded-sm shadow border-0"
        :class="{'bg-primary' : watchType =='mechanic'}"
      >
        <div
          class="card-header text-center py-0 px-0"
          id="headingOne"
          @click="watchTypeChange('mechanic')"
        >
          <h2 class="mb-0 text-left">
            <button class="btn btn-link" type="button">
              <i class="fas fa-list mr-3"></i>機械錶
            </button>
          </h2>
        </div>
      </div>
      <div
        class="card w-100 mb-3 rounded-sm shadow border-0"
        :class="{'bg-primary' : watchType =='smart'}"
      >
        <div
          class="card-header text-center py-0 px-0"
          id="headingTwo"
          @click="watchTypeChange('smart')"
        >
          <h2 class="mb-0 text-left">
            <button class="btn btn-link collapsed" type="button">
              <i class="fas fa-list mr-3"></i>智慧錶
            </button>
          </h2>
        </div>
      </div>
      <div
        class="card w-100 mb-3 rounded-sm shadow border-0"
        :class="{'bg-primary' : watchType =='digital'}"
      >
        <div
          class="card-header text-center py-0 px-0"
          id="headingThree"
          @click="watchTypeChange('digital')"
        >
          <h2 class="mb-0 text-left">
            <button class="btn btn-link collapsed" type="button">
              <i class="fas fa-list mr-3"></i>電子錶
            </button>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/all.scss";
.card {
  // transform: scale(1, 1);
  transition: all 0.5s ease-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.1, 1.1);
    background: rgb(122, 120, 120);
    color: aliceblue;
  }
  background-color: rgba(189, 189, 148, 0.2);
  .btn-link {
    font-family: "Noto Sans TC", sans-serif;
    text-decoration: none;
    &:hover,
    &:focus {
      text-decoration: none;
      color: aliceblue;
    }
  }
}
.bg-primary {
  .btn-link {
    font-family: "Noto Sans TC", sans-serif;
    text-decoration: none;
    color: color-yiq(theme-color("primary"));
    &:hover,
    &:focus {
      text-decoration: none;
      color: rgba(255, 255, 255, 0.75);
    }
  }
}
@media (max-width: 540px) {
  .card {
    &:hover {
      transform: scale(1, 1);
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      watchType: ""
    };
  },
  methods: {
    // 傳遞所選的sidebar到外層，以便動態新增class更改樣式
    watchTypeChange(type) {
      this.watchType = type;
      this.$emit("watchType", type);
    }
  },
  created() {
    this.watchType = "all";
  }
};
</script>