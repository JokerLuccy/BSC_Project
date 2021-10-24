<template>
  <div class="no-data">
    <div class="content">暂无数据~</div>
  </div>
</template>

<script>
export default {
  name: "NoData",
};
</script>

<style lang="less" scoped>
.no-data {
  width: 345px;
  height: 306px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(52, 52, 52, 0.08);
  opacity: 1;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 200px;
    height: 220px;
    background-image: url("../assets/images/no-data.png");
    background-size: cover;
    font-size: 12px;
    font-family: "PingFang SC";
    font-weight: 400;
    color: #1e262f;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
}
</style>
