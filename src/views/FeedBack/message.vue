<template>
  <div class="message">
    <ul class="message-list">
      <li
        @click="goToDetail"
        class="message-list-item"
        v-for="item in 100"
        :key="item"
      >
        <img
          v-if="isEditor"
          src="../../assets/images/select.png"
          alt=""
          class="left"
        />
        <div :class="!isEditor ? 'right' : 'active-right'">
          <div class="top">
            <p class="title">基于2021-04-19 您反馈的消息馈的消息馈的消息</p>
            <p class="time">04-19 13：22</p>
          </div>
          <p class="content">
            回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复
          </p>
        </div>
      </li>
    </ul>
    <div v-if="isEditor" class="del-all">
      <div class="left">
        <img src="../../assets/images/no-select.png" alt="" class="checkbox" />
        全选
      </div>
      <button class="del-btn">删除</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Message",
  computed: {
    ...mapState({
      isEditor: (state) => state.status.isEditor,
    }),
  },
  methods: {
    goToDetail() {
      if (!this.isEditor) {
        this.$router.push("/message_detail");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.message {
  width: 100%;
  height: calc(100% - 43px);
  box-sizing: border-box;
  padding-top: 15px;
  position: relative;
  .message-list {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    .message-list-item {
      flex-shrink: 0;
      width: 345px;
      background: #ffffff;
      box-shadow: 0px 0px 10px rgba(52, 52, 52, 0.13);
      opacity: 1;
      border-radius: 10px;
      margin-bottom: 10px;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      align-items: center;
      .right {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        .top {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: "PingFang SC";
          .title {
            width: 212px;
            font-size: 14px;
            font-weight: bold;
            color: #1e262f;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .time {
            font-size: 10px;
            font-weight: 400;
            line-height: 27px;
            color: #7c7e82;
          }
        }
        .content {
          margin-top: 5px;
          width: 300px;
          height: 17px;
          font-size: 12px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #7c7e82;
          opacity: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .active-right {
        flex-grow: 1;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        .top {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: "PingFang SC";
          .title {
            width: 212px;
            font-size: 14px;
            font-weight: bold;
            color: #1e262f;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .time {
            font-size: 10px;
            font-weight: 400;
            line-height: 27px;
            color: #7c7e82;
          }
        }
        .content {
          margin-top: 5px;
          width: 300px;
          height: 17px;
          font-size: 12px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #7c7e82;
          opacity: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .left {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }
  .del-all {
    position: absolute;
    bottom: 30px;
    left: 15px;
    width: 345px;
    height: 49px;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(52, 52, 52, 0.13);
    opacity: 1;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #0291ff;
      .checkbox {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
    .del-btn {
      width: 86px;
      height: 32px;
      background: #0291ff;
      box-shadow: 0px 3px 6px rgba(2, 145, 255, 0.15);
      opacity: 1;
      border-radius: 21px;
      font-size: 14px;
      font-family: "PingFang SC";
      font-weight: 500;
      line-height: 32px;
      text-align: center;
      color: #ffffff;
      border: none;
    }
  }
}
</style>
