<template>
  <div class="message-detail">
    <common-header title="消息详情" to="/feedback/message" />
    <header>
      <h4>{{ detail.content }}</h4>
      <div class="author">
        <p class="author-name">灵犀MAX</p>
        <p class="time">{{ detail.createdAt }}</p>
      </div>
    </header>
    <div class="content">
      {{ detail.reply ? detail.reply : "暂无回复" }}
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import CommonHeader from "../../components/CommonHeader.vue";
import { getFeedBackDetail } from "../../server";
export default {
  components: { CommonHeader },
  name: "MessageDetail",
  data() {
    return {
      detail: {},
    };
  },
  async created() {
    const { id } = this.$route.query;
    const data = await getFeedBackDetail(this.address, id);
    this.detail = {
      ...data,
      createdAt: dayjs(data.createdAt).format("YYYY-MM-DD HH:mm"),
    };
  },
};
</script>

<style lang="less" scoped>
.message-detail {
  width: 100%;
  height: 100%;
  header {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 16px 20px 16px;
    font-family: "PingFang SC";
    h4 {
      width: 100%;
      font-size: 18px;
      font-weight: bold;
      line-height: 27px;
      color: #1e262f;
    }
  }
  .author {
    margin-top: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "PingFang SC";
    font-weight: 400;
    .author-name {
      font-size: 13px;
      color: #0291ff;
    }
    .time {
      font-size: 12px;
      color: #1e262f;
    }
  }
  .content {
    margin: 0 auto;
    width: 343px;
    height: 470px;
    background: #e8ecf1;
    opacity: 1;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 15px;
    overflow-y: scroll;
    font-size: 12px;
    font-family: "PingFang SC";
    font-weight: 500;
    line-height: 15px;
    color: #1e262f;
  }
}
</style>
