
import router from '../router';
<!-- 这里是首页页面入口 -->
<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <!-- 左侧布局 -->
      <common-aside />
      <!-- 右侧布局 -->
      <el-container>
        <common-header />
        <common-tab />
        <el-main class="right-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import CommonHeader from '../components/CommonHeader.vue';
import CommonAside from '../components/CommonAside.vue';
import CommonTab from '../components/CommonTab.vue';
export default defineComponent({
  commonets: {
    CommonHeader,
    CommonAside,
    CommonTab,
  }
});
</script>

<style lang="less" scoped>
.el-container {
  flex-wrap: wrap;
  align-items: flex-start;
  height: 100%;
}

.common-layout {

  .lay-container {
    flex-wrap: nowrap;

    .right-main {
      height: 100%;
      height: calc(100% -120px) !important;

    }

  }

  height: 100%;

  &>.el-container {
    height: 100%;

    &>.el-aside {
      height: 100%;
      background: #545c64;
    }
  }
}
</style>