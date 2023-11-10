
<template>
    <div class="tags">
        <el-tag 
            :key="tag.name" 
            v-for="(tag, index) in tags" 
            :closable="tag.name !== 'home'" 
            :disable-transitions="false"
            :effect="$route.name === tag.name ? 'dark' : 'plain'"
        >{{tag.lable}}</el-tag>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import store from '../store';
export default {
    setup() {
        const store = useStore();
        const tags = store.state.tabsList;

        return {
            tags,
        }
    },
};
</script>

<style lang="less" scoped>
.tags{
    padding-top: 10px;
    padding-left: 10px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>