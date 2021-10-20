<template>
  <div class="register">
    <header>
      <div class="left">
        <img v-lazy="logoImg" class="logo-img" />
        <span>灵犀MAX</span>
      </div>
      <img class="lang-img" src="../../assets/images/cn-blue.png" />
    </header>
    <div class="address">02xd9****B9f6</div>
    <form @submit.prevent="visiable = true">
      <input class="input-invite" type="text" placeholder="请输入邀请码" />
      <br />
      <button class="confirm-btn">确认</button>
    </form>
    <verify-code
      :visiable="visiable"
      @close="handleClose"
      @click="handleSubmit"
      v-model="verifyCode"
    />
  </div>
</template>

<script>
import VerifyCode from "../../components/VerifyCode.vue";
import constants from "../../config/constants";
export default {
  components: { VerifyCode },
  name: "Register",
  data() {
    return {
      logoImg: constants.logoImg,
      verifyCode: "",
      visiable: false,
    };
  },

  methods: {
    handleSubmit() {
      this.visiable = false;
      this.$router.push("/home");
      console.log("提交成功");
    },
    handleClose() {
      this.visiable = false;
      console.log("关闭");
    },
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
        font-family: PingFang SC;
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
    font-family: PingFang SC;
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
      font-family: PingFang SC;
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
      font-family: PingFang SC;
      font-weight: bold;
      line-height: 41px;
      text-align: center;
      border: none;
      color: #ffffff;
    }
  }
}
</style>
