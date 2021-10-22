<template>
  <div class="invite-description">
    <h4>社区的奖励</h4>
    <p>
      你可以邀请你的朋友，或者在社交网络、博客或在线论坛上分享你的推荐链接。
    </p>
  </div>
</template>

<script>
export default {
  name: "InviteDescription",
};
</script>
<style lang="less" scoped>
.invite-description {
  margin: 0 auto;
  width: 345px;
  height: 109px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(52, 52, 52, 0.08);
  opacity: 1;
  border-radius: 10px;
  margin-top: 15px;
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  h4 {
    font-size: 20px;
    font-family: "PingFang SC";
    font-weight: bold;
    color: #0291ff;
  }
  p {
    margin-top: 10px;
    font-size: 14px;
    font-family: "PingFang SC";
    font-weight: 400;
    line-height: 20px;
    color: #1e262f;
  }
}
</style>
