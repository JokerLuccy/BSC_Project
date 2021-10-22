<template>
  <div
    class="verify-code animate__animated"
    :class="visiable ? ['animate__bounceInLeft', 'active'] : []"
  >
    <i @click="onClose" class="iconfont icona-chutubiao close"></i>
    <form @submit.prevent="onSubmit">
      <div class="title">验证</div>
      <div class="verify-img"></div>
      <input
        type="text"
        :value="value"
        @input="$emit('input', $event.target.value)"
        placeholder="请输入验证码"
      />
      <button class="submit-btn">确定</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "VerifyCode",
  props: {
    value: {
      type: String,
      default: "",
    },
    visiable: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "input",
  },
  methods: {
    onSubmit() {
      this.$emit("click");
    },
    onClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="less" scoped>
.verify-code {
  width: 345px;
  height: 219px;
  background: #ffffff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.09);
  opacity: 1;
  border-radius: 10px;
  z-index: 15;
  position: absolute;
  top: 265px;
  left: -999px;
  box-sizing: border-box;
  padding: 15px;
  .close {
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 14px;
    color: #1e262f;
  }
  form {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    .title {
      font-size: 18px;
      font-family: "PingFang SC";
      font-weight: bold;
      color: #1e262f;
    }
    .verify-img {
      width: 250px;
      height: 92px;
      background: #e8ecf1;
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.09);
      opacity: 1;
      border-radius: 10px;
    }
    input {
      width: 251px;
      height: 30px;
      background: #e8ecf1;
      opacity: 1;
      border-radius: 5px;
      font-size: 14px;
      color: #1e262f;
      border: none;
      text-align: center;
    }
    .submit-btn {
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #0291ff;
      align-self: flex-end;
      border: none;
      background-color: transparent;
    }
  }
}
.active {
  left: 15px;
}
</style>
