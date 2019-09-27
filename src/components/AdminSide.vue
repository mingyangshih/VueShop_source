<!--AdminSide-->
<template>
  <nav class="col-md-3 col-lg-2 bg-light sidebar pt-md-4">
    <div class="sticky-sidebar">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link active" to="/admin">
            <i class="fas fa-table"></i>
            Product List
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/order">
            <i class="fas fa-box"></i>
            Orders
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="fas fa-ticket-alt"></i>
            Coupon
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss">
@media (max-width: 768px) {
  .sticky-sidebar {
    height: calc(100% / 3);
  }
}
@media (min-width: 768px) {
  .sticky-sidebar {
    height: calc(100vh - 81px);
  }
}
</style>
