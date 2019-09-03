<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li
        class="page-item"
        v-if="pagination.has_pre"
        @click.prevent="changePage(pagination.current_page-1)"
      >
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pagination.total_pages"
        :key="page"
        :class="{'active' : page == pagination.current_page}"
        @click.prevent="changePage(page)"
      >
        <a class="page-link" href="#">{{page}}</a>
      </li>

      <li
        class="page-item"
        v-if="pagination.has_next"
        @click.prevent="changePage(pagination.current_page+1)"
      >
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@import "../assets/all.scss";
.page-link {
  &:hover {
    background-color: theme-color("pageHover");
    color: color-yiq(theme-color("pageHover"));
  }
}
</style>

<script>
export default {
  props: ["pagination"],
  data() {
    return {
      page: 1
    };
  },
  methods: {
    changePage(page) {
      const vm = this;
      vm.page = page;
      this.$emit("pageTrigger", Number(vm.page));
    }
  }
};
</script>