<template>
  <div class="message">
    <ul class="message-list">
      <li
        @click="isEditor ? handleSelect(item) : goToDetail(item)"
        class="message-list-item"
        v-for="item in list"
        :key="item._id"
      >
        <template v-if="isEditor">
          <img
            v-if="item.isCheck"
            src="../../assets/images/select.png"
            alt=""
            class="left"
          />
          <img
            v-else
            src="../../assets/images/no-select.png"
            alt=""
            class="left"
          />
        </template>
        <div :class="!isEditor ? 'right' : 'active-right'">
          <div class="top">
            <p class="title">{{ item.content }}</p>
            <p class="time">{{ item.createdAt }}</p>
          </div>
          <p class="content">
            {{ item.reply ? item.reply : "暂无回复" }}
          </p>
        </div>
      </li>
    </ul>
    <div v-if="isEditor" class="del-all">
      <div class="left">
        <img
          @click="delAll"
          :src="
            isDelAll
              ? require('../../assets/images/select.png')
              : require('../../assets/images/no-select.png')
          "
          alt=""
          class="checkbox"
        />

        全选
      </div>
      <button class="del-btn" @click="onSubmit">删除</button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState } from "vuex";
import { delFeedBack, getQuestionList } from "../../server";
export default {
  name: "Message",
  data() {
    return {
      messageList: [],
      current: 1,
    };
  },
  computed: {
    ...mapState({
      isEditor: (state) => state.status.isEditor,
    }),
    list() {
      return this.messageList;
    },
    delList() {
      const delArr = [];
      this.messageList.forEach((item) => {
        if (item.isCheck) delArr.push(item._id);
      });
      return delArr;
    },
    isDelAll() {
      let flag;
      if (this.delList.length === this.messageList.length) {
        flag = true;
      } else {
        flag = false;
      }
      return flag;
    },
  },

  methods: {
    async onSubmit() {
      if (!this.delList.length) return this.$toast("请选择要删除的选项");
      console.log(this.delList.join(","));
      await delFeedBack(this.delList.join(","));
      this.$store.commit("SET_EDITOR", false);
      await this.getMessageList();
    },
    delAll() {
      this.messageList = this.messageList.map((item) => {
        return {
          ...item,
          isCheck: !this.isDelAll,
        };
      });
    },
    handleSelect(item) {
      item.isCheck = !item.isCheck;
    },
    goToDetail(item) {
      if (!this.isEditor) {
        this.$router.push(`/message_detail?id=${item._id}`);
      }
    },
    async getMessageList() {
      const data = await getQuestionList(this.getAddress, this.current);
      this.messageList = data.list.map((item) => {
        return {
          ...item,
          isCheck: false,
          createdAt: dayjs(item.createdAt).format("MM-DD HH:mm"),
        };
      });
    },
  },
  created() {
    this.getMessageList();
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
