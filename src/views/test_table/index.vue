<template>
  <d2-container>
    <div id="chart_3D" ref="chart_3D" style="width: 100%;height: 800px" />
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
      maxNum: 0
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
      params.append('tablename', 'income_engelcoefficient_info')
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
      result.dataTable.forEach(item => {
        const year = parseInt(item.e_yAxis)
        item = _.omit(item, ['c_yAxis', 'e_yAxis'])
        const key = Object.keys(item)
        const value = Object.values(item)
        const zipArray = _.zip(key, value)
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
        grid3D: {},
        tooltip: {},
        xAxis3D: {
          type: 'category'
        },
        yAxis3D: {
          type: 'category'
        },
        zAxis3D: {},
        visualMap: {
          max: 0,
          dimension: 'Num'
          // inRange: {
          //   color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          // }
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
            // symbolSize: symbolSize,
            shading: 'lambert',
            encode: {
              x: 'Year',
              y: 'Name',
              z: 'Num',
              tooltip: [0, 1, 2]
            }
          }
        ]
      }
      this.option.visualMap.max = this.maxNum
      this.option.dataset.source = this.dataSetAll
      this.chart.setOption(this.option)
    }
  }
}

</script>

<style scoped>
</style>
