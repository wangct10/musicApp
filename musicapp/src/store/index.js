import { createStore } from 'vuex'
import { getMusiclyric } from '@/request/api/item.js'
import { getPhoneLogin } from '@/request/api/home.js'
export default createStore({
  state: {
    playList: [{//播放列表
      al: {
        id: 145634204,
        name: "再见无期",
        pic: 109951167482058700,
        picUrl: "https://p1.music.126.net/Lx0nKszrEu7D8jtVgtcOuA==/109951167482058699.jpg",
        pic_str: "109951167482058699"
      },
      ar: [{
        name: "XMASwu"
      }],
      name: '再见无期',
      id: 1951144114
    }],
    playListIndex: 0,//默认下标为0
    isbtnShow: true,//暂停按钮显示
    detailShow: false,//歌曲详情页的显示
    lyricList: {},//歌词部分
    currentTime: 0,//当前时间
    duration: 0,//歌曲总时长
    isLogin: false,//判断是否登录
    isFooterMusic: true,//判断底部组件是否需要显示
    token: '',//存储token
    // user: {}//用户信息
  },
  mutations: {
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value
    },
    updatePlayList: function (state, value) {
      state.playList = value
    },
    pushPlayList: function (state, value) {
      state.playList.push(value)
      // console.log(state.playList);
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
      // console.log(state.playListIndex);
    },
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList: function (state, value) {
      state.lyricList = value
    },
    updateCurrentTime: function (state, value) {
      state.currentTime = value
      // console.log(state.currentTime);
    },
    updateDuration: function (state, value) {
      state.duration = value
    },
    updateIsLogin: function (state, value) {
      state.isLogin = value
    },
    updateToken: function (state, value) {
      state.token = value
      localStorage.setItem('token', state.token)
    },
    // updateUser: function (state, value) {
    //   state.user = value
    // }
  },
  actions: {
    getLyric: async function (context, id) {
      let res = await getMusiclyric(id)
      // console.log(res);
      context.commit('updateLyricList', res.data.lrc)
    },
    getLogin: async function (context, value) {
      let res = await getPhoneLogin(value)
      // console.log(res);
      return res
    }
  },
  modules: {
  }
})
