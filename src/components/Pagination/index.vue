<template>
  <div class="pagination">
    <button :disabled="pageNo===1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-show="startNumAndEndNum.start!==1" @click="$emit('getPageNo',1)">1</button>
    <button v-show="startNumAndEndNum.start>2" @click="$emit('getPageNo',pageNo-5)">···</button>

    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-show="page>=startNumAndEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>

    <button v-show="totlePage-startNumAndEndNum.end>1" @click="$emit('getPageNo',pageNo+5)">···</button>
    <button v-show="startNumAndEndNum.end<totlePage" @click="$emit('getPageNo',totlePage)">{{ totlePage }}</button>
    <button  @click="$emit('getPageNo',pageNo+1)" :disabled="pageNo===totlePage">下一页</button>

    <button style="margin-left: 30px">共{{ totle }}条</button>
    <h2>起始{{ startNumAndEndNum.start }}结束{{ startNumAndEndNum.end }}
        当前页{{pageNo}}连续页{{continues}}</h2>
  </div>
</template>
  
  <script>
export default {
  name: "Pagination",
  props:['continues','totle','pageSize','pageNo'],
  computed:{
    totlePage(){
        return Math.ceil(this.totle/this.pageSize)
    },
    startNumAndEndNum(){
        // 先定义两个变量存储起始数字与结束数字
        let start = 0, end = 0
        // 连续页码数字5，不够5页属于不支持现象
        if(this.continues>this.totle){
            start = 1
            end = this.totlePage
        }else{
            // 正常现象【连续页码5，总页数大于5】
            // 起始数字
            start = this.pageNo - Math.floor(this.continues/2)
            // 结束数字
            end = this.pageNo + Math.floor(this.continues/2)
            // 出现不正常现象[statrt为0负数]
            if(start < 1){
                start = 1
                end = this.continues
            }
            // 末尾出现不正常现象，大于页数
            if(end > this.totlePage){
                end = this.totlePage
                start = this.totlePage - this.continues + 1
            }
        }
        return {start,end}
    }
  }
};
</script>
  
  <style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
  