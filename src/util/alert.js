import Vue from "vue"
var vm=new Vue();
//成功弹框
export const successAlert = (msg)=>{
    vm.$message({
        message: msg,
        type: 'success'
    });
}

//警告弹框
export const warningAlert = (msg)=>{
    vm.$message({
        message: msg,
        type: 'warning'
    });
}

//错误弹框
export const errorAlert = (msg)=>{
    vm.$message.error(msg);
}
//删除确认弹框
export const  deleteAlert = ()=>{
    vm.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
}
