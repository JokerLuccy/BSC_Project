<template>
  <div class="invite-table">
    <h4>邀请明细</h4>
    <van-list
      v-if="list.length"
      class="invite-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="table-title">
        <p class="time">时间</p>
        <p class="address">地址</p>
      </div>
      <div class="table-title-item" v-for="item in list" :key="item._id">
        <p class="time">{{ item.createdAt }}</p>
        <p class="address">{{ item.address }}</p>
      </div>
    </van-list>
    <no-data v-else />
  </div>
</template>

<script>
import { recommendUsers } from "../../server/index";
import * as timeago from "timeago.js";
import NoData from "../../components/NoData.vue";
export default {
  components: { NoData },
  name: "InviteTable",
  data() {
    return {
      list: [],
      loading: false,
      finished: true,
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  },
  async created() {
    const data = await recommendUsers(this.getAddress);
    this.list = data.list.map((item) => {
      return {
        ...item,
        createdAt: timeago.format(item.createdAt, "zh_CN"),
      };
    });
  },
};
</script>

<style lang="less" scoped>
.invite-table {
  width: 345px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 30px;
  h4 {
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 15px;
    font-size: 16px;
    font-family: "PingFang SC";
    font-weight: bold;
    color: #1e262f;
  }
  .invite-list {
    margin-bottom: 30px;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
    width: 345px;
    height: 306px;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(52, 52, 52, 0.08);
    opacity: 1;
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;

    overflow-y: scroll;
    .table-title,
    .table-title-item {
      flex-shrink: 0;
      width: 100%;
      height: 37px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e9ecf0;
      font-size: 12px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #7c7e82;
      .time {
        width: 152px;
      }
      .address {
        flex-grow: 1;
      }
    }
    .table-title-item {
      .time {
        color: #0291ff;
      }
      .address {
        color: #1e262f;
      }
    }
  }
}
</style>
