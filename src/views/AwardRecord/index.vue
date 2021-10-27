<template>
  <div class="award">
    <common-header title="奖励记录" />
    <cumulative-card title="累计：" userLevel="" :amount="amountSum" />
    <div class="award-table">
      <h4>明细</h4>
      <van-list
        class="award-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="table-title">
          <p class="time">时间</p>
          <p class="coin">USDT</p>
          <p class="source">来源</p>
        </div>
        <div class="table-title-item" v-for="item in list" :key="item._id">
          <p class="time">{{ item.createdAt }}</p>
          <p class="coin">{{ item.amount.toFixed(4) }}</p>
          <p class="source">合约奖励</p>
        </div>
      </van-list>
      <no-data v-if="false" />
    </div>
  </div>
</template>

<script>
import CommonHeader from "../../components/CommonHeader.vue";
import CumulativeCard from "../../components/CumulativeCard.vue";
import NoData from "../../components/NoData.vue";
import { rewardRecord } from "../../server/index";
import * as timeago from "timeago.js";
export default {
  name: "AwardRecord",
  components: { CommonHeader, CumulativeCard, NoData },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      amountSum: 0,
      current: 1,
    };
  },
  methods: {
    async onLoad() {
      this.current = this.current + 1;
      const data = await rewardRecord(this.getAddress, this.current);
      const arr = [...this.list, ...data.list];
      if (this.list.length === arr.length) {
        this.finished = true;
      }
    },
    async getRewardRecord() {
      const data = await rewardRecord(this.getAddress, this.current);
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
    await this.getRewardRecord();
  },
};
</script>

<style lang="less" scoped>
.award {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  .award-table {
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
    .award-list {
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
          width: 142px;
        }
        .coin {
          width: 125px;
        }
        .source {
          flex-grow: 1;
        }
      }
      .table-title-item {
        .coin {
          color: #0291ff;
        }
        .time,
        .source {
          color: #1e262f;
        }
      }
    }
  }
}
</style>
