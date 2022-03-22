<template>
    <div id="safe-online-main">
        <div class="safe-online-main-left">
            <el-card>
                <el-upload
                    list-type="picture-card"
                    :auto-upload="false"
                    action="#"
                    :http-request="uploadFile"
                    multiple
                    :file-list="fileList"
                    ref="upload"
                    on-success="handleUploadSuccess"
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
        <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <div class="safe-online-main-center">
            <el-button type="primary" @click="handleRelease">分析</el-button>
        </div>
        <div class="safe-online-main-right">
            <el-card>ss</el-card>
        </div>
    </div>
</template>

<script>
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
export default {
    name: "safe-online",
    components: {
        Plus,
        ZoomIn,
        Delete,
    },
    data() {
        return {
            dialogImageUrl: ref(''),
            dialogVisible: ref(false),
            disabled: ref(false),
            fileSizeIsSatisfy: false,
            fileList: [],//前端本地组件upload获得的待上传文件列表
            fileData: '',//用于向后端统一接口传送保存文件数据
            upload: ref(),
            baseApi: ref('http://api.serve.demo:3000')
        }
    },
    methods: {
        handleRemove(file) {
            console.log(file);
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
                this.$refs.upload.submit();
                fetch(this.baseApi + '/serve/upload', this.fileData).then(res => { console.log(res) }).catch(err => { console.log(err) })
            }
            //this.$refs.upload.submit();
        },
        uploadFile(file) {
            this.fileData.append('files', file.file)
        }

    }
}
</script>

<style lang="less">
#safe-online-main {
    width: 100%;
    display: flex;
    .safe-online-main-left,
    .safe-online-main-right {
        width: 47%;
    }
    .safe-online-main-center {
        width: 6%;
        display: flex;
        .el-button {
            margin: auto;
        }
    }
}
</style>
