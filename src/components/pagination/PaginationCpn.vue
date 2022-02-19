<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo == 1}">1</button>
    <button v-if="pageNo >= continues">···</button>

    <!-- 中 -->
    <button v-for="(page,index) in startNumAndEndNum.end" 
      :key="index" v-if="page >= startNumAndEndNum.start" 
      @click="$emit('getPageNo',page)"
      :class="{active: pageNo==page}">
      {{page}}
    </button>
    
    <!-- 下 -->
    <button v-if="pageNo <= totalPage - continues + 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage " @click="$emit('getPageNo',totalPage)" :class="{active: pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo',pageNo + 1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
    <h3>{{startNumAndEndNum}}----当前页码数 {{pageNo}}</h3>
  </div>
</template>

<script>
  export default {
    name: "PaginationCpn",
    props: ['pageNo','pageSize','total','continues'],
    computed: {
      // 计算分页器页数
      totalPage(){
        // 避免出现小数,向上取整
        return Math.ceil(this.total/this.pageSize);
      },
      // 计算出连续页码的起始页码与结束页码
      startNumAndEndNum(){
        // 定义两个变量用于存储起始页码与结束页码
        let start = 0;
        let end = 0;
        // 连续页数至少为5页,判断总页数够不够 continues 页
        if(this.continues > this.totalPage){ //不够(非正常情况)
          start = 1;
          end = this.totalPage;
        }else{//够(正常情况)
          start = this.pageNo - parseInt(this.continues/2);
          end = this.pageNo + parseInt(this.continues/2);
          // 纠正start出现0与负数的情况: 例如: pageNo为1 页码数为 -1 0 1 2 3 start < 1
          if(this.pageNo <= parseInt(this.continues/2)){
            start = 1;
            end = this.continues;
          }
          // 纠正end出现超出最大页数的情况 例如: totalPage为31 pageNo为31 页码数为 29 30 31 32 33 end > this.totalPage
          if(this.pageNo >= this.totalPage - 1){
            end = this.totalPage;
            start = this.totalPage - this.continues + 1;
          }
        }
        return {start,end}
      },
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
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
        background-color: #ff6700;
        color: #fff;
      }
    }
  }
</style>
