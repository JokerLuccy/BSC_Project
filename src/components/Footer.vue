<template>
  <div class="footer">
    <div class="top">
      <div class="title">
        <img class="circle" src="../assets/images/logo.png" />
        灵犀MAX
      </div>
      <div class="foot-divider"></div>
      <ul class="sponsorship">
        <img
          v-for="item in imgList"
          :key="item"
          class="sponsorship-item"
          :src="item"
          alt=""
        />
      </ul>
    </div>
    <div class="bottom">©️灵犀 MAX 拥有最终解释权</div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      imgList: [
        require("../assets/images/youtube.png"),
        require("../assets/images/twitter.png"),
        require("../assets/images/facebook.png"),
        require("../assets/images/in.png"),
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.footer {
  margin-top: 43px;
  width: 100%;
  height: 215px;
  .top {
    width: 100%;
    height: 178px;
    background-image: url("../assets/images/footer.png");
    background-size: cover;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    box-sizing: border-box;
    padding-top: 70px;
    padding-bottom: 10px;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-family: "PingFang SC";
      font-weight: bold;
      color: #ffffff;
      .circle {
        width: 26px;
        height: 26px;
      }
    }
    .sponsorship {
      width: 269px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .sponsorship-item {
        width: 32px;
        height: 32px;
      }
    }
  }
  .foot-divider {
    width: 345px;
    height: 0px;
    border: 1px solid #5ebafc;
    opacity: 1;
  }
  .bottom {
    width: 100%;
    height: 37px;
    background: #161f2c;
    opacity: 1;
    box-sizing: border-box;
    padding-left: 15px;
    font-size: 12px;
    font-family: "PingFang SC";
    font-weight: 400;
    line-height: 37px;
    color: #ffffff;
  }
}
</style>
