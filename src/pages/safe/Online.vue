<template>
    <div class="demo-image__placeholder">
        <div class="block">
            <span class="demonstration">原图</span>
            <el-image :src="srcOriginal" />
        </div>
        <div class="block">
            <span class="demonstration">结果图</span>
            <el-image :src="srcDeal">
                <template #placeholder>
                    <div class="image-slot">
                        Loading
                        <span class="dot">...</span>
                    </div>
                </template>
            </el-image>
            <el-descriptions title="检测结果">
                <el-descriptions-item label="缺陷个数">{{ currentData.number }}</el-descriptions-item>
                <el-descriptions-item
                    label="缺陷种类"
                >{{currentData.classes==''?'':baseFun.chageClassCodeToName(currentData.classes) }}</el-descriptions-item>
                <el-descriptions-item label="缺陷位置">{{ currentData.xyxy }}</el-descriptions-item>
                <el-descriptions-item label="检测耗时">{{ currentData.spend_time }}ms</el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>
<script>
import { ref } from "vue"
import baseFun from '../../serve/baseFun'
export default {
    name: '',
    data() {
        let currentEnv = '';
        if (process.env.NODE_ENV == "development") {
            currentEnv = "http://localhost:3000/";
        } else {
            currentEnv = "http://api.safe.demo:3000/";
        }
        return {
            tableData: ref([]),
            currentEnv,
            baseFun
        }
    },
    computed: {
        currentData() {
            let obj = {
                classes:''
            };
            if (this.$store.state.fcData.length !== 0) {
                obj = this.$store.state.fcData.list[0]
            }
            return obj;
        },
        srcOriginal() {
            let src = ""
            if (this.$store.state.fcData.length !== 0) {
                src = this.currentEnv + this.$store.state.fcData.list[0].original_pic
            }
            return src;
        },
        srcDeal() {
            let src = ""
            if (this.$store.state.fcData.length !== 0) {
                src = this.currentEnv + this.$store.state.fcData.list[0].deal_pic
            }
            return src;
        }
    },
    methods: {
    }
}
</script>
<style lang='less' scoped>
.demo-image__placeholder {
    .block {
        padding: 30px 0;
        text-align: center;
        border-right: solid 1px var(--el-border-color);
        display: inline-block;
        width: 49%;
        box-sizing: border-box;
        vertical-align: top;
    }
    .demonstration {
        display: block;
        color: var(--el-text-color-secondary);
        font-size: 14px;
        margin-bottom: 20px;
    }
    .el-image {
        padding: 0 5px;
        max-width: 600px;
        max-height: 600px;
    }
    .el-descriptions{
        margin-left: 10px;
    }
    .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: var(--el-fill-color-light);
        color: var(--el-text-color-secondary);
        font-size: 14px;
    }
    .dot {
        animation: dot 2s infinite steps(3, start);
        overflow: hidden;
    }
}
</style>