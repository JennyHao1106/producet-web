<template>
    <div>
        <el-table :data="tableData" height="250" style="width: 100%">
            <el-table-column type="index"   label="编号"/>
            <el-table-column prop="number" label="缺陷个数" />
            <el-table-column prop="classes" label="缺陷种类"  />
            <el-table-column prop="xyxy" label="缺陷位置" />
            <el-table-column prop="" label="比对结果"  />
        </el-table>
    </div>
</template>
<script>import { ref } from "vue"

export default {
    name: '',
    data() {
        return {
            tableData: ref([])
        }
    },
    methods: {
    }
}
</script>
<style lang='less'>
</style>