<template>
  <d2-container>
    <template slot="header">
      <el-button type="primary" icon="el-icon-search" size="small" @click="dialogVisible=true">查找</el-button>
      <el-button type="primary" icon="el-icon-setting" size="small" @click="fenpeiFunc">分配咨询师</el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="refreshFunc">刷新</el-button>
    </template>
    <el-table :data="initData" :row-class-name="tableRowClassName" style="width: 100%"
              @selection-change="handleCurrentChange" >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
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
      <el-table-column prop="consult_user" label="咨询师" sortable="custom"></el-table-column>
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
    <el-dialog
      title="查找"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="考生号">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.xb">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sendDataFunc">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="分配咨询师"
      :visible.sync="fenpeiDialogVisible"
      width="20%"
      :before-close="fenpeiHandleClose"
    >
      <el-form ref="fenpeiForm" :model="fenpeiForm">
        <el-form-item label="咨询师">
          <el-select v-model="fenpeiForm.zxs" placeholder="请选择咨询师">
            <el-option v-for="item in fenpeiOption" :key="item.id" :label="item.true_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="fenpeiDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sendFenpeiFunc">确 定</el-button>
  </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import api from '@/api'

export default {
  name: 'yuyuexinxi',
  data () {
    return {
      initData: [],
      total: 0,
      page: 1,
      rows: 25,
      sort: 'id',
      order: 'asc',
      currentRow: [],
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
        ks_ksh: this.form.id,
        ks_xm: this.form.name,
        ks_lxdh: this.form.tel,
        ks_xbdm: this.form.xb
      }
      const res = await api.GET_YUYUE_DATA(JSON.stringify(data))
      this.total = res.total
      this.initData = res.rows
    },
    formatConsultStatus: function (row, column) {
      return row.consult_status === 1 ? '开始' : row.consult_status === 0 ? '未开始' : '未知'
    },
    formatKsXbdm: function (row, column) {
      return row.ks_xbdm === '2' ? '女' : '男'
    },
    tableRowClassName ({ row, rowIndex }) {
      if (row.consult_status === 0) {
        return 'warning-row'
      } else if (row.consult_status === 1) {
        return 'success-row'
      }
    },
    handleCurrentChange (val) {
      console.log(val)
      this.currentRow = val
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.form = {
            id: '',
            name: '',
            tel: '',
            xb: ''
          }
          done()
        })
        .catch(_ => {
        })
    },
    async sendDataFunc () {
      this.dialogVisible = false
      // 发送数据
      await this.initPage()
      console.log(this.form)
      this.form = {
        id: '',
        name: '',
        tel: '',
        xb: ''
      }
    },
    async refreshFunc () {
      this.page = 1,
      this.rows = 25,
      this.sort = 'id',
      this.order = 'asc',
      this.form = {
        id: '',
        name: '',
        tel: '',
        xb: ''
      }
      await this.initPage()
    },
    async fenpeiFunc () {
      console.log(this.currentRow.length)
      if (this.currentRow.length !== 0) {
        this.fenpeiOption = await api.getAdminUserSelect()
        this.fenpeiDialogVisible = true
      } else {
        this.$message.warning('请选择考生')
      }
    },
    async sendFenpeiFunc () {
      console.log('sendFenpeiFunc', this.fenpeiForm.zxs)
      if (this.fenpeiForm.zxs === null) {
        this.$message.warning('请选择咨询师后点击确定')
        return
      }
      this.$confirm('您确认为考生分配咨询师吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          admin_id: this.fenpeiForm.zxs,
          ids: this.currentRow.map(item => item.id).toString()
        }
        api.SET_CONSULT_USER(JSON.stringify(data)).then(item => {
          if (item.code === 1) {
            this.$message({
              type: 'success',
              message: '分配成功!'
            })
            this.initPage()
          } else {
            this.$message({
              type: 'error',
              message: '分配失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消分配'
        })
      })
      this.fenpeiDialogVisible = false
    },
    fenpeiHandleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.fenpeiForm.zxs = null
          done()
        })
        .catch(_ => {
        })
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
    }
  },
  created () {
    this.initPage()
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
