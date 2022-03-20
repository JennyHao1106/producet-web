<template>
    <div id="safe-online-main">
        <div class="safe-online-main-left">
            <el-upload list-type="picture" :auto-upload="false" action="#">
                <template #default>
                    <el-icon>
                        <Plus />
                    </el-icon>
                </template>
                <template #file="{ file }">
                    <div>
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                        <span class="el-upload-list__item-actions">
                            <span
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
                                @click="handleDownload(file)"
                            >
                                <el-icon>
                                    <Download />
                                </el-icon>
                            </span>
                            <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleRemove(file)"
                            >
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </span>
                        </span>
                    </div>
                </template>
            </el-upload>
        </div>
        <el-divider direction="vertical" />
        <div class="safe-online-main-right">bb</div>
    </div>
</template>

<script>
import { Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
export default {
    name: "safe-online",
    components: {
        Plus,
        ZoomIn,
        Download,
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
        finish: function () {
            this.fileData = new FormData();
            this.$refs.upload.submit();
            this.$axios
                .post("http://请求的地址", this.fileData)
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        this.$message({
                            message: "上传成功",
                            type: "success",
                        });
                    }
                });
        },
        uploadFile: function (file) {
            this.fileData.append("file", file.file);
        },

    }
}
</script>

<style lang="less">
#safe-online-main {
    width: 100%;
    display: flex;
    .safe-online-main-left,
    .safe-online-main-right {
        width: 50%;  
    }
    .safe-online-main-left{
        .el-upload-list__item-thumbnail{
            width: 100%;
        }
    }
}
</style>
