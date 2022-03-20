<template>
    <div id="safe-main">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="在线检测" name="online">
                <safeOnline></safeOnline>
            </el-tab-pane>
            <el-tab-pane label="历史记录" name="history">
                <safeHistory></safeHistory>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { ref } from "vue"
import safeOnline from "./Online.vue"
import safeHistory from "./History.vue"
export default {
    name: "safe",
    components: {
        safeOnline,
        safeHistory
    },
    data() {
        return {
            activeName: ref('online')
        }
    },
    methods: {
        handleClick(tabName) {
            this.activeName = tabName.paneName
        }
    }
}
</script>

<style lang="less">
#safe-main {
    margin: 5px;
}
</style>
