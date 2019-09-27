<!--swiper template-->
<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide>
      <div class="swiper-container">
        <div class="banner-first banner">
          <main>
            <blockquote
              class="text-justify"
            >"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt corporis optio eligendi autem ea voluptate maiores tempore numquam pariatur atque!"</blockquote>
            <span class="text-right w-100 d-block">MingYang, Shih (2019)</span>
          </main>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-container">
        <div class="banner-second banner">
          <main>
            <blockquote
              class="text-justify"
            >"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt corporis optio eligendi autem ea voluptate maiores tempore numquam pariatur atque!"</blockquote>
            <span class="text-right w-100 d-block">MingYang, Shih (2019)</span>
          </main>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-container">
        <div class="banner-third banner">
          <main>
            <blockquote
              class="text-justify"
            >"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt corporis optio eligendi autem ea voluptate maiores tempore numquam pariatur atque!"</blockquote>
            <span class="text-right w-100 d-block">MingYang, Shih (2019)</span>
          </main>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-container">
        <div class="banner-fourth banner">
          <main>
            <blockquote
              class="text-justify"
            >"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt corporis optio eligendi autem ea voluptate maiores tempore numquam pariatur atque!"</blockquote>
            <span class="text-right w-100 d-block">MingYang, Shih (2019)</span>
          </main>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-container">
        <div class="banner-fifth banner">
          <main>
            <blockquote
              class="text-justify"
            >"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt corporis optio eligendi autem ea voluptate maiores tempore numquam pariatur atque!"</blockquote>
            <span class="text-right w-100 d-block">MingYang, Shih (2019)</span>
          </main>
        </div>
      </div>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
    <!-- <div class="swiper-button-next" slot="button-next"></div> -->
    <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
  </swiper>
</template>

<style lang="scss" >
%bannerHeight {
  height: 500px;
}
%glassEffect {
  main {
    max-width: 35%;
    margin: 0 auto;
    color: black;
    position: relative;
    overflow: hidden;
    top: 150px;
    padding: 1em 1em;
    z-index: 0;
    border-radius: 0.3em;
    background: hsla(0, 0%, 100%, 0.3);
    // text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.3);
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: hsla(0, 0%, 100%, 0.3);
      z-index: -1;
      filter: blur(5px);
      margin: -30px;
    }
  }
  blockquote {
    font-family: palatino;
    font-style: italic;
  }
  span {
    font-family: palatino;
  }
}
.banner {
  @extend %bannerHeight;
}
.swiper-container {
  @extend %bannerHeight;
  cursor: pointer;
  .banner-first {
    background-image: url("https://images.unsplash.com/photo-1515768523934-8b2a506819b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1289&q=80");
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    @extend %glassEffect;
  }
  .banner-second {
    background-image: url("https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
    background-position: 100% 70%;
    background-size: cover;
    @extend %glassEffect;
  }
  .banner-third {
    background-image: url("https://images.unsplash.com/photo-1525342306245-c6a1e32087ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
    background-position: 0% 20%;
    background-size: cover;
    @extend %glassEffect;
  }
  .banner-fourth {
    background-image: url("https://images.unsplash.com/photo-1461141346587-763ab02bced9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1548&q=80");
    background-position: 50% 65%;
    background-size: cover;
    @extend %glassEffect;
  }
  .banner-fifth {
    background-image: url("https://images.unsplash.com/photo-1539045230092-f8c7e0d1b4b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
    background-position: 50% 65%;
    background-size: cover;
    @extend %glassEffect;
  }
  .swiper-pagination-bullet-active {
    background-color: rgb(198, 209, 205);
  }
}
</style>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        speed: 1000,
        loop: true,
        autoplay: {
          delay: 5000
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  }
};
</script>
