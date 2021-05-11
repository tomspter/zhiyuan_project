<template>
  <d2-container>
    <template slot="header">
      <el-row type="flex" align="middle">
        <el-col :span="4">
          <!--      选表-->
          <el-select v-model="tabelName" placeholder="请选择" size="medium"
                     @change="changeTableChart">
            <el-option
              v-for="item in tabelNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2"><el-tag>宽度调整</el-tag></el-col>
        <el-col :span="5">
          <!--      调整大小-->
          <el-slider
            v-model="boxWidth"
            :min=0
            :max=200
            style="width: 300px"
            @change="changeboxWidth"
            :step="10">
          </el-slider>
        </el-col>
        <el-col :span="2"><el-tag>深度调整</el-tag></el-col>
        <el-col :span="5">
          <!--      调整深度-->
          <el-slider
            v-model="boxDepth"
            :min=0
            :max=100
            style="width: 300px"
            @change="changeboxDepth"
            :step="10">
          </el-slider>
        </el-col>
        <el-col :span="6">
          <el-switch v-model="autoRotate"
                     active-text="自动旋转"
                     inactive-text="静止"
                     @change="autoRotateFunc"
                     style="margin-right: 15px">
          </el-switch>
          <el-checkbox v-model="shadowStatus" @change="shadowStatusFunc" style="margin-right: 15px">开启阴影</el-checkbox>
          <el-checkbox v-model="transparentStatus" @change="transparentFunc">开启透明</el-checkbox>
        </el-col>

        <!--      自动旋转-->
      </el-row>
    </template>
    <div id="chart_3D" ref="chart_3D" style="width: 100%;height: 650px"/>
  </d2-container>
</template>

<script>
import api from '@/api'
import * as echarts from 'echarts'
import 'echarts-gl'

const _ = require('lodash')

export default {
  name: 'Index',
  data () {
    return {
      chart: undefined,
      option: {},
      dataSetAll: [],
      maxNum: 0,
      autoRotate: false,
      tabelName: 'income_nationalpercapita_info',
      tabelNameOptions: [
        {
          value: 'income_nationalpercapita_info',
          label: '全国基本情况'
        }, {
          value: 'income_expenditure_info',
          label: '全国居民人均收支'
        }, {
          value: 'income_urbanresidents_info',
          label: '城镇居民人均收支'
        }, {
          value: 'income_engelcoefficient_info',
          label: '居民人均可支配'
        }, {
          value: 'income_urban_rural_engelcoefficient_info',
          label: '城乡居民家庭人均'
        }, {
          value: 'income_savings_deposits_info',
          label: '储蓄存款'
        }],
      boxWidth: 50,
      boxDepth: 50,
      setBoxWidth: 100,
      setBoxDepth: 50,
      shadowStatus: false,
      transparentStatus: false
    }
  },
  async mounted () {
    await this.initData()
    this.chart = echarts.init(document.getElementById('chart_3D'))
    this.setChartOption()
  },
  beforeDestroy () {
    echarts.dispose(this.chart)
    this.chart = undefined
  },
  methods: {
    async initData () {
      // 接口请求
      const params = new FormData()
      params.append('tablename', this.tabelName)
      params.append('count', '20')
      params.append('hlzh', '1')
      params.append('search_list', '')
      params.append('type', 'row')
      params.append('func', '')
      params.append('formula', '')
      params.append('newField', '')
      params.append('filter_array', '')
      const result = await api.GET_DATA(params)
      console.log(result)
      // TODO 拼接dataset
      const dataSet = []
      // dataSet.push(['Year', 'Name', 'Num'])
      const typeName = result.xLabelList.map(item => item.cname)
      result.dataTable.forEach(item => {
        const year = parseInt(item.e_yAxis)
        item = _.omit(item, ['c_yAxis', 'e_yAxis'])
        // const key = Object.keys(item)
        const value = Object.values(item)
        const zipArray = _.zip(typeName, value)
        zipArray.forEach(item => {
          dataSet.push(_.concat(year, item))
        })
      })
      this.maxNum = _.max(dataSet.map(item => item[2]))
      console.log(this.maxNum)
      dataSet.unshift(['Year', 'Name', 'Num'])
      this.dataSetAll = dataSet
    },
    setChartOption () {
      console.log(this.dataSetAll)
      // TODO x轴年份,y轴种类,z数值
      this.option = {
        grid3D: {
          // bottom: '100%',
          light: {
            main: {
              shadow: false
              // shadowQuality: 'ultra'
            }
          },
          postEffect: {
            SSAO: {
              enable: true,
              quality: 'ultra'
            }
          },
          boxWidth: 0,
          boxDepth: 0,
          viewControl: {
            autoRotate: false
          }
        },
        tooltip: {},
        xAxis3D: {
          name: '年份',
          type: 'category'
        },
        yAxis3D: {
          name: '',
          type: 'category'
        },
        zAxis3D: {
          name: '数值',
          type: 'value'
        },
        visualMap: {
          max: 0,
          dimension: 'Num',
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        },
        dataset: {
          dimensions: [
            { name: 'Year', type: 'ordinal' },
            { name: 'Name', type: 'ordinal' },
            { name: 'Num', type: 'number' }
          ],
          source: null
        },
        series: [
          {
            type: 'bar3D',
            bevelSize: 0.1,
            // symbolSize: symbolSize,
            shading: 'lambert',
            encode: {
              x: 'Year',
              y: 'Name',
              z: 'Num'
            },
            emphasis: {
              label: {
                show: true,
                formatter: params => parseInt(params.value[2]),
                fontSize: 20,
                color: '#8A2BE2'
              }
            },
            itemStyle: {
              color: '#8A2BE2',
              opacity: 1
            }
          }
        ]
      }
      this.option.grid3D.boxWidth = this.boxWidth + this.setBoxWidth
      this.option.grid3D.boxDepth = this.boxDepth + this.setBoxDepth
      this.option.visualMap.max = this.maxNum
      this.option.dataset.source = this.dataSetAll
      this.chart.setOption(this.option)
    },
    autoRotateFunc (param) {
      this.option.grid3D.viewControl.autoRotate = param
      this.chart.setOption(this.option)
    },
    async changeTableChart () {
      await this.initData()
      this.setChartOption()
    },
    changeboxWidth () {
      this.option.grid3D.boxWidth = this.boxWidth + this.setBoxWidth
      this.chart.setOption(this.option)
    },
    changeboxDepth () {
      this.option.grid3D.boxDepth = this.boxDepth + this.setBoxDepth
      this.chart.setOption(this.option)
    },
    shadowStatusFunc () {
      this.option.grid3D.light.main.shadow = this.shadowStatus
      this.chart.setOption(this.option)
    },
    transparentFunc () {
      if (this.transparentStatus) {
        this.option.series[0].shading = 'color'
        this.option.series[0].itemStyle.opacity = 0.4
      } else {
        this.option.series[0].shading = 'lambert'
        this.option.series[0].itemStyle.opacity = 1
      }
      this.chart.setOption(this.option)
    }
  }
}

</script>

<style scoped>
</style>
