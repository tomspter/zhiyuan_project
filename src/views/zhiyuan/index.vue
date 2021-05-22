<template>
  <d2-container>
    <template slot="header">
      <!--      分数位次区间-->
      <el-row type="flex" align="middle">
        <el-col :span="1">
          <el-tag size="medium">年份</el-tag>
        </el-col>
        <el-col :span="2" style="margin-right: 10px">
          <el-select size="small" v-model="sjnfSelectModel" @change="(val)=>changeSelect(val,'sjnf')">
            <el-option v-for="item in sjnfSelect"
                       :key="item.sjnf"
                       :label="item.sjnf"
                       :value="item.sjnf">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="1">
          <el-tag size="medium">省份</el-tag>
        </el-col>
        <el-col :span="2" style="margin-right: 10px">
          <el-select size="small" v-model="ssdmSelectModel" @change="(val)=>changeSelect(val,'ssdm')">
            <el-option v-for="item in ssdmSelect"
                       :key="item.SSDM"
                       :label="item.SSMC"
                       :value="item.SSDM">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="1">
          <el-tag size="medium">院校</el-tag>
        </el-col>
        <el-col :span="2" style="margin-right: 10px">
          <el-select size="small" v-model="yxdmSelectModel" @change="(val)=>changeSelect(val,'yxdm')">
            <el-option v-for="item in yxdmSelect"
                       :key="item.YXDM"
                       :label="item.YXMC"
                       :value="item.YXDM">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="1">
          <el-tag size="medium">批次</el-tag>
        </el-col>
        <el-col :span="2" style="margin-right: 5px">
          <el-select size="small" v-model="prevPcdmSelectModel" @change="(val)=>changeSelect(val,'prev')">
            <el-option v-for="item in prevPcdmSelect"
                       :key="item.ID"
                       :label="item.PCMC"
                       :value="item.PCDM">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="1">
          <el-tag size="medium">专业组</el-tag>
        </el-col>
        <el-col :span="2" style="margin-right: 10px">
          <el-select size="small" v-model="zyzdmSelectModel" @change="(val)=>changeSelect(val,'prev')">
            <el-option v-for="item in zyzdmSelect"
                       :key="item.ZYZDM"
                       :label="item.ZYZMC"
                       :value="item.ZYZDM">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="1">
          <el-tag size="medium">院校类别</el-tag>
        </el-col>
        <el-col :span="2" style="margin-right: 10px">
          <el-select size="small" v-model="prevPcdmSelectModel" @change="(val)=>changeSelect(val,'prev')">
            <el-option v-for="item in prevPcdmSelect"
                       :key="item.ID"
                       :label="item.PCMC"
                       :value="item.PCDM">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2"></el-col>

<!--        <el-col :span="2">-->
<!--          <el-button type="primary" icon="el-icon-search">搜索</el-button>-->
<!--        </el-col>-->
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-edit" @click="clearFunc" size="small">清除</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-refresh" @click="initPage" size="small">刷新</el-button>
        </el-col>
<!--        <el-col :span="2">-->
<!--          <el-button type="primary" icon="el-icon-close">关闭</el-button>-->
<!--        </el-col>-->

      </el-row>
    </template>
    <!--    表格-->
    <el-table :data="initData" @sort-change="changeSort" highlight-current-row>
