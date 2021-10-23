<template>
  <div class="home-header">
    <div class="top">
      <img v-lazy="logoImg" alt="" />
      灵犀MAX
    </div>
    <div class="bottom">
      元宇宙链游专业设备
      <img
        @click="visiable = !visiable"
        v-lazy="require('../assets/images/category.png')"
        class="category"
        alt=""
      />
    </div>
    <ul
      :class="{
        'category-list': 'category-list',
        'active-category': visiable ? 'active-category' : '',
      }"
    >
      <li
        class="category-list-item"
        v-for="item in categoryList"
        :key="item.path"
        @click="$router.push(item.path)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { logoImg } from "../config/constants";
export default {
  name: "HomeHeader",
  data() {
    return {
      visiable: false,
      logoImg: Object.freeze(logoImg),
      categoryList: Object.freeze([
        { path: "/home", name: "首页" },
        { path: "/withdraw", name: "提现" },
        { path: "/account_detail", name: "账户详情" },
        { path: "/award_record", name: "奖励记录" },
        { path: "/game_assets", name: "游戏资产" },
        { path: "/invite", name: "邀请好友" },
        { path: "/feedback", name: "用户反馈" },
      ]),
    };
  },
};
</script>

<style lang="less" scoped>
.home-header {
  width: 100%;
  height: 60px;
  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(52, 52, 52, 0.08);
  box-sizing: border-box;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  .top {
    align-self: flex-start;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: "PingFang SC";
    font-weight: bold;
    color: #1e262f;
    img {
      width: 28px;
      height: 28px;
      margin-right: 5px;
    }
  }
  .bottom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    font-family: "PingFang SC";
    font-weight: 400;
    color: #1e262f;
    .category {
      width: 25px;
      height: 17px;
    }
  }
  .category-list {
    position: absolute;
    top: 60px;
    width: 375px;
    height: 0;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0px 3px 6px rgba(52, 52, 52, 0.08);
    opacity: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    transition: height 0.5s ease-in-out;
    .category-list-item {
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 500;
      color: #1e262f;
    }
  }
  .active-category {
    height: 220px;
  }
}
</style>
