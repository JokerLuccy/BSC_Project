<template>
  <van-overlay :show="visiable" class-name="notice">
    <div class="content">
      <div class="title">
        系统公告
        <i @click="visiable = false" class="iconfont icona-chutubiao close"></i>
      </div>
      <ul class="notice-list">
        <li
          class="notice-list-item"
          v-for="item in announceList"
          :key="item.id"
        >
          <h4>{{ item.title }}</h4>
          <p class="description">
            {{ item.content }}
          </p>
          <div class="footer">
            <div class="name"><img v-lazy="logoImg" alt="" /> 灵犀MAX</div>
            <br />
            <p class="time">{{ item.createdAt }}</p>
          </div>
        </li>
      </ul>
    </div>
  </van-overlay>
</template>

<script>
import dayjs from "dayjs";
import { logoImg } from "../../config/constants";
import { last, list } from "../../server/index";
export default {
  name: "Notice",
  data() {
    return {
      logoImg: Object.freeze(logoImg),
      visiable: false,
      announceList: [],
    };
  },
  methods: {
    // 获取最新公告id
    async getLastId() {
      return await last();
    },
    // 是否弹出公告
    async handleAnnounce() {
      const lastId = await this.getLastId();
      const localId = localStorage.getItem("lastId");
      if (localId) {
        if (lastId !== localId && lastId !== "") {
          const res = await list("");
          this.announceList = res.map((item) => {
            return {
              ...item,
              createdAt: dayjs(item.createdAt).format("YYYY-MM-DD HH:mm"),
            };
          });
          this.visiable = true;
          localStorage.setItem("lastId", lastId);
        }
      } else {
        localStorage.setItem("lastId", "init");
      }
    },
  },
  async mounted() {
    await this.handleAnnounce();
  },
};
</script>

<style lang="less" scoped>
.notice {
  .content {
    width: 343px;
    height: 480px;
    background: #ffffff;
    opacity: 1;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      width: 100%;
      height: 44px;
      background: linear-gradient(90deg, #2ebef3 0%, #007eff 100%);
      opacity: 1;
      border-radius: 10px 10px 0px 0px;
      position: relative;
      line-height: 44px;
      text-align: center;
      font-size: 14px;
      font-family: " PingFang SC";
      font-weight: bold;
      color: #ffffff;
      .close {
        font-size: 13.56px;
        color: #ffffff;
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
      }
    }
    .notice-list {
      width: 100%;
      height: calc(100% - 44px);
      overflow-y: scroll;
      display: flex;
      align-items: center;
      flex-direction: column;
      box-sizing: border-box;
      padding-left: 10px;
      padding-right: 10px;
      .notice-list-item {
        width: 100%;
        height: 421px;
        box-sizing: border-box;
        padding: 15px 10px;
        border-bottom: 1px solid #e9ecf0;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-family: "PingFang SC";
        h4 {
          font-size: 16px;
          font-weight: bold;
          color: #1e262f;
        }
        .description {
          width: 100%;
          height: 309px;
          font-size: 12px;
          font-weight: 400;
          line-height: 17px;
          color: #1e262f;
          overflow-y: scroll;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .footer {
          align-self: flex-start;
          font-size: 12px;
          font-family: "PingFang SC";
          font-weight: 500;
          color: #0291ff;
          display: flex;
          align-items: center;
          flex-direction: column;

          .name {
            display: flex;
            align-items: center;
            line-height: 8px;
            img {
              width: 18px;
              height: 18px;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
