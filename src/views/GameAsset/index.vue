<template>
  <div class="game-assets">
    <common-header title="游戏资产" />
    <ul class="title-list">
      <li
        @click="currentIndex = item.id"
        :class="{
          'list-item': 'list-item',
          'active-list-item':
            currentIndex === item.id ? 'active-list-item' : '',
        }"
        v-for="item in titleList"
        :key="item.text"
      >
        {{ item.text }}
      </li>
    </ul>
    <div class="game-card">
      <div class="left">
        <p class="top">累计</p>
        <p class="center">{{ amountSum }} SLP</p>
        <p class="bottom">{{ nowDate }}</p>
      </div>
      <div class="right">
        <p class="top">可提取</p>
        <p class="center">{{ extractCount }}SLP</p>
        <button @click="handleExtract" class="bottom">提取</button>
      </div>
    </div>
    <div class="game-table">
      <h4>明细</h4>
      <van-list
        v-if="filterList.length"
        class="game-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="table-title">
          <p class="time">时间</p>
          <p class="coin">USDT</p>
          <p class="status">状态</p>
        </div>
        <div class="table-title-item" v-for="item in filterList" :key="item.id">
          <p class="time">{{ item.createdAt }}</p>
          <p class="coin">{{ item.rewarded }}</p>
          <p class="status">已发放</p>
        </div>
      </van-list>
      <no-data v-else />
    </div>
  </div>
</template>

<script>
import * as timeago from "timeago.js";
import dayjs from "dayjs";
import CommonHeader from "../../components/CommonHeader.vue";
import { extract, myMinePlay } from "../../server";
import NoData from "../../components/NoData.vue";
export default {
  components: { CommonHeader, NoData },
  name: "GameAsset",
  data() {
    return {
      titleList: Object.freeze([
        { id: 0, text: "期货合约(初级)" },
        { id: 1, text: "期货合约(高级)" },
        { id: 2, text: "现货合约(初级)" },
        { id: 3, text: "现货合约(高级))" },
      ]),
      list: [],
      loading: false,
      finished: true,
      currentIndex: 0,
      amountSum: 0,
    };
  },
  computed: {
    nowDate() {
      return dayjs(Date.now()).format("YYYY-MM-DD");
    },
    filterList() {
      switch (this.currentIndex) {
        case 0:
          return this.list.filter((item) => item.minerType === 1);
        case 1:
          return this.list.filter((item) => item.minerType === 2);
        case 2:
          return this.list.filter((item) => item.minerType === 3);
        case 3:
          return this.list.filter((item) => item.minerType === 4);
        default:
          return [];
      }
    },
    extractCount() {
      try {
        return this.filterList[0].extract;
      } catch (error) {
        return 0;
      }
    },
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
    async handleExtract() {
      await extract(this.getAddress, this.filterList[0].id);
      await this.getMyMinerPlay();
    },
    async getMyMinerPlay() {
      const data = await myMinePlay(this.getAddress);
      this.amountSum = data.amountSum.toFixed(4);
      this.list = data.list.map((item) => {
        return {
          ...item,
          createdAt: timeago.format(item.createdAt, "zh_CN"),
        };
      });
    },
  },

  async created() {
    await this.getMyMinerPlay();
  },
};
</script>

<style lang="less" scoped>
.game-assets {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  .title-list {
    flex-shrink: 0;
    margin-top: 15px;
    margin-bottom: 15px;
    width: 345px;
    height: 50px;
    background: #e8ecf1;
    opacity: 1;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 5px 15px;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    .list-item {
      flex-shrink: 0;
      width: 158px;
      height: 40px;
      color: #1e262f;
      opacity: 1;
      border-radius: 10px;
      font-size: 14px;
      font-family: "PingFang SC";
      font-weight: 500;
      line-height: 40px;
      text-align: center;
    }
    .active-list-item {
      background: linear-gradient(90deg, #2ebef3 0%, #007eff 100%);
      box-shadow: 0px 3px 6px rgba(2, 145, 255, 0.15);
      color: #ffffff;
    }
  }
  .game-card {
    flex-shrink: 0;
    width: 345px;
    height: 110px;
    background-image: url("../../assets/images/bg.png");
    background-size: cover;
    display: flex;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 20px 15px;
    justify-content: space-between;
    .left,
    .right {
      font-family: "PingFang SC";
      display: flex;
      align-items: center;
      flex-direction: column;
      color: #ffffff;

      .top {
        font-size: 14px;
        font-weight: 500;
      }
      .center {
        margin-top: 10px;
        margin-bottom: 11px;
        font-size: 18px;
        font-family: "DIN";
        font-weight: bold;
      }
      .bottom {
        font-size: 12px;
        font-weight: 400;
      }
    }
    .right {
      .bottom {
        border: none;
        width: 74px;
        height: 25px;
        background: #ffffff;
        opacity: 1;
        border-radius: 21px;
        font-size: 12px;
        font-family: "PingFang SC";
        font-weight: 400;
        line-height: 25px;
        text-align: center;
        color: #0291ff;
      }
    }
  }
  .game-table {
    flex-shrink: 0;
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
    .game-list {
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
        .status {
          flex-grow: 1;
        }
      }
      .table-title-item {
        .coin {
          color: #0291ff;
        }
        .time,
        .status {
          color: #1e262f;
        }
      }
    }
  }
}
</style>
