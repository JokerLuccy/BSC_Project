<template>
  <div class="contract">
    <sign title="Axie算力合约" />
    <div class="content">
      <ul class="title-list">
        <li class="title-list-item" v-for="item in titleList" :key="item.id">
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
          Axie算力指数WG G20211101A
        </h4>
        <ul class="info-list">
          <li class="info-list-item" v-for="item in infoList" :key="item.name">
            <span class="name">{{ item.name }}</span>
            <span class="value">{{ item.value }}</span>
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
          <div class="option-item" v-for="item in optionsList" :key="item.id">
            {{ item.text }}
            <img
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
            <i class="iconfont iconjian decrement"></i>
            <input type="number" readonly value="1" />
            <i class="iconfont iconjia increment"></i>
          </div>
        </div>
        <button class="buy-btn">购买</button>
      </div>
    </div>
  </div>
</template>

<script>
import Sign from "../../components/Sign.vue";
export default {
  components: { Sign },
  name: "Contract",
  data() {
    return {
      titleList: [
        { id: 0, name: "期货合约" },
        { id: 1, name: "现货合约" },
      ],
      infoList: [
        { name: "预计7天年化率", value: "360%" },
        { name: "AXLE合约周期", value: "360天" },
        { name: "铸造创立", value: "T+7" },
        { name: "账面收益", value: "T+7+21" },
        { name: "收益领取", value: "T+7+21+15" },
        { name: "管理费用", value: "15%" },
        { name: "剩余份额", value: "1000份" },
      ],
      optionsList: [
        { id: 0, text: "初级 168 USDT" },
        { id: 1, text: "高级 168 USDT" },
      ],
    };
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
      justify-content: space-between;
      .title-list-item {
        width: 153px;
        height: 40px;
        background: linear-gradient(90deg, #2ebef3 0%, #007eff 100%);
        box-shadow: 0px 3px 6px rgba(2, 145, 255, 0.1);
        opacity: 1;
        border-radius: 10px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 40px;
        text-align: center;
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
        font-family: PingFang SC;
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
          font-family: PingFang SC;
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
        font-family: PingFang SC;
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
          background: #0291ff;
          opacity: 1;
          border-radius: 5px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          line-height: 40px;
          text-align: center;
          color: #ffffff;
          position: relative;
          .correct-white-img {
            width: 14px;
            height: 14px;
            position: absolute;
            top: 3px;
            right: 3px;
          }
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
        font-family: PingFang SC;
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
            color: #0291ff;
          }
          input {
            border: none;
            width: 28px;
            text-align: center;
            font-size: 14px;
            font-family: PingFang SC;
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
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 45px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
}
</style>
