
import router from '../router';
<!-- 这里是首页页面入口 -->
<template>
    <div class="common-layout">
    <el-container >
    
      <common-aside />
      <el-container >
        <common-header/>
        <el-main>
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
export default defineComponent({
  commonets:{
    CommonHeader,
    CommonAside,
  }
});
</script>

<style lang="less" scoped>
.el-container{
  flex-wrap: wrap;
  align-items: flex-start;
}
.common-layout{
  height: 100%;
  & > .el-container {
    height: 100%;
    & >.el-aside {
      height: 100%;
      background: #545c64;
    }
  }
}
</style>