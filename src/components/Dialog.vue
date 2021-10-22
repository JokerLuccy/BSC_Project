<template>
  <van-dialog
    className="dialog-pwd"
    v-model="visiable"
    title="输入密码"
    confirm-button-color="#0291FF"
    confirm-button-text="支付"
    cancel-button-color="#999999"
    cancel-button-text="取消"
    show-cancel-button
  >
    <input
      class="pay-pwd-input"
      type="password"
      placeholder="请输入您的支付密码~"
    />
    <router-link to="/set_pwd?type=1" class="forget-pwd">忘记密码?</router-link>
  </van-dialog>
</template>

<script>
export default {
  name: "DialogPwd",
  data() {
    return {
      visiable: true,
    };
  },
};
</script>

<style lang="less" scoped>
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
</style>
