<template>
    <div id="safe-main">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="在线检测" name="online">
                <safeOnline></safeOnline>
            </el-tab-pane>
            <el-tab-pane label="在线历史记录" name="online-history">
                <safeHistory></safeHistory>
            </el-tab-pane>
            <el-tab-pane label="本地数据检测" name="local">
                <safeLocal></safeLocal>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { ref } from "vue"
import safeOnline from "./Online.vue"
import safeHistory from "./History.vue"
import safeLocal from './Local.vue'
import api from '../../serve/api'
export default {
    name: "safe",
    components: {
        safeOnline,
        safeHistory,
        safeLocal,
    },
    mounted() {
        api.queryFCData();
    },
    unmounted() {
        clearInterval(this.timer);
    },
    data() {
        return {
            activeName: ref('online'),
            timer: setInterval(() => {
                api.queryFCData();
            }, 1000)
        }
    },
    methods: {
        handleClick(tabName) {
            this.activeName = tabName.paneName
        }
    }
}
</script>

<style lang="less" scoped>
#safe-main {
    margin: 5px;
    .el-tabs__header {
        background-color: #545c64;
        padding: 10px 5px;
        .el-tabs__active-bar {
            background-color: #ffd04b;
        }
        .el-tabs__item {
            color: white;
            :hover {
                color: #ffd04b;
            }
        }
        .is-active {
            color: #ffd04b;
        }
    }
}
</style>
