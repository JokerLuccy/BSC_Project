<template>
  <div class="accounts">
    <common-header title="账户详情" />
    <cumulative-card title="累计：" :amount="amountSum.toFixed(4)" />
    <div class="account-table">
      <h4>明细</h4>
      <van-list
        v-if="list.length"
        class="account-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="table-title">
          <p class="time">时间</p>
          <p class="comput-power">算力指数</p>
          <p class="share">份额</p>
          <p class="type">类型</p>
        </div>
        <div class="table-title-item" v-for="item in list" :key="item.id">
          <p class="time">{{ item.createdAt }}</p>
          <p class="comput-power">168 USDT</p>
          <p class="share">{{ item.num }}</p>
          <p class="type">
            {{ item.minerType === 1 || item.minerType === 2 ? "期货" : "现货" }}
          </p>
        </div>
      </van-list>
      <no-data v-else />
    </div>
  </div>
</template>

<script>
import CommonHeader from "../../components/CommonHeader.vue";
import CumulativeCard from "../../components/CumulativeCard.vue";
import NoData from "../../components/NoData.vue";
import { myMinePlay } from "../../server/index";
import * as timeago from "timeago.js";
export default {
  name: "Accounts",
  components: { CommonHeader, CumulativeCard, NoData },
  data() {
    return {
      list: [],
      loading: false,
      finished: true,
      amountSum: 0,
      current: 1,
    };
  },
  methods: {
    async onLoad() {
      this.current = this.current + 1;
      const data = await myMinePlay(this.getAddress);
      const arr = [...this.list, ...data.list];
      this.loading = false;
      if (this.list.length === arr.length) {
        this.finished = true;
      }
    },
    async getMyminerPlay() {
      const data = await myMinePlay(this.getAddress);
      this.amountSum = data.amountSum;
      this.list = data.list.map((item) => {
        return {
          ...item,
          createdAt: timeago.format(item.createdAt, "zh_CN"),
        };
      });
    },
  },
  async created() {
    await this.getMyminerPlay();
  },
};
</script>

<style lang="less" scoped>
.accounts {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  .account-table {
    width: 345px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    h4 {
      box-sizing: border-box;
      padding-top: 20px;
      padding-bottom: 15px;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: bold;
      color: #1e262f;
    }
    .account-list {
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
          width: 89px;
        }
        .comput-power {
          width: 97px;
        }
        .share {
          width: 105px;
        }
        .type {
          flex-grow: 1;
        }
      }
      .table-title-item {
        .comput-power {
          color: #0291ff;
        }
        .time,
        .share,
        .type {
          color: #1e262f;
        }
      }
    }
  }
}
</style>
