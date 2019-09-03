<template>
  <nav class="col-md-3 col-lg-2 bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link active" to="/admin/products">
            <i class="fas fa-table"></i>
            Product List
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="fas fa-box"></i>
            Orders
          </a>
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