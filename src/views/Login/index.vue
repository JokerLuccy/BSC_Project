<template>
  <div class="login">
    <header>
      <div class="left">
        <img v-lazy="logoImg" class="logo-img" />
        <span>灵犀MAX</span>
      </div>
      <img class="lang-img" src="../../assets/images/cn.png" />
    </header>
    <button @click="$router.push('/register')" class="login-btn">
      授权登录
    </button>
  </div>
</template>

<script>
import constants from "../../config/constants";
export default {
  name: "Login",
  data() {
    return {
      logoImg: constants.logoImg,
    };
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #333333;
  opacity: 1;
  background-image: url("../../assets/images/login-bg.png");
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
        color: #e9ecf0;
      }
    }
    .lang-img {
      width: 22px;
      height: 18px;
    }
  }
  .login-btn {
    position: absolute;
    top: 500px;
    left: 50%;
    transform: translateX(-50%);
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
    color: #ffffff;
    outline: none;
    border: none;
  }
}
</style>
