<template>
  <div class="question">
    <header>
      <p class="title">联系我们</p>
      <div class="sub-title">如果您对我们的服务有任何问题，请与我们联系。</div>
    </header>
    <div class="content">
      <div class="title">类别</div>
      <div class="select">
        <div class="selected" @click="visiable = !visiable">
          请选择问题类别
          <i
            class="iconfont iconxiala"
            :class="{ 'active-iconxiala': visiable ? 'active-iconxiala' : '' }"
          ></i>
        </div>
        <ul
          :class="{
            'question-list': 'question-list',
            'active-question-list': visiable ? 'active-question-list' : '',
          }"
        >
          <li
            class="question-list-item"
            v-for="item in questionList"
            :key="item.id"
          >
            {{ item.text }}
            <img src="../../assets/images/select.png" alt="" />
          </li>
        </ul>
      </div>
      <div class="your-question">
        <h4>你的问题</h4>
        <textarea
          class="question-textarea"
          name="yourQuestion"
          cols="30"
          rows="10"
          placeholder="请在这里描述你的问题～"
        ></textarea>
        <button class="submit-btn">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Question",
  data() {
    return {
      visiable: false,
      questionList: Object.freeze([
        { id: 0, text: "问题目录1" },
        { id: 1, text: "升级的问题" },
        { id: 2, text: "存款的问题" },
        { id: 3, text: "菜园的问题" },
        { id: 4, text: "改变付款密码" },
        { id: 5, text: "玩法的问题" },
        { id: 6, text: "其他问题" },
      ]),
    };
  },
};
</script>

<style lang="less" scoped>
.question {
  box-sizing: border-box;
  padding: 15px;
  header {
    font-family: "PingFang SC";
    color: #1e262f;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .sub-title {
      margin-top: 10px;
      font-size: 12px;
      font-weight: 500;
    }
  }
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    padding-top: 15px;
    font-family: "PingFang SC";
    .title {
      align-self: flex-start;
      font-size: 14px;
      font-weight: 500;
    }
    .select {
      width: 345px;
      height: 40px;
      background: #ffffff;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
      opacity: 1;
      border-radius: 5px;
      margin-top: 10px;
      margin-bottom: 15px;
      position: relative;

      .selected {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 10px 15px;
        font-size: 14px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #abafb9;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .iconxiala {
          transform: scale(0.7);
          font-size: 12px;
          color: #0291ff;
          transition: transform 0.2s ease-in-out;
        }
        .active-iconxiala {
          transform: rotate(180deg) scale(0.7);
        }
      }
      .question-list {
        width: 345px;
        height: 0;
        background: #cce9ff;
        opacity: 1;
        border-radius: 0px 0px 5px 5px;
        position: absolute;
        top: 40px;
        display: flex;
        align-items: center;
        flex-direction: column;
        overflow-y: hidden;
        transition: height 0.2s ease-in-out;
        .question-list-item {
          flex-shrink: 0;
          width: 100%;
          height: 40px;
          border-bottom: 1px solid #abdbff;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 10px 15px;
          justify-content: space-between;
          font-size: 14px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #697b89;
          img {
            width: 18px;
            height: 18px;
          }
        }
        .question-list-item:last-child {
          border: none;
        }
      }
      .active-question-list {
        height: 285px;
        overflow-y: scroll;
      }
    }
    .your-question {
      font-family: "PingFang SC";
      display: flex;
      align-items: center;
      flex-direction: column;
      h4 {
        align-self: flex-start;
        font-size: 14px;
        font-weight: 700;
        color: #1e262f;
      }
      .question-textarea {
        margin-top: 10px;
        margin-bottom: 15px;
        width: 345px;
        height: 213px;
        background: #e8ecf1;
        opacity: 1;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 10px 15px;
        font-size: 14px;
        font-weight: 400;
        color: #abafb9;
        outline: none;
        border: none;
      }
      .submit-btn {
        width: 108px;
        height: 30px;
        background: linear-gradient(90deg, #2ebef3 0%, #007eff 100%);
        box-shadow: 0px 3px 6px rgba(2, 145, 255, 0.15);
        opacity: 1;
        border-radius: 21px;
        border: none;
        font-size: 14px;
        font-family: "PingFang SC";
        font-weight: 500;
        line-height: 30px;
        text-align: center;
        color: #ffffff;
        align-self: flex-end;
      }
    }
  }
}
</style>
