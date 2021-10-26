<template>
  <div class="cumulative-card">
    <h4>{{ title }}</h4>
    <p class="amount">{{ `${amount} ${unit}` }}</p>
    <p class="date">{{ nowDate }}</p>
    <p class="user-level">{{ userLevel }}</p>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "CumulativeCard",
  props: {
    title: { ype: String, default: "标题" },
    amount: { type: Number, default: 0 },
    unit: { type: String, default: "USDT" },
    userLevel: { type: String, default: "" },
  },

  computed: {
    nowDate() {
      return dayjs(Date.now()).format("YYYY-MM-DD");
    },
  },
};
</script>

<style lang="less" scoped>
.cumulative-card {
  margin-top: 15px;
  width: 345px;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 15px;
  justify-content: space-between;
  background-image: url("../assets/images/bg.png");
  background-size: cover;
  h4 {
    align-self: flex-start;
    font-size: 14px;
    font-family: "PingFang SC";
    font-weight: 500;
    color: #ffffff;
  }
  .amount {
    font-size: 23px;
    font-family: DIN;
    font-weight: bold;
    color: #ffffff;
  }
  .date {
    font-size: 12px;
    font-family: "PingFang SC";
    font-weight: 400;
    color: #e9ecf0;
  }
  .user-level {
    align-self: flex-end;
    font-size: 14px;
    font-family: "PingFang SC";
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
