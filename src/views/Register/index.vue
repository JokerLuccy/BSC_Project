<template>
  <div class="register">
    <header>
      <div class="left">
        <img v-lazy="logoImg" class="logo-img" />
        <span>灵犀MAX</span>
      </div>
      <img class="lang-img" src="../../assets/images/cn-blue.png" />
    </header>
    <div class="address">
      {{ getAddress.slice(0, 5) + "****" + getAddress.slice(-4) }}
    </div>
    <form @submit.prevent="onShowVerify">
      <input
        class="input-invite"
        v-model.trim="referCode"
        type="text"
        placeholder="请输入邀请码"
      />
      <br />
      <button class="confirm-btn">确认</button>
    </form>
    <verify-code
      :visiable="visiable"
      @close="handleClose"
      @click="handleSubmit"
      @refersh="getVerifyCodeImg"
      v-model.trim="verifyCode"
      :verifyImg="verifyCodeImg"
    />
  </div>
</template>

<script>
import VerifyCode from "../../components/VerifyCode.vue";
import { logoImg } from "../../config/constants";
import { getVerifyCode, register } from "../../server/index";
import _ from "lodash";
export default {
  components: { VerifyCode },
  name: "Register",
  data() {
    return {
      logoImg: logoImg,
      verifyCode: "",
      visiable: false,
      verifyCodeImg: "",
      referCode: "",
    };
  },

  methods: {
    async handleSubmit() {
      if (!this.verifyCode) return this.$toast("请输入验证码");
      const registerResult = await register(
        this.getAddress,
        this.verifyCode,
        this.referCode
      );
      if (!registerResult) {
        this.verifyCode = "";
        this.referCode = "";
        this.visiable = false;
        this.verifyCodeImg = await getVerifyCode(this.getAddress, 1);
        return;
      }
      this.visiable = false;
      this.$router.push("/home");
    },
    handleClose() {
      this.visiable = false;
    },
    getVerifyCodeImg: _.throttle(async function () {
      this.verifyCodeImg = await getVerifyCode(this.getAddress, 1);
    }, 2000),
    onShowVerify: _.throttle(function () {
      if (!this.referCode) return this.$toast("请输入邀请码");
      this.visiable = true;
    }, 2000),
  },
  async created() {
    this.referCode = this.$route.query.code;
    await this.getVerifyCodeImg();
  },
};
</script>

<style lang="less" scoped>
.register {
  width: 100%;
  height: 100%;
  background: #333333;
  opacity: 1;
  background-image: url("../../assets/images/register-bg.png");
  background-size: cover;
  box-sizing: border-box;
  padding-top: 15px;
  position: relative;
  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
    .left {
      display: flex;
      align-items: center;
      .logo-img {
        width: 28px;
        height: 28px;
        margin-right: 5px;
      }
      span {
        font-size: 22px;
        font-family: "PingFang SC";
        font-weight: bold;
        color: #1e262f;
      }
    }
    .lang-img {
      width: 22px;
      height: 18px;
    }
  }
  .address {
    width: 123px;
    height: 24px;
    background: rgba(2, 145, 255, 0.5);
    border: 1px solid #0291ff;
    opacity: 1;
    border-radius: 12px 0px 0px 12px;
    font-size: 12px;
    font-family: "PingFang SC";
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    color: #ffffff;
    position: absolute;
    right: 0;
    top: 112px;
  }
  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .input-invite {
      width: 165px;
      height: 32px;
      background: #e8ecf1;
      border: 1px solid #0291ff;
      opacity: 0.88;
      border-radius: 5px;
      font-size: 14px;
      font-family: "PingFang SC";
      font-weight: 400;
      line-height: 32px;
      text-align: center;
      color: #0291ff;
    }
    .confirm-btn {
      width: 179px;
      height: 41px;
      background: linear-gradient(90deg, #2ebef3 0%, #007eff 100%);
      box-shadow: 0px 3px 6px rgba(2, 145, 255, 0.15);
      opacity: 1;
      border-radius: 21px;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: bold;
      line-height: 41px;
      text-align: center;
      border: none;
      color: #ffffff;
    }
  }
}
</style>
