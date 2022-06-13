<template>
  <div class="home">
    <ToNav></ToNav>
    <SwiperTop></SwiperTop>
    <IconList></IconList>
    <MusicList></MusicList>
  </div>
</template>

<script>
import ToNav from "@/components/home/TopNav.vue";
import SwiperTop from "@/components/home/SwiperTop.vue";
import IconList from "@/components/home/IconList.vue";
import MusicList from "@/components/home/MusicList.vue";
export default {
  name: "HomeView",
  components: {
    ToNav,
    SwiperTop,
    IconList,
    MusicList,
  },
};
</script>
