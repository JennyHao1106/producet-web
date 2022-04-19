<template>
    <div id="common-main">
       <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="在线历史记录" name="online-history">
                <searchHistory></searchHistory>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import searchHistory from "./History.vue"
export default {
    components:{
        searchHistory
    },
    data(){
        return{
            activeName:'online-history'
        }
    }
}
</script>

<style lang="less">
</style>
