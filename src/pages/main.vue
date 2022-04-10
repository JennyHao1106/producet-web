<template>
    <div id="entry">
      <div class="main-pane">
        <el-row :gutter="20">
          <el-col :span="12"><el-button type="text" size="large" @click="open('safe')">安全生产预警管控平台</el-button></el-col>
          <el-col :span="12"><el-button type="text" size="large" @click="open('search')">复合材料自动铺丝机缺陷检测</el-button></el-col>
        </el-row>       
      </div>
    </div>
</template>

<script>

export default {
  name: 'main',
  methods:{
    open(flag){
      if(flag=='safe'){
        this.$router.replace("safe")
      }else{
        this.$router.replace("search")
      }
    }
  }
}
</script>

<style lang="less">
#entry {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: url("~@/assets/background.jpg");
  background-size:cover;
  display:flex;
  .main-pane{
    margin: auto;
     width: 500px;
    .el-button{
      color: aliceblue;
      font-size: 24px;
    }
  }
}

</style>
