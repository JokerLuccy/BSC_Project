<template>
  <div class="feedback">
    <common-header title="用户反馈">
      <template v-if="$route.path === '/feedback/question'">
        <div class="message" @click="$router.push('/feedback/message')">
          <i class="iconfont iconxiaoxitongzhi1"></i>
          消息通知
        </div>
      </template>
      <template v-else>
        <div class="message" @click="handleIsEditor">
          {{ _isEditor ? "取消编辑" : "编辑" }}
        </div>
      </template>
    </common-header>
    <router-view></router-view>
  </div>
</template>

<script>
import CommonHeader from "../../components/CommonHeader.vue";
import { mapMutations, mapState } from "vuex";
export default {
  components: { CommonHeader },
  name: "FeedBack",
  data() {
    return {
      isEditor: false,
    };
  },
  computed: {
    ...mapState({
      _isEditor: (state) => state.status.isEditor,
    }),
  },
  methods: {
    ...mapMutations(["SET_EDITOR"]),
    handleIsEditor() {
      this.isEditor = !this.isEditor;
      this.SET_EDITOR(!this.isEditor);
    },
  },
};
</script>

<style lang="less" scoped>
.feedback {
  width: 100%;
  height: 100%;
  .common-header {
    .message {
      position: absolute;
      right: 15px;
      width: 104px;
      height: 30px;
      background: linear-gradient(90deg, #2ebef3 0%, #007eff 100%);
      box-shadow: 0px 3px 6px rgba(2, 145, 255, 0.15);
      opacity: 1;
      border-radius: 21px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-family: "PingFang SC";
      font-weight: 500;
      color: #ffffff;
      .iconxiaoxitongzhi1 {
        margin-right: 5px;
      }
    }
  }
}
</style>
