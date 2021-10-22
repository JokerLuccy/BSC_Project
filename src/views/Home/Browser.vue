<template>
  <div class="browser">
    <h4>看看 灵犀MAX 如何实时工作</h4>
    <div class="sub-title">AXS 区块链浏览器</div>
  </div>
</template>

<script>
export default {
  name: "Browser",
};
</script>

<style lang="less" scoped>
.browser {
  width: 100%;
  height: 126px;
  background-image: url("../../assets/images/browser.png");
  background-size: cover;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  padding-top: 30px;
  padding-bottom: 30px;
  h4 {
    font-size: 14px;
    font-family: "PingFang SC";
    font-weight: bold;
    color: #ffffff;
  }
  .sub-title {
    width: 124px;
    height: 23px;
    border: 1px solid #ffffff;
    opacity: 1;
    border-radius: 3px;
    font-size: 12px;
    font-family: "PingFang SC";
    font-weight: 400;
    line-height: 23px;
    text-align: center;
    color: #ffffff;
  }
}
</style>
