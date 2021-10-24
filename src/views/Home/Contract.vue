<template>
  <div class="contract">
    <sign title="Axie算力合约" />
    <div class="content">
      <ul class="title-list">
        <li
          @click="handleChange(item)"
          :class="{
            'title-list-item': 'title-list-item',
            'active-title-list-item':
              currentTitle === item.id ? 'active-title-list-item' : '',
          }"
          v-for="item in titleList"
          :key="item.id"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="contract-info">
        <h4>
          <img
            v-lazy="require('../../assets/images/fil.png')"
            class="fil-img"
            alt=""
          />
          {{ minerDetail.name }}
        </h4>
        <ul class="info-list">
          <li class="info-list-item">
            <span class="name">预计7天年化率</span>
            <span class="value">{{ minerDetail.year }}</span>
          </li>
          <li class="info-list-item">
            <span class="name">AXLE合约周期</span>
            <span class="value">{{ minerDetail.period }}天</span>
          </li>
          <li class="info-list-item">
            <span class="name">铸造创立</span>
            <span class="value">T+7</span>
          </li>
          <li class="info-list-item">
            <span class="name">账面收益</span>
            <span class="value">T+7+21</span>
          </li>
          <li class="info-list-item">
            <span class="name">收益领取</span>
            <span class="value">T+7+21+15</span>
          </li>
          <li class="info-list-item">
            <span class="name">管理费用</span>
            <span class="value">{{ minerDetail.fee }}</span>
          </li>
          <li class="info-list-item">
            <span class="name">剩余份额</span>
            <span class="value">{{ minerDetail.num }}份</span>
          </li>
        </ul>
        <div class="progress">
          <van-progress
            track-color="#E8ECF1"
            color="linear-gradient(180deg, #2EBEF3 0%, #007EFF 100%)"
            :percentage="50"
            stroke-width="8"
            :show-pivot="false"
          />
        </div>
      </div>
      <div class="select-level">
        <div class="title">
          <div class="col-divider"></div>
          选择级别
        </div>
        <div class="options">
          <div
            @click="currentMinerType = item.minerType"
            :class="{
              'option-item': 'option-item',
              'active-option-item':
                currentMinerType === item.minerType ? 'active-option-item' : '',
            }"
            v-for="item in minerBuyInfo.arr"
            :key="item.id"
          >
            {{ `${item.minerType === 1 ? "初级" : "高级"} ${item.usdt} USDT` }}
            <img
              v-show="currentMinerType === item.minerType"
              src="../../assets/images/correct-white.png"
              alt=""
              class="correct-white-img"
            />
          </div>
        </div>
      </div>
      <div class="right-buy">
        <div class="title">
          <div class="col-divider"></div>
          立即抢购
          <div class="counter">
            <i
              v-if="buyNumberLimit.decrementBtn"
              @click="buyNumber = buyNumber - 1"
              class="iconfont iconjian active-decrement"
            ></i>
            <i v-else class="iconfont iconjian decrement"></i>

            <input type="number" readonly v-model="buyNumber" />
            <i
              v-if="buyNumberLimit.incrementBtn"
              @click="buyNumber = buyNumber + 1"
              class="iconfont iconjia active-increment"
            ></i>
            <i v-else class="iconfont iconjia increment"></i>
          </div>
        </div>
        <button @click="onBought" class="buy-btn">购买</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapState } from "vuex";
import Sign from "../../components/Sign.vue";
import { bnbLimit } from "../../config/constants";
import { buyMiner, minerBuyList } from "../../server";
import { BSC } from "../../utils/wallet";
export default {
  components: { Sign },
  name: "Contract",
  data() {
    return {
      currentTitle: 0,
      currentMinerType: 0,
      titleList: [
        { id: 0, name: "期货合约" },
        { id: 1, name: "现货合约" },
      ],
      minerList: [],
      buyNumber: 1,
      bnbBalance: 0,
      usdtBalance: 0,
    };
  },
  computed: {
    ...mapState({ userInfo: (state) => state.common.userInfo }),
    minerBuyInfo() {
      if (!this.currentTitle) {
        const arr = [];
        this.minerList.forEach((item) => {
          if (item.minerType === 1 || item.minerType === 2) {
            arr.push(item);
          }
        });
        return {
          type: "futures",
          arr,
        };
      } else {
        const arr = [];
        this.minerList.forEach((item) => {
          if (item.minerType === 3 || item.minerType === 4) {
            arr.push(item);
          }
        });
        return {
          type: "spot",
          arr,
        };
      }
    },
    minerDetail() {
      return this.minerBuyInfo.arr.filter(
        (item) => item.minerType === this.currentMinerType
      )[0];
    },
    buyNumberLimit() {
      if (this.buyNumber === 1) {
        return {
          incrementBtn: true,
          decrementBtn: false,
        };
      } else if (this.buyNumber > 1 && this.buyNumber < this.minerDetail.num) {
        return {
          incrementBtn: true,
          decrementBtn: true,
        };
      } else {
        return {
          incrementBtn: false,
          decrementBtn: true,
        };
      }
    },
    needTotalPay() {
      return this.buyNumber * this.minerDetail.usdt;
    },
  },
  watch: {
    currentTitle: {
      handler(oldVal, newVal) {
        if (newVal === undefined) newVal = 1;
        !newVal ? (this.currentMinerType = 3) : (this.currentMinerType = 1);
      },
      immediate: true,
    },
  },
  methods: {
    handleChange(val) {
      this.currentTitle = val.id;
    },
    async onBought() {
      console.log(this.bnbBalance);
      if (this.bnbBalance < bnbLimit) return this.$toast("BNB余额不足");
      if (this.usdtBalance < this.needTotalPay)
        return this.$toast("USDT余额不足");
      const toast = Toast.loading({
        message: "购买中",
        duration: 0,
      });
      const transferRes = await this.bsc.transferUsdt(
        this.userInfo.depositAddress,
        this.needTotalPay
      );
      if (!transferRes) {
        toast.clear();
        this.$toast("操作取消");
      } else {
        await buyMiner(
          this.getAddress,
          transferRes.transactionHash,
          this.minerDetail.id,
          this.buyNumber
        );
        toast.clear();
        this.$toast("购买成功");
      }
    },
  },
  async created() {
    const data = await minerBuyList();
    this.minerList = data;
    this.bsc = new BSC();
    this.bnbBalance = await this.bsc.getBnBalance(this.getAddress);
    this.usdtBalance = await this.bsc.getUsdtBalance(this.getAddress);
  },
};
</script>

