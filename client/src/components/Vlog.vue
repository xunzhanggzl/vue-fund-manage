<template>
  <div class="">
    <el-dialog
      title="添加资金信息"
      :visible.sync="vlog.show"
      :close-on-click-modal=false
      :modal-append-to-body=false
      :close-on-press-escape=false
    >
      
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'vlog',
  data() {
    return {
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      format_type_list:[
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
    }
  },
  props: {
    vlog: Object
  }
}
</script>

<style scoped>

</style>