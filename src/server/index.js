import http from "../utils/http";
// 检查是否注册
function checkRegister(address) {
  return http.post("/user/checkRegister", { address });
}
// 获取验证码 1注册,2反馈,6申请节点,7设置/修改密码
function getVerifyCode(address, type) {
  return http.post("/user/getVerifyCode", { address, type });
}
// 注册
function register(address, verifyCode, refCode) {
  return http.post("/user/register", { address, verifyCode, refCode });
}
// 获取用户信息
function userInfo(address) {
  return http.post("/user/getUserInfo", { address });
}
/* 问题反馈 */
function getFeedBackList() {
  return http.post("/feedback/category/list", {});
}
// 添加用户反馈
function addFeedBack(category, address, content, verifyCode) {
  return http.post("/feedback/add", { category, address, content, verifyCode });
}
// 获取用户反馈列表
function getQuestionList(address, current = 1) {
  return http.post("/feedback/list", { address, current, limit: 30 });
}
// 获取反馈详情
function getFeedBackDetail(address, id) {
  return http.post("/feedback/detail", { address, id });
}
// 删除反馈
function delFeedBack(id) {
  return http.post("/feedback/delete", { id });
}
/* 密码 */
function setPwd(address, verifyCode, password) {
  return http.post("/user/setPassword", { address, verifyCode, password });
}
/* 产品 */
function minerBuyList() {
  return http.post("/wallet/minerBuyList", {});
}
// 购买
function buyMiner(address, usdtHash, id, num) {
  return http.post("/wallet/buyMiner", { address, usdtHash, id, num });
}
// 游戏资产
function myMinePlay(address) {
  return http.post("/wallet/myMinePlay", { address });
}
// 提取
function extract(address, id) {
  return http.post("/wallet/extract", { address, id });
}
// 获取余额
function getBalance(address, asset) {
  return http.post("/wallet/getBalance", { address, asset });
}
// 获取提现手续费
function getWithdrawFee(asset) {
  return http.post("/wallet/getWithdrawRate", { asset });
}
// 提现
function withdraw(addressTo, asset, amount, password, address) {
  return http.post("/wallet/withdraw", {
    addressTo,
    asset,
    amount,
    password,
    address,
  });
}
// 邀请好友列表
function recommendUsers(address) {
  return http.post("/user/recommendUsers", { address, current: 1, limit: 30 });
}
export {
  recommendUsers,
  withdraw,
  getWithdrawFee,
  getBalance,
  extract,
  myMinePlay,
  buyMiner,
  minerBuyList,
  setPwd,
  delFeedBack,
  getFeedBackDetail,
  getQuestionList,
  checkRegister,
  getVerifyCode,
  register,
  userInfo,
  getFeedBackList,
  addFeedBack,
};
