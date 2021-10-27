<template>
  <div class="withdraw">
    <common-header title="提现" />
    <form @submit.prevent="onWithdraw" class="withdraw-form">
      <div class="content">
        <label>
          提现地址
          <input
            v-model="withdrawAddress"
            class="input"
            type="text"
            placeholder="请输入您要提现的地址"
          />
          <br />
          <input
            v-model="withdrawAmount"
            class="input"
            type="number"
            value="0.0"
          />
          <div class="select">
            <div class="selected" @click="handleCoinList($event)">
              <img :src="selectAsset.imgSrc" alt="" />
              <span>{{ selectAsset.name }}</span>
              <i
                class="triangle iconfont iconsanjiaoxing"
                :class="{
                  'active-triangle': visiable ? 'active-triangle' : '',
                }"
              ></i>
            </div>
            <ul
              :class="{
                'option-list': 'option-list',
                'active-option-list': visiable ? 'active-option-list' : '',
              }"
            >
              <li
                @click="handleSelect(item)"
                class="option-list-item"
                v-for="item in optionList"
                :key="item.imgSrc"
              >
                <img :src="item.imgSrc" alt="" />
                {{ item.name }}
              </li>
            </ul>
          </div>
        </label>
        <div class="withdraw-info">
          <p>
            余额:<span>{{ withdrawInfo.usdtBalance }} USDT</span>
          </p>
          <p>
            余额:<span>{{ withdrawInfo.slpBalance }} SLP</span>
          </p>
          <p>最小提现数量:{{ getMinWithdraw.min }} {{ selectAsset.name }}</p>
          <p>手续费:{{ getMinWithdraw.fee }} {{ selectAsset.name }}</p>
        </div>
      </div>
      <button class="withdraw-btn">提现</button>
    </form>
    <div class="withdraw-table">
      <h4>明细</h4>
      <van-list v-if="withdrawRecordList.length" class="withdraw-list">
        <div class="table-title">
          <p class="time">时间</p>
          <p class="count">数量</p>
          <p class="address">地址</p>
          <p class="status">状态</p>
        </div>
        <div
          class="table-title-item"
          v-for="item in withdrawRecordList"
          :key="item._id"
        >
          <p class="time">{{ item.createdAt }}</p>
          <p class="count">{{ item.amount }} {{ item.asset }}</p>
          <p class="address">
            {{ item.addressTo.slice(0, 5) + "****" + item.addressTo.slice(-3) }}
          </p>
          <p class="status">{{ status["" + item.progress] }}</p>
        </div>
      </van-list>
      <NoData v-else />
    </div>
    <van-dialog
      className="dialog-pwd"
      v-model="isShooDialog"
      title="输入密码"
      confirm-button-color="#0291FF"
      confirm-button-text="支付"
      cancel-button-color="#999999"
      cancel-button-text="取消"
      show-cancel-button
      @confirm="onConfim"
    >
      <input
        class="pay-pwd-input"
        type="password"
        placeholder="请输入您的支付密码~"
        v-model="password"
      />
      <router-link to="/set_pwd?type=1" class="forget-pwd"
        >忘记密码?</router-link
      >
    </van-dialog>
  </div>
</template>

<script>
import CommonHeader from "../../components/CommonHeader.vue";
import * as timeago from "timeago.js";
import NoData from "../../components/NoData.vue";
import {
  getBalance,
  getWithdrawFee,
  withdraw,
  withdrawRecord,
} from "../../server";

export default {
  components: { CommonHeader, NoData },
  name: "Withdraw",
  data() {
    return {
      optionList: [
        {
          id: 0,
          name: "USDT",
          imgSrc: require("../../assets/images/usdt.png"),
        },
        {
          id: 1,
          name: "SLP",
          imgSrc: require("../../assets/images/slp.png"),
        },
      ],
      visiable: false,
      withdrawInfo: {
        usdtBalance: 0,
        slpBalance: 0,
        usdtMinWithdraw: 10,
        slpMinWithdraw: 20,
        usdtFee: 10,
        slpFee: 10,
      },
      selectAsset: {
        id: 0,
        name: "USDT",
        imgSrc: require("../../assets/images/usdt.png"),
      },
      withdrawAddress: "",
      withdrawAmount: 0,
      isShooDialog: false,
      password: "",
      current: 1,
      withdrawRecordList: [],
      status: {
        1: "正在上链",
        2: "成功",
        3: "驳回",
      },
    };
  },
  computed: {
    getMinWithdraw() {
      if (this.selectAsset.id) {
        return {
          min: this.withdrawInfo.slpMinWithdraw,
          fee: this.withdrawInfo.slpFee,
        };
      } else {
        return {
          min: this.withdrawInfo.usdtMinWithdraw,
          fee: this.withdrawInfo.usdtFee,
        };
      }
    },
  },
  methods: {
    async onConfim() {
      await withdraw(
        this.withdrawAddress,
        this.selectAsset.name,
        this.withdrawAmount,
        this.password,
        this.getAddress
      );
      await this.getAssetBalance();
      await this.getWithdrawRecord();
      this.withdrawAddress = "";
      this.withdrawAmount = 0;
      this.password = "";
    },
    onWithdraw() {
      if (this.selectAsset.id === 0) {
        if (!this.withdrawAddress) return this.$toast("请输入您要提现的地址");
        if (this.withdrawAmount < this.getMinWithdraw.min)
          return this.$toast(`最少提现${this.getMinWithdraw.min} USDT`);
      }
      if (this.selectAsset.id === 1) {
        if (!this.withdrawAddress) return this.$toast("请输入您要提现的地址");
        if (this.withdrawAmount < this.getMinWithdraw.min)
          return this.$toast(`最少提现${this.getMinWithdraw.min} SLP`);
      }
      this.isShooDialog = true;
      return false;
    },
    async handleSelect(val) {
      this.selectAsset = val;
      this.visiable = !this.visiable;
      await this.getWithdrawRecord();
    },
    handleCoinList(event) {
      event.preventDefault();
      this.visiable = !this.visiable;
    },
    async getAssetBalance() {
      const usdtData = await getBalance(this.getAddress, "USDT");
      const slpData = await getBalance(this.getAddress, "SLP");
      this.withdrawInfo.usdtBalance = usdtData.available;
      this.withdrawInfo.slpBalance = slpData.available;
    },
    async getFee() {
      const usdtInfo = await getWithdrawFee("USDT");
      const slpInfo = await getWithdrawFee("SLP");
      this.withdrawInfo.usdtMinWithdraw = usdtInfo.min;
      this.withdrawInfo.usdtFee = usdtInfo.fee;
      this.withdrawInfo.slpMinWithdraw = slpInfo.min;
      this.withdrawInfo.slpFee = slpInfo.fee;
    },
    async getWithdrawRecord() {
      const data = await withdrawRecord(
        this.getAddress,
        this.current,
        this.selectAsset.name
      );
      this.withdrawRecordList = data.list.map((item) => {
        return {
          ...item,
          createdAt: timeago.format(item.createdAt, "zh_CN"),
        };
      });
    },
  },
  async created() {
    await this.getAssetBalance();
    await this.getFee();
    await this.getWithdrawRecord();
  },
};
</script>

