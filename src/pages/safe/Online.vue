<template>
    <div id="safe-online-main">
        <div class="safe-online-main-left">
            <el-card>
                <el-upload
                    list-type="picture-card"
                    :auto-upload="false"
                    action="#"
                    multiple
                    :file-list="fileList"
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
            <el-button type="primary" @click="handleUpload">上传并分析</el-button>
        </div>
        <div class="safe-online-main-right">
            <el-card>ss</el-card>
        </div>
    </div>
</template>

<script>
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue'
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
            fileList: [],
            fileData: [],
            upload: ref()
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
        handleUpload() {
            console.log(this.fileList);
            let formData = new FormData()
            this.fileList.forEach(file => {
                formData.append('file', file)
            });
            console.log(formData)
            fetch("http://localhost:3000/serve/upload", {
                method: 'POST',
                body: formData
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
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
