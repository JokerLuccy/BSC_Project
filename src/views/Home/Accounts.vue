<template>
  <div class="accounts">
    <sign title="账户信息" />
    <div class="content">
      <label class="myu-address">
        我的地址
        <input
          type="text"
          readonly
          :value="getAddress.slice(0, 19) + '****' + getAddress.slice(-8)"
        />
      </label>
      <ul class="account-list">
        <li
          class="account-list-item"
          v-for="item in accounsList"
          :key="item.name"
        >
          <label>
            {{ item.name }}
            <br />
            <div class="account-number">
              {{ item.count.toFixed(4) }}
              {{ item.unit }}
            </div>
          </label>
        </li>
      </ul>
      <button class="account-btn" @click="$router.push('/account_detail')">
        账户详情
      </button>
    </div>
  </div>
</template>

<script>
import Sign from "../../components/Sign.vue";
import { rewardSum } from "../../server/index";
export default {
  components: { Sign },
  name: "Accounts",
  data() {
    return {
      accounsList: [
        { name: "总投入", count: 0, unit: "USDT" },
        { name: "社区收益", count: 0, unit: "USDT" },
        { name: "游戏资产", count: 0, unit: "SLP" },
        { name: "提现数量", count: 0, unit: "SLP" },
      ],
    };
  },
  async created() {
    const data = await rewardSum(this.getAddress);
    this.accounsList[0].count = data.investmentSum;
    this.accounsList[1].count = data.teamReward;
    this.accounsList[2].count = data.contractReward;
    this.accounsList[3].count = data.withdrawSum;
  },
};
</script>

<style lang="less" scoped>
.accounts {
  width: 100%;
  height: 332px;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 15px;
  .content {
    margin-top: 14px;
    width: 345px;
    height: 249px;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(52, 52, 52, 0.08);
    opacity: 1;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 15px;
    .myu-address {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-family: "PingFang SC";
      font-weight: 500;
      color: #1e262f;
      input {
        margin-left: 6px;
        width: 240px;
        height: 30px;
        background: #e8ecf1;
        opacity: 1;
        border-radius: 15px;
        border: none;
        font-size: 12px;
        font-family: "PingFang SC";
        font-weight: 500;
        text-align: center;
        color: #7c7e82;
      }
    }
    .account-list {
      width: 100%;
      height: 120px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      flex-shrink: 0;
      .account-list-item {
        width: 50%;
        label {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 500;
          color: #1e262f;
        }
        .account-number {
          box-sizing: border-box;
          padding-top: 10px;
          font-size: 18px;
          font-family: "PingFang SC";
          font-weight: bold;
          color: #0291ff;
        }
      }
    }
    .account-btn {
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
      margin-top: 15px;
    }
  }
}
</style>