<style lang="less" scoped>
.withdraw {
  width: 100%;
  height: 100%;
  .withdraw-form {
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    padding-top: 13px;
    padding-bottom: 15px;
    margin: 0 auto;
    font-family: "PingFang SC";
    .content {
      width: 345px;
      height: 238px;
      background: #ffffff;
      box-shadow: 0px 0px 10px rgba(52, 52, 52, 0.08);
      opacity: 1;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 10px;
      label {
        font-size: 14px;
        font-weight: 600;
        color: #1e262f;
        position: relative;
        .input {
          width: 315px;
          height: 40px;
          background: #e8ecf1;
          opacity: 1;
          border-radius: 10px;
          outline: none;
          border: none;
          text-align: center;
          color: #333;
        }
        .input::placeholder {
          color: #abafb9;
        }
        .input:first-child {
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .select {
          position: absolute;
          right: 10px;
          bottom: -10px;
          .selected {
            width: 72px;
            height: 40px;
            display: flex;
            align-items: center;
            img {
              width: 18px;
              height: 18px;
            }
            span {
              margin-left: 1px;
              margin-right: 5px;
              font-size: 14px;
              font-family: "PingFang SC";
              font-weight: 500;
              color: #1e262f;
            }
            .triangle {
              transform: scale(0.6);
              font-size: 14px;
              transition: transform 0.3s ease-in-out;
            }
            .active-triangle {
              transform: rotate(180deg) scale(0.6);
            }
          }

          .option-list {
            position: absolute;
            top: 35px;
            width: 72px;
            height: 0;
            background: #ffffff;
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
            opacity: 1;
            border-radius: 5px;
            display: flex;
            align-items: center;
            flex-direction: column;
            transition: height 0.3s ease-in-out;
            overflow: hidden;
            .option-list-item {
              width: 100%;
              height: 50%;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              font-size: 14px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: #7c7e82;
              box-sizing: border-box;
              padding-left: 7px;
              img {
                width: 16px;
                height: 16px;
                margin-right: 5px;
              }
            }
            .option-list-item:last-child {
              border-top: 1px solid #e9ecf0;
            }
          }
          .active-option-list {
            height: 70px;
          }
        }
      }
      .withdraw-info {
        font-size: 12px;
        font-family: "PingFang SC";
        font-weight: 500;
        p {
          margin-top: 10px;
          span {
            color: #0291ff;
          }
        }
      }
    }
    .withdraw-btn {
      margin-top: 15px;
      width: 345px;
      height: 45px;
      background: linear-gradient(90deg, #2ebef3 0%, #007eff 100%);
      box-shadow: 0px 3px 6px rgba(2, 145, 255, 0.15);
      opacity: 1;
      border-radius: 21px;
      border: none;
      color: #ffffff;
      font-weight: bold;
    }
  }
  .withdraw-table {
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
    .withdraw-list {
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
          width: 67px;
        }
        .count {
          width: 109px;
        }
        .address {
          width: 91px;
        }
        .status {
          flex-grow: 1;
        }
      }
      .table-title-item {
        .status {
          color: #0291ff;
        }
      }
    }
  }
  .dialog-pwd {
    .pay-pwd-input {
      display: block;
      border: none;
      width: 265px;
      height: 34px;
      background: #f4f4f4;
      opacity: 1;
      border-radius: 5px;
      margin: 0 auto;
      margin-top: 15px;
      margin-bottom: 6px;
      box-sizing: border-box;
      padding-left: 10px;
    }
    .pay-pwd-input::placeholder {
      color: #b5b5b5;
    }
    .forget-pwd {
      display: block;
      width: 100%;
      text-align: right;
      box-sizing: border-box;
      padding-right: 15px;
      padding-bottom: 10px;
      font-size: 12px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #0291ff;
    }
  }
}
</style>
