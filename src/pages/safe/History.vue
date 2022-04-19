<template>
    <div>
        <el-card>
            <el-table :data="getCurrentPageData" style="width: 100%">
                <el-table-column type="index" />
                <el-table-column prop="number" label="缺陷个数" />
                <el-table-column label="缺陷种类">
                    <template #default="scope">
                        <div>{{scope.row.classes==''?'': baseFun.chageClassCodeToName(scope.row.classes) }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="xyxy" label="缺陷位置" />
                <el-table-column prop="spend_time" label="检测耗时" />
                <el-table-column prop label="比对结果">
                    <template #default="scope">
                        <el-button
                            @click="handleDetail(scope.row.original_pic, scope.row.deal_pic)"
                        >查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                :page-size="15"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="$store.state.fcData.total"
                @current-change="handleChangePage"
            />
        </el-card>
        <el-dialog v-model="detailFlag" title="分析结果图像" width="60%" :append-to-body="true">
            <el-row :gutter="20">
                <el-col :span="10">
                    原图
                    <el-image :src="original_pic"></el-image>
                </el-col>
                <el-col :span="10">
                    结果图
                    <el-image :src="deal_pic"></el-image>
                </el-col>
            </el-row>
        </el-dialog>
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
            detailFlag: ref(false),
            original_pic: ref(""),
            deal_pic: ref(""),
            baseFun,
            currentPage: ref(1),
            currentEnv
        }
    },
    computed: {
        getCurrentPageData() {
            if (this.$store.state.fcData.length == 0) {
                return []
            } else {
                return this.$store.state.fcData.list.slice((this.currentPage - 1) * 15, this.currentPage * 15)
            }
        }
    },
    methods: {
        handleDetail(original_pic, deal_pic) {
            this.original_pic = this.currentEnv + original_pic
            this.deal_pic = this.currentEnv + deal_pic
            this.detailFlag = !this.detailFlag
        },
        handleChangePage(newPage) {
            console.log(newPage)
            this.currentPage = newPage
        }
    }
}
</script>
<style lang='less'>
</style>