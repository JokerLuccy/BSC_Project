<template>
  <div class="award">
    <common-header title="奖励记录" />
    <cumulative-card title="累计：" userLevel="" />
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
        <div class="table-title-item" v-for="item in 100" :key="item">
          <p class="time">3分钟前</p>
          <p class="coin">1.00</p>
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
export default {
  name: "AwardRecord",
  components: { CommonHeader, CumulativeCard, NoData },
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
