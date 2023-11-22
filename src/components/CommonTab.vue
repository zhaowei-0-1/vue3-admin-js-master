
<!-- <template>
    <div class="tags">
        <el-tag :key="tag.name" v-for="(tag, index) in tags" :closable="tag.name !== 'home'" :disable-transitions="false"
            :effect="$route.name === tag.name ? 'dark' : 'plain'" @click="changeMenu(tag)" @close="handleClose(tag, index)">
            {{ tag.lable }}
        </el-tag>
    </div>
</template> -->

<script>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const tags = store.state.tabsList;
        const changeMenu = (item) => {
            router.push({ name: item.name });
        };
        const handleClose = (tag, index) => {
            let length = tag.length - 1;
            // 处理vuex中的tabsList
            store.commit("closeTab", tag);
            // 
            if (tag.name !== route.name) {
                return;
            }
            if (index === length) {
                router.push({
                    name: tags[index - 1].name,
                });
            } else {
                // tag删除 页面路径不变的处理
                router.push({
                    name: tags[index].name,
                })
            }
        }


        return {
            tags,
            changeMenu,
            handleClose,
        }
    },
};
</script>

<style lang="less" scoped>
.tags {
    padding-top: 10px;
    padding-left: 10px;
    // padding: 20px;
    width: 100%;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>