<style lang="less" scoped>
.contract {
  margin: 0 auto;
  width: 345px;
  height: 538px;
  box-sizing: border-box;
  padding: 15px;
  background: #ffffff;
  border: 1px solid #0291ff;
  box-shadow: 0px 0px 10px rgba(52, 52, 52, 0.08);
  opacity: 1;
  border-radius: 10px;
  .content {
    box-sizing: border-box;
    padding-top: 14px;
    .title-list {
      width: 315px;
      height: 50px;
      background: #ffffff;
      box-shadow: 0px 0px 10px rgba(52, 52, 52, 0.08);
      opacity: 1;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 5px 15px;
      display: flex;
      align-items: center;

      .title-list-item {
        width: 153px;
        height: 40px;
        opacity: 1;
        font-size: 14px;
        font-family: "PingFang SC";
        font-weight: 500;
        line-height: 40px;
        text-align: center;
        color: #7c7e82;
      }
      .active-title-list-item {
        background: linear-gradient(90deg, #2ebef3 0%, #007eff 100%);
        box-shadow: 0px 3px 6px rgba(2, 145, 255, 0.1);
        border-radius: 10px;
        color: #ffffff;
      }
    }
    .contract-info {
      width: 100%;
      box-sizing: border-box;
      padding-top: 15px;
      h4 {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: bold;
        color: #1e262f;
        .fil-img {
          width: 18px;
          height: 18px;
          margin-right: 5px;
        }
      }
      .info-list {
        box-sizing: border-box;
        padding-top: 10px;
        width: 100%;
        height: 190px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        .info-list-item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          font-family: "PingFang SC";
          font-weight: 500;

          .name {
            color: #7c7e82;
          }
          .value {
            color: #1e262f;
          }
        }
        .info-list-item:first-child {
          .value {
            color: #0291ff;
          }
        }
      }
      .progress {
        box-sizing: border-box;
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .select-level {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      .title {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: bold;
        color: #1e262f;
        .col-divider {
          width: 3px;
          height: 12px;
          background: linear-gradient(180deg, #2ebef3 0%, #007eff 100%);
          opacity: 1;
          border-radius: 2px;
          margin-right: 5px;
        }
      }
      .options {
        box-sizing: border-box;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        .option-item {
          width: 153px;
          height: 40px;
          background: #bfe3ff;
          border-radius: 5px;
          font-size: 14px;
          font-family: "PingFang SC";
          font-weight: 500;
          line-height: 40px;
          text-align: center;
          color: #6abeff;
          position: relative;
          .correct-white-img {
            width: 14px;
            height: 14px;
            position: absolute;
            top: 3px;
            right: 3px;
          }
        }
        .active-option-item {
          background: #0291ff;
          color: #ffffff;
        }
      }
    }
    .right-buy {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      .title {
        height: 22px;
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: bold;
        line-height: 22px;
        color: #1e262f;
        .col-divider {
          width: 3px;
          height: 12px;
          background: linear-gradient(180deg, #2ebef3 0%, #007eff 100%);
          opacity: 1;
          border-radius: 2px;
          margin-right: 5px;
        }
        .counter {
          margin-left: 10px;
          display: flex;
          align-items: center;
          .decrement {
            color: #abafb9;
          }
          .increment {
            color: #abafb9;
          }
          .active-increment {
            color: #0291ff;
          }
          .active-decrement {
            color: #0291ff;
          }
          input {
            border: none;
            width: 28px;
            text-align: center;
            font-size: 14px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #0291ff;
          }
        }
      }
      .buy-btn {
        margin-top: 10px;
        width: 315px;
        height: 45px;
        background: linear-gradient(90deg, #2ebef3 0%, #007eff 100%);
        box-shadow: 0px 3px 6px rgba(2, 145, 255, 0.15);
        opacity: 1;
        border-radius: 5px;
        border: none;
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: bold;
        line-height: 45px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
}
</style>
