<template>
  <div class="invite">
    <common-header title="邀请好友" />
    <InviteDescription />
    <img
      class="invite-sign"
      v-lazy="require('../../assets/images/invite-sign.png')"
      alt=""
    />
    <refer-link />
    <inviet-table />
  </div>
</template>

<script>
import CommonHeader from "../../components/CommonHeader.vue";
import InviteDescription from "./description.vue";
import InvietTable from "./InvietTable.vue";
import ReferLink from "./ReferLink.vue";
export default {
  components: { CommonHeader, InviteDescription, ReferLink, InvietTable },
  name: "Invite",
};
</script>

<style lang="less" scoped>
.invite {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 30px;
  .invite-sign {
    width: 100%;
    height: 139px;
    flex-shrink: 0;
  }
}
</style>
