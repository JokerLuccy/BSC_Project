<template>
  <div class="refer-link">
    <div class="title">您的邀请链接</div>
    <div class="content">
      <div class="divider"></div>
      <div class="my-info">
        <p>{{ linkUrl }}</p>
        <i
          v-clipboard:copy="linkUrl"
          v-clipboard:success="firstCopySuccess"
          v-clipboard:error="firstCopyError"
          class="iconfont iconfuzhi copy"
        ></i>
      </div>
      <div class="my-qrcode">
        <div class="my-qrcode-title">你的二维码</div>
        <div ref="qrcodeRef" class="qrcode-img"></div>
      </div>
      <div class="my-address">
        <div class="my-address-title">你的钱包地址</div>
        <div class="my-address-content">
          {{ getAddress }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { qrcanvas } from "qrcanvas";
export default {
  name: "ReferLink",
  computed: {
    ...mapState({ userInfo: (state) => state.common.userInfo }),
    linkUrl() {
      let str = "";
      str =
        (window.location.host.startsWith("192") ? "http://" : "https://") +
        window.location.host +
        `/login?code=${this.userInfo.code}&time=${Date.now()}`;
      return str;
    },
  },
  methods: {
    // 初始化二维码
    initQrcode() {
      const canvas = qrcanvas({
        data: this.linkUrl,
        size: 64,
      });
      this.$refs.qrcodeRef.innerHTML = "";
      this.$refs.qrcodeRef.appendChild(canvas);
    },
    // 复制成功
    firstCopySuccess() {
      this.$toast("复制成功");
    },
    firstCopyError() {
      this.$toast("该设备不支持复制");
    },
  },
  mounted() {
    this.initQrcode();
    this.$store.dispatch("getUserInfo", { address: this.getAddress });
  },
};
</script>

<style lang="less" scoped>
.refer-link {
  margin: 0 auto;
  width: 345px;
  height: 321px;
  .title {
    width: 100%;
    height: 83px;
    background-image: url("../../assets/images/refer-link.png");
    background-size: cover;
    box-sizing: border-box;
    padding-top: 39px;
    text-align: center;
    font-size: 20px;
    font-family: "PingFang SC";
    font-weight: bold;
    color: #ffffff;
  }
  .content {
    width: 345px;
    box-sizing: border-box;
    padding-bottom: 15px;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(52, 52, 52, 0.08);
    opacity: 1;
    border-radius: 10px;
    .divider {
      width: 345px;
      height: 10px;
      background: linear-gradient(180deg, #2ebef3 0%, #007eff 100%);
      opacity: 1;
    }
    .my-info {
      margin: 0 auto;
      margin-top: 15px;
      margin-bottom: 10px;
      width: 315px;
      height: 50px;
      background: #e8ecf1;
      opacity: 1;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 215px;
        font-size: 14px;
        font-family: "PingFang SC";
        font-weight: 500;
        color: #1e262f;
        white-space: nowrap;
      }
      .copy {
        margin-left: 10px;
        font-size: 12px;
      }
    }
    .my-qrcode,
    .my-address {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .my-qrcode-title,
      .my-address-title {
        font-size: 14px;
        font-family: "PingFang SC";
        font-weight: 500;
        color: #1e262f;
      }
      .qrcode-img {
        margin-top: 13px;
        width: 64px;
        height: 64px;
        opacity: 1;
      }
      .my-address-content {
        font-size: 12px;
        font-family: "PingFang SC";
        font-weight: 500;
        color: #1e262f;
      }
    }
    .my-address {
      margin-top: 18px;
    }
  }
}
</style>
