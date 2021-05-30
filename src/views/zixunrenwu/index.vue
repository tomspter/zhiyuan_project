<template>
  <d2-container>
    <template slot="header">
      <el-button type="primary" icon="el-icon-search" size="small">查找</el-button>
      <el-button type="primary" icon="el-icon-setting" size="small" @click="startZiXun">开始咨询</el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small">刷新</el-button>
    </template>
    <el-table :data="initData" highlight-current-row style="width: 100%"
              @current-change="handleCurrentChange" >
      <el-table-column prop="ks_ksh" label="考生号" sortable="custom"></el-table-column>
      <el-table-column prop="ks_xm" label="姓名" sortable="custom"></el-table-column>
      <el-table-column prop="ks_xbdm" label="性别" sortable="custom" :formatter="formatKsXbdm"></el-table-column>
      <el-table-column prop="ks_lxdh" label="联系电话" sortable="custom"></el-table-column>
      <el-table-column prop="xkkmmc" label="选考科目" sortable="custom"></el-table-column>
      <el-table-column prop="zf" label="总分" sortable="custom"></el-table-column>
      <el-table-column prop="yw" label="语文" sortable="custom"></el-table-column>
      <el-table-column prop="sx" label="数学" sortable="custom"></el-table-column>
      <el-table-column prop="wy" label="英语" sortable="custom"></el-table-column>
      <el-table-column prop="wl" label="物理" sortable="custom"></el-table-column>
      <el-table-column prop="hx" label="化学" sortable="custom"></el-table-column>
      <el-table-column prop="sw" label="生物" sortable="custom"></el-table-column>
      <el-table-column prop="zz" label="政治" sortable="custom"></el-table-column>
      <el-table-column prop="ls" label="历史" sortable="custom"></el-table-column>
      <el-table-column prop="dl" label="地理" sortable="custom"></el-table-column>
      <el-table-column prop="consult_status" label="咨询状态" sortable="custom"
                       :formatter="formatConsultStatus"></el-table-column>
    </el-table>
    <el-pagination background
                   layout="total, sizes, prev, pager, next, jumper"
                   :page-size="rows"
                   @size-change="handleSizeChange"
                   @current-change="handlePaginationChange"
                   :page-sizes="[5, 10, 20, 25]"
                   :total="total" style="margin-top: 10px"></el-pagination>
  </d2-container>
</template>

<script>
import api from '@/api'

export default {
  name: 'zixunrenwu',
  data () {
    return {
      initData: [],
      total: 0,
      page: 1,
      rows: 25,
      sort: 'id',
      order: 'asc',
      currentRow: '',
      dialogVisible: false,
      fenpeiDialogVisible: false,
      fenpeiOption: [],
      fenpeiForm: {
        zxs: null
      },
      form: {
        id: '',
        name: '',
        tel: '',
        xb: ''
      }
    }
  },
  methods: {
    async initPage () {
      const data = {
        page: this.page,
        rows: this.rows,
        sort: this.sort,
        order: this.order,
        user_id: 1
      }
      const res = await api.KS_CONSULT_LIST(JSON.stringify(data))
      console.log(JSON.stringify(data))
      this.total = res.total
      this.initData = res.rows
    },
    formatConsultStatus: function (row, column) {
      return row.consult_status === 1 ? '开始' : row.consult_status === 0 ? '未开始' : '未知'
    },
    formatKsXbdm: function (row, column) {
      return row.ks_xbdm === '2' ? '女' : '男'
    },
    handleCurrentChange (val) {
      console.log(val)
      this.currentRow = val
    },
    // 页面行数
    async handleSizeChange (val) {
      this.rows = val
      await this.initPage()
    },
    // 页面跳转
    async handlePaginationChange (val) {
      this.page = val
      await this.initPage()
    },
    // 选中后跳转
    startZiXun () {
      if (this.currentRow === '') {
        return this.$message.warning('请选择考生后重试')
      }
      this.$router.push({
        name: 'inner_zhiyuan',
        query: {
          userId: this.currentRow.id
        }
      })
    }
  },
  created () {
    this.initPage()
  }
}
</script>

<style scoped>

</style>
