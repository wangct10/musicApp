<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <svg
        class="icon liebiao"
        aria-hidden="true"
        @click="play"
        v-if="isbtnShow"
      >
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :musicList="playList[playListIndex]"
        :play="play"
        :isbtnShow="isbtnShow"
        :addDuration="addDuration"
      ></MusicDetail>
    </van-popup>
  </div>
</template>

<script>
import MusicDetail from "@/components/item/MusicDetail.vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      interVal: 0,
    };
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),
  },
  mounted() {
    // console.log(this.$refs);
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration();
    // console.log(this.$refs);
  },
  methods: {
    play: function () {
      // 判断音乐如果暂停就播放，否则暂停
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        // 播放就调用函数进行传值
        this.updateTime();
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        // 暂停清除定时器
        clearInterval(this.interVal);
      }
    },
    addDuration: function () {
      this.updateDuration(this.$refs.audio.duration);
    },
    updateTime: function () {
      this.interVal = setInterval(() => {
        // console.log("间隔定时器");
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000);
      // 这几个函数都是浏览器 window 对象提供的，没有公开的规范和标准，所以并不保证这些ID都是从1开始。  要么第几个定时器，要么id
      // console.log(this.interVal);
    },
    ...mapMutations([
      "updateIsbtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
  },
  watch: {
    // 监听如果下标发生了改变，如果开启自动播放音乐
    playListIndex: function () {
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        this.updateIsbtnShow(false);
        this.$refs.audio.play();
      }
    },
    // 监听列表中的按钮是否为true 然后自动播放音乐
    playList: function () {
      if (this.isbtnShow) {
        this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      }
    },
  },
  components: {
    MusicDetail,
  },
};
</script>

<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: white;
  position: fixed;
  bottom: 0;
  border-top: 1px solid gray;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    width: 80%;
    height: 100%;
    display: flex;
    // justify-content: space-around;
    align-items: center;
    div {
      font-size: 0.28rem;
      margin-left: 0.2rem;
      p {
        font-weight: bolder;
      }
      span {
        display: inline-block;
        padding-top: 5px;
        font-size: 0.24rem;
      }
    }
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.7rem;
      height: 0.7rem;
    }
  }
}
</style>
