<template>
  <div class="common-header">
    <i @click="$router.push(to)" class="iconfont iconfanhui back-arrow"></i>
    <span>{{ title }}</span>
    <slot />
  </div>
</template>

<script>
export default {
  name: "CommonHeader",
  props: {
    title: { type: String, default: "标题" },
    to: { type: String, default: "/home" },
  },
};
</script>

<style lang="less" scoped>
.common-header {
  flex-shrink: 0;
  width: 100%;
  height: 43px;
  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(52, 52, 52, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  span {
    font-size: 16px;
    font-family: "PingFang SC";
    font-weight: bold;
    color: #1e262f;
  }
  .back-arrow {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #1e262f;
  }
}
</style>