<!--      <el-table-column type="selection" width="55"></el-table-column>-->
      <el-table-column prop="ID" label="ID" width="55"></el-table-column>
      <el-table-column prop="PCDM" label="批次代码" sortable="custom"></el-table-column>
      <el-table-column prop="PCMC" label="批次名称" sortable="custom"></el-table-column>
      <el-table-column prop="YXDM" label="院校代码" sortable="custom"></el-table-column>
      <el-table-column prop="YXDH" label="院校代号" sortable="custom"></el-table-column>
      <el-table-column prop="YXMC" label="院校名称" sortable="custom"></el-table-column>
      <el-table-column prop="YXLB" label="院校类别" sortable="custom"></el-table-column>
      <el-table-column prop="ZYZDM" label="专业组代码" sortable="custom"></el-table-column>
      <el-table-column prop="ZYZMC" label="专业组" sortable="custom"></el-table-column>
      <el-table-column prop="ZYZYQ" label="科目要求" sortable="custom"></el-table-column>
      <el-table-column prop="JHS" label="计划数" sortable="custom"></el-table-column>
      <el-table-column prop="TDCJ" label="总分" sortable="custom"></el-table-column>
      <el-table-column prop="YW" label="语文成绩" sortable="custom"></el-table-column>
      <el-table-column prop="SX" label="数学成绩" sortable="custom"></el-table-column>
      <el-table-column prop="WY" label="英语成绩" sortable="custom"></el-table-column>
      <el-table-column prop="WC" label="位次" sortable="custom"></el-table-column>
      <el-table-column prop="ZXZT" label="征询" :formatter="formatZXZT" sortable="custom"></el-table-column>
      <el-table-column prop="BZ" label="备注" sortable="custom"></el-table-column>
    </el-table>
    <el-pagination background
                   layout="total, sizes, prev, pager, next, jumper"
                   :page-size="rows"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-sizes="[5, 10, 20, 25]"
                   :total="total" style="margin-top: 10px"></el-pagination>
  </d2-container>
</template>

<script>
import api from '@/api'

export default {
  name: 'zhiyuan',
  data () {
    return {
      initData: [],
      total: 0,
      page: 1,
      rows: 25,
      sort: '',
      order: '',
      yxdmSelect: [],
      ssdmSelect: [],
      sjnfSelect: [],
      prevPcdmSelect: [],
      zyzdmSelect: [],
      yxdmSelectModel: '',
      ssdmSelectModel: '',
      sjnfSelectModel: '',
      prevPcdmSelectModel: '',
      zyzdmSelectModel: ''
    }
  },
  methods: {
    // 初始化页面
    async initPage (inputData) {
      const data = {
        page: this.page,
        rows: this.rows,
        sort: this.sort,
        order: this.order,
        sjnf: this.sjnfSelectModel,
        ssdm: this.ssdmSelectModel,
        yxdm: this.yxdmSelectModel,
        pcdm: this.prevPcdmSelectModel,
        zyzdm: this.zyzdmSelectModel
      }
      const result = await api.GET_ZHIYUAN_DATA(JSON.stringify(data))
      this.initData = result.rows
      this.total = result.total
    },
    async initSelect () {
      this.ssdmSelect = await api.getSsdmSelect()
      this.yxdmSelect = await api.getYxdmSelect()
      this.sjnfSelect = await api.getSjnfSelect()
      this.prevPcdmSelect = await api.getPrevPcdmSelect()
      this.zyzdmSelect = await api.getZyzdmSelect()
    },
    // 格式化征询列
    formatZXZT: function (row, column) {
      return row.ZXZT === 1 ? '征询' : row.ZXZT === 0 ? '' : '未知'
    },
    // 页面行数
    async handleSizeChange (val) {
      this.rows = val
      await this.initPage()
    },
    // 页面跳转
    async handleCurrentChange (val) {
      this.page = val
      await this.initPage()
    },
    // 重排序
    async changeSort (val) {
      console.log(val)
      this.sort = val.prop
      if (val.order === 'ascending') {
        this.order = 'asc'
      } else {
        this.order = 'desc'
      }
      await this.initPage()
    },
    async changeSelect (val, type) {
      console.log(val, type)
      // const data = {
      //   page: this.page,
      //   rows: this.rows,
      //   sort: this.sort,
      //   order: this.order
      // }
      // switch (type) {
      //   case 'sjnf':
      //     data.sjnf = val
      //     break
      //   case 'ssdm':
      //     data.ssdm = val
      //     break
      //   case 'yxdm':
      //     data.yxdm = val
      //     break
      //   case 'prev':
      //     data.prev = val
      //     break
      // }
      await this.initPage()
    },
    async clearFunc () {
      this.yxdmSelectModel = ''
      this.ssdmSelectModel = ''
      this.sjnfSelectModel = ''
      this.prevPcdmSelectModel = ''
      this.total = 0
      this.page = 1
      this.rows = 25
      this.sort = ''
      this.order = ''
      await this.initPage()
    }
  },
  created () {
    this.initPage()
    this.initSelect()
  }
}
</script>

<style scoped>

</style>
