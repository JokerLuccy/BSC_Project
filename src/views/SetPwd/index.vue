<template>
  <div class="set-pwd">
    <common-header to="/home" title="设置密码" />
    <div class="form">
      <div class="pay-pwd">
        支付密码
        <input
          v-model.trim="payPwd"
          class="input"
          :type="visiable ? 'text' : 'password'"
          placeholder="请输入支付密码"
        />
        <i @click="visiable = !visiable" class="iconfont iconkejian"></i>
      </div>
      <div v-show="$route.query.type === '1'" class="pay-again">
        新的密码
        <input
          v-model="newPwd"
          class="input"
          :type="visiable ? 'text' : 'password'"
          placeholder="请输入新密码~"
        />
      </div>
      <div class="pay-again">
        再次输入
        <input
          v-model="payPwdAgin"
          class="input"
          :type="visiable ? 'text' : 'password'"
          placeholder="请再次输入密码~"
        />
      </div>
      <div class="verify-code">
        验证码
        <div class="inputs">
          <input
            v-model="verifyCode"
            type="text"
            class="input-verify"
            placeholder="请输入验证码"
          />
          <a @click="getVerifyCodeImg">刷新图片</a>
          <div ref="domVerify" class="verify-img"></div>
        </div>
      </div>
      <div class="tips">
        <p>
          <i class="iconfont icongantanhaotishi"></i>
          设置6位密码(字母、数字、组合)。
        </p>
        <p>
          <i class="iconfont icongantanhaotishi"></i>
          一定谨记住您的密码，如果丢失或有疑问请联系客服。
        </p>
      </div>
      <button @click="onSubmit($event)" class="confirm-btn">确认</button>
    </div>
  </div>
</template>

<script>
import CommonHeader from "../../components/CommonHeader.vue";
import { editPassword, getVerifyCode, setPwd } from "../../server";
export default {
  components: { CommonHeader },
  name: "SetPwd",
  data() {
    return {
      payPwd: "",
      payPwdAgin: "",
      verifyCode: "",
      visiable: false,
      newPwd: "",
    };
  },
  methods: {
    async onSubmit() {
      if (!this.payPwd.length) return this.$toast("请输入支付密码");
      if (!this.payPwdAgin.length) return this.$toast("请再次输入密码");
      if (!this.verifyCode.length) return this.$toast("请输入验证码");
      if (this.$route.query.type === "0") {
        if (this.payPwd !== this.payPwdAgin)
          return this.$toast("两次密码输入不同");
        await setPwd(this.getAddress, this.verifyCode, this.payPwd);
        this.$router.push("/home");
      }
      if (this.$route.query.type === "1") {
        if (this.newPwd !== this.payPwdAgin)
          return this.$toast("两次密码输入不同");
        const editResult = await editPassword(
          this.getAddress,
          this.verifyCode,
          this.payPwd,
          this.newPwd
        );
        if (editResult) this.$toast("修改成功");
      }
    },
    async getVerifyCodeImg() {
      const data = await getVerifyCode(this.getAddress, 7);
      this.$nextTick(() => {
        this.$refs.domVerify.innerHTML = data;
      });
    },
  },
  created() {
    this.getVerifyCodeImg();
  },
};
</script>
<style lang="less" scoped>
.set-pwd {
  width: 100%;
  height: 100%;
  .form {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    box-sizing: border-box;
    padding: 15px;
    .pay-pwd,
    .pay-again {
      font-size: 15px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #1e262f;
      width: 100%;
      border-bottom: 1px solid #0291ff;
      box-sizing: border-box;
      padding-bottom: 10px;
      .input {
        margin-left: 70px;
        width: 162px;
        border: none;
      }
      .input::placeholder {
        color: #abafb9;
      }
      .iconkejian {
        font-size: 15px;
        color: #0291ff;
      }
    }
    .pay-again {
      box-sizing: border-box;
      padding-top: 10px;
    }
    .verify-code {
      box-sizing: border-box;
      padding-top: 10px;
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      font-size: 15px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #1e262f;
      .inputs {
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;
        .input-verify {
          border: none;
          width: 205px;
          height: 31px;
          background: #e8ecf1;
          opacity: 1;
          border-radius: 5px;
          box-sizing: border-box;
          padding-left: 5px;
        }
        .verify-img {
          margin-top: 10px;
          width: 206px;
          height: 60px;
          background: #e8ecf1;
          opacity: 1;
          border-radius: 5px;
          text-align: center;
          line-height: 60px;
        }
        a {
          position: absolute;
          bottom: 0;
          left: -50px;
          font-size: 12px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #0291ff;
          text-decoration: underline;
        }
      }
    }
    .tips {
      box-sizing: border-box;
      padding-top: 10px;
      font-size: 12px;
      font-family: "PingFang SC";
      font-weight: 400;
      line-height: 17px;
      color: #7c7e82;
      .icongantanhaotishi {
        font-size: 16px;
        color: #0291ff;
      }
      p {
        margin-bottom: 5px;
      }
    }
    .confirm-btn {
      border: none;
      width: 345px;
      height: 45px;
      background: linear-gradient(90deg, #2ebef3 0%, #007eff 100%);
      box-shadow: 0px 3px 6px rgba(2, 145, 255, 0.15);
      opacity: 1;
      border-radius: 23px;
      font-size: 18px;
      font-family: "PingFang SC";
      font-weight: bold;
      line-height: 45px;
      text-align: center;
      color: #ffffff;
      margin-top: 250px;
    }
  }
}
</style>
