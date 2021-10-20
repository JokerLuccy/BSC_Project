<template>
  <div class="sign">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: "Sign",
  props: {
    title: {
      type: String,
      default: "标题",
    },
  },
};
</script>

<style lang="less" scoped>
.sign {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 315px;
  height: 40px;
  font-size: 22px;
  font-family: SourceHanSansCN-Bold;
  color: #0291ff;
  background-image: url("../assets/images/sign.png");
  background-size: 316px 26px;
  background-position: bottom;
  background-repeat: no-repeat;
}
.sign::before {
  content: "";
  width: 6px;
  height: 6px;
  background: linear-gradient(180deg, #2ebef3 0%, #007eff 100%);
  border-radius: 50%;
  opacity: 1;
  margin-top: 8px;
  margin-right: 5px;
}
.sign::after {
  content: "";
  width: 6px;
  height: 6px;
  background: linear-gradient(180deg, #2ebef3 0%, #007eff 100%);
  border-radius: 50%;
  opacity: 1;
  margin-top: 8px;
  margin-left: 5px;
}
</style>
