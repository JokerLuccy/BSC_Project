<template>
  <div class="introduce">
    <header>
      <img
        v-lazy="require('../../assets/images/introduce-logo.png')"
        alt=""
        class="introduce-img"
      />
      元宇宙链游合约
    </header>
    <ul class="introduce-list">
      <li
        class="introduce-list-item"
        v-for="item in introduceList"
        :key="item.id"
      >
        <img
          v-lazy="require('../../assets/images/correct.png')"
          alt=""
          class="correct"
        />
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Introduce",
  data() {
    return {
      introduceList: Object.freeze([
        { id: 1, text: "灵犀MAX创造了一个更为广阔的Axie算力市场。" },
        {
          id: 2,
          text: "灵犀MAX让全球范围内的虚拟资产都可以更加自由和高效的进出该市场。",
        },
        {
          id: 3,
          text: "每一期的Axie算力合约都有真实的Axie账户铸造，意味着真实有效投入到Axie元宇宙网络。",
        },
        { id: 4, text: "用户持有Axie算力合约即可进行无差别的Axie的SLP获取。" },
      ]),
    };
  },
};
</script>
<style lang="less" scoped>
.introduce {
  width: 100%;
  height: 289px;
  box-sizing: border-box;
  padding: 22px 15px 15px 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  header {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    padding-bottom: 30px;
    font-size: 16px;
    font-family: SourceHanSansCN-Bold;
    color: #1e262f;
    .introduce-img {
      width: 158px;
      height: 30px;
      margin-bottom: 17px;
    }
  }
  .introduce-list {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .introduce-list-item {
      width: 100%;
      display: flex;
      align-items: flex-start;
      flex-wrap: nowrap;
      font-size: 14px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #1e262f;
      margin-bottom: 10px;
      line-height: 20px;
      .correct {
        margin-top: 5px;
        width: 16px;
        height: 16px;
        margin-right: 10px;
        flex-shrink: 0;
      }
    }
  }
}
</style>
