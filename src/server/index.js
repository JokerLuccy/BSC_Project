import http from "../utils/http";
function checkRegister(address) {
  return http.post("/user/checkRegister", { address });
}
export { checkRegister };
