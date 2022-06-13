<template>
  <div>
    <!-- 父传子 -->
    <ItemMusicTop :playlist="state.playlist"></ItemMusicTop>
    <ItemMusicList
      :itemList="state.itemLists"
      :subscribedCount="state.playlist.subscribedCount"
    ></ItemMusicList>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList, getAllMusicItem } from "@/request/api/item.js";
import ItemMusicTop from "@/components/item/itemMusicTop";
import ItemMusicList from "@/components/item/itemMusicList";
export default {
  setup() {
    const state = reactive({
      playlist: {}, //歌单详情页数据
      itemLists: [], //歌单的歌曲
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      // console.log(id);
      // 获取歌单详情页
      let res = await getMusicItemList(id);
      // console.log(res);
      state.playlist = res.data.playlist;
      // 获取歌单歌曲
      let result = await getAllMusicItem(id);
      // console.log(result);
      state.itemLists = result.data.songs;
      // 防止页面刷新，数据丢失，将数据保存到sessionStorage中
      // JSON.stringify将 JavaScript 值转换为 JSON 字符串
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
    });
    return { state };
  },
  components: {
    ItemMusicTop,
    ItemMusicList,
  },
};
</script>

<style>
</style>