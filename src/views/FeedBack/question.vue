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
          {{ checkedQuestion.text ? checkedQuestion.text : "请选择问题类别" }}
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
            @click="handleSelect(item)"
          >
            {{ item.text }}
            <img
              v-if="item.isCheck"
              src="../../assets/images/select.png"
              alt=""
            />
            <img v-else src="../../assets/images/no-select.png" alt="" />
          </li>
        </ul>
      </div>
      <div class="your-question">
        <h4>你的问题</h4>
        <textarea
          v-model="questionDes"
          class="question-textarea"
          name="yourQuestion"
          cols="30"
          rows="10"
          placeholder="请在这里描述你的问题～"
        ></textarea>
        <button @click="onSubmit" class="submit-btn">提交</button>
      </div>
    </div>
    <verify-code
      :visiable="isShowVerify"
      @close="handleClose"
      @click="handleSubmit"
      @refersh="getVerifyCodeImg"
      v-model.trim="verifyCode"
      :verifyImg="verifyCodeImg"
    />
  </div>
</template>

<script>
import { addFeedBack, getFeedBackList } from "../../server/index";
import _ from "lodash";
import { getVerifyCode } from "../../server/index";
import VerifyCode from "../../components/VerifyCode.vue";
export default {
  name: "Question",
  components: { VerifyCode },
  data() {
    return {
      isShowVerify: false,
      visiable: false,
      questionList: [],
      checkedQuestion: {},
      questionDes: "",
      verifyCode: "",
      verifyCodeImg: "",
    };
  },
  methods: {
    async getQuestionList() {
      const data = await getFeedBackList();
      this.questionList = data.list.map((item) => {
        return {
          ...item,
          text: item.category,
          isCheck: false,
        };
      });
    },
    handleSelect(item) {
      this.questionList = this.questionList.map((v) => {
        return {
          ...v,
          isCheck: v._id === item._id ? true : false,
        };
      });
      this.checkedQuestion = { ...item };
      this.visiable = false;
    },
    handleClose() {
      this.isShowVerify = false;
    },
    // 提交表单
    onSubmit() {
      if (!this.questionDes) return this.$toast("请输入描述~~");
      if (!this.checkedQuestion) return this.$toast("请选择问题类型~~");
      this.isShowVerify = true;
    },
    async handleSubmit() {
      if (!this.verifyCode) return this.$toast("请输入验证码");
      const addResult = await addFeedBack(
        this.checkedQuestion.category,
        this.getAddress,
        this.questionDes,
        this.verifyCode
      );
      if (!addResult) {
        this.verifyCode = "";
        this.getVerifyCodeImg();
        return;
      }
      this.$toast("提交成功");
      this.checkedQuestion = {};
      this.questionDes = "";
      this.isShowVerify = false;
    },
    getVerifyCodeImg: _.throttle(async function () {
      this.verifyCodeImg = await getVerifyCode(this.getAddress, 2);
    }, 2000),
  },
  async created() {
    this.getQuestionList();
    this.getVerifyCodeImg();
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
        height: 250px;
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
