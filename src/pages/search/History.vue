<template>
    <div>
        <el-card>
            <el-form :inline="true">
                <el-form-input>
                    <el-input v-model="filePath" type="textarea" @paste="handlePaste" />
                </el-form-input>
                <el-form-input>
                    <el-button type="primary" @click="handleRelease" :disabled="buttonDisable">分析</el-button>
                    <el-button type="primary" @click="handleReset" :disabled="buttonDisable">重置</el-button>
                </el-form-input>
            </el-form>
        </el-card>

        <el-card>
            <el-table :data="getCurrentPageData" style="width: 100%" v-loading="isLoad">
                <el-table-column type="index" />
                <el-table-column prop="number" label="异常人员数量" />
                <el-table-column prop="xyxy" label="图像坐标" />
                <el-table-column prop="video_time" label="事件发生时间点" />
                <el-table-column prop label="结果">
                    <template #default="scope">
                        <el-button @click="handleDetail(scope.row.deal_pic)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                :page-size="15"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="$store.state.safeData.total"
                @current-change="handleChangePage"
            />
        </el-card>
        <el-dialog v-model="detailFlag" title="分析结果图像" width="60%" :append-to-body="true">
            <el-row :gutter="20">
                <el-col>
                    结果图
                    <el-image :src="deal_pic"></el-image>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
import { ElMessage } from "element-plus";
import { ref } from "vue"
import api from '../../serve/api'
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
            deal_pic: ref(""),
            currentPage: ref(1),
            currentEnv,
            filePath: '',
            buttonDisable:ref(false),
            isLoad:ref(false)
        }
    },
    computed: {
        getCurrentPageData() {
            if (this.$store.state.safeData.length == 0) {
                return []
            } else {
                return this.$store.state.safeData.list.slice((this.currentPage - 1) * 15, this.currentPage * 15)
            }
        }
    },
    methods: {
        handleDetail(deal_pic) {
            this.deal_pic = this.currentEnv + deal_pic
            this.detailFlag = !this.detailFlag
        },
        handleChangePage(newPage) {
            this.currentPage = newPage
        },
        handlePaste(val) { console.log(val); console.log(this.filePath); },
        handleRelease() {
            this.buttonDisable=true;
            this.isLoad=true;
            api.uploadSafeFilePath(this.filePath).then(res => {
                console.log(res)
                api.getSafeFile()
                this.buttonDisable=false;
                this.isLoad=false;
            }).catch(err => {
                this.buttonDisable=false;
                this.isLoad=false;
                ElMessage({
                    type: 'warning',
                    message: err,

                })
            })
        },
        handleReset() {
            this.filePath = '';
            this.$store.commit('setSafeDataData', [])
        }
    }
}
</script>
<style lang='less' scoped>
.el-card {
    margin: 5px;
    .el-button {
        margin-top: 5px;
    }
}
</style>