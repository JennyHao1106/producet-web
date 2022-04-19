<template>
    <div id="safe-online-main">
        <div class="safe-online-main-left">
            <el-card>
                <el-row>一次最多上传10张图片，格式必须为.jpg, .jpeg, .png</el-row>
                <br />
                <el-upload
                    list-type="picture-card"
                    :auto-upload="false"
                    action="#"
                    multiple
                    :file-list="fileList"
                    ref="upload"
                    :on-success="handleUploadSuccess"
                    accept=".jpg, .jpeg, .png"
                    :disabled="isUpload"
                    limit="10"
                    :on-exceed="handleExceed"
                >
                    <template #default>
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </template>
                    <template #file="{ file }">
                        <div class="el-upload-list__item">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                            <span class="el-upload-list__item-actions">
                                <span
                                    v-if="!disabled"
                                    class="el-upload-list__item-preview"
                                    @click="handlePictureCardPreview(file)"
                                >
                                    <el-icon>
                                        <zoom-in />
                                    </el-icon>
                                </span>
                                <span
                                    v-if="!disabled"
                                    class="el-upload-list__item-delete"
                                    @click="handleRemove(file)"
                                >
                                    <el-icon>
                                        <delete />
                                    </el-icon>
                                </span>
                            </span>
                        </div>
                    </template>
                </el-upload>
            </el-card>
        </div>
        <!-- <el-dialog v-model="isUpload">
            <img width="500" :src="dialogImageUrl" alt fit="contain" />
        </el-dialog>-->
        <div class="safe-online-main-center">
            <el-row>
                <el-button type="primary" @click="handleRelease" :disabled="buttonDisable">分析</el-button>
            </el-row>
            <el-row>
                <el-button type="primary" @click="handleReset" :disabled="buttonDisable">重置</el-button>
            </el-row>
        </div>
        <div class="safe-online-main-right">
            <el-card v-loading="isLoad">        
                <el-carousel :interval="5000" arrow="always" height="85vh">
                    <el-carousel-item v-for="item in dealFileList" :key="item">
                        <el-image :src="currentEnv + item.deal_pic" fit="scale-down"></el-image>
                        <el-descriptions title="检测结果">
                            <el-descriptions-item label="缺陷个数">{{ item.number }}</el-descriptions-item>
                            <el-descriptions-item
                                label="缺陷种类"
                            >{{ item.classes == '' ? '' : baseFun.chageClassCodeToName(item.classes) }}</el-descriptions-item>
                            <el-descriptions-item label="缺陷位置">{{ item.xyxy }}</el-descriptions-item>
                            <el-descriptions-item label="检测耗时">{{ item.spend_time }}ms</el-descriptions-item>
                        </el-descriptions>
                    </el-carousel-item>
                </el-carousel>
            </el-card>
        </div>
    </div>
</template>

<script>
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import api from '../../serve/api'
import baseFun from '../../serve/baseFun'
//import { UploadInstance } from 'element-plus'
export default {
    name: "safe-online",
    components: {
        Plus,
        ZoomIn,
        Delete,
    },
    watch: {
        imgHeight() { }
    },
    data() {
        let currentEnv = '';
        if (process.env.NODE_ENV == "development") {
            currentEnv = "http://localhost:3000/";
        } else {
            currentEnv = "http://api.safe.demo:3000/";
        }
        return {
            dialogImageUrl: ref(''),
            dialogVisible: ref(false),
            disabled: ref(false),
            fileSizeIsSatisfy: false,
            fileList: [],//前端本地组件upload获得的待上传文件列表
            fileData: '',//用于向后端统一接口传送保存文件数据
            upload: ref(),
            dealFileList: [],
            currentEnv,
            imgHeight: '300px',
            baseFun,
            isUpload: ref(false),
            buttonDisable: ref(false),
            isLoad:ref(false)
        }
    },
    methods: {
        //删除图片
        handleRemove(file) {
            let delFileList = [];
            this.fileList.forEach(item => {
                if (item.uid != file.uid) {
                    delFileList.push(item)
                }
            });
            this.fileList = delFileList;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        /**
         * @description 上传图片至服务器
         */
        handleRelease() {
            if (this.fileList.length == 0) {
                ElMessage({
                    type: 'warning',
                    message: '请选择需要上传的图片',
                    showClose: true
                })
            } else {
                this.buttonDisable = true;
                this.isLoad=true;
                let formData = new FormData();
                this.fileList.forEach(item => {
                    // console.log("formdata append");
                    formData.append("file", item.raw)
                });
                let that = this;
                this.isUpload = true
                // console.log("fileList",this.fileList);
                // console.log("formData:",formData);
                api.deleteDir().then(() => {
                    api.uploadFile(formData).then(res => {
                        that.dealFileList = res.data.data.list;
                        that.buttonDisable = false;
                        this.isLoad=false;
                    }).catch(err => {
                        ElMessage({
                            type: 'error',
                            message: err.msg,
                            showClose: true
                        })
                        that.buttonDisable = false;
                        this.isLoad=false;
                    })
                }).catch(err => { console.log(err); this.buttonDisable = false; this.isLoad=false;});
            }
        },
        handleReset() {
            this.isUpload = false;
            this.fileList = [];
            this.dealFileList = [];
        },
        handleExceed() {
            ElMessage({
                type: 'error',
                message: "一次做多只能上传10张",
                showClose: true
            })
        }

    }
}
</script>

<style lang="less" scoped>
#safe-online-main {
    width: 100%;
    display: flex;
    height: 100%;
    .safe-online-main-left,
    .safe-online-main-right {
        width: 47%;
        height: 100%;
        .el-card {
            bottom: 5px;
        }
    }
    .safe-online-main-right {
        .el-image {
            max-height: 600px;
            max-width: 600px;
        }
    }
    .safe-online-main-center {
        width: 6%;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* center代表水平方向 */
        justify-content: center;
        .el-button {
            margin-bottom: 10px;
        }
    }
}
</style>
