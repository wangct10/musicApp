<template>
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from "@/request/api/home.js";
import { reactive, onMounted } from "vue";
export default {
  // vue3语法
  // setup相当于之前的created周期：创建时
  setup() {
    // reactive用于给对象添加响应式
    const state = reactive({
      images: [
        // "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        // "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
      ],
    });
    // onMounted：DOM挂载完毕
    onMounted(async () => {
      // axios.get("/banner?type=2").then((res) => {
      //   state.images = res.data.banners;
      //   console.log(state.images);
      // });
      let res = await getBanner();
      // console.log(res);
      if (res.status == 200) {
        state.images = res.data.banners;
      }
    });
    return { state };
  },
};
</script>

<style lang="less" >
#swiperTop {
  // 需要在上面添加自己的id
  .van-swipe {
    width: 100%;
    height: 3rem;

    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: red;
    }
  }
}
</style>