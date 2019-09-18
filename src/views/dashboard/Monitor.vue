<template>
<div class="page-header-index-wide monitor">
    <a-row :gutter="24">
        <a-col :xl="18" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card :loading="loading" :bordered="false" title="活动实时交易情况" :style="{ minHeight: '624px' , marginBottom:'24px' }">
                <a-row class="more-info">
                    <a-col :span="6">
                        <head-info
                          title="今日交易总额"
                          content="124,543,233"
                          after="元"
                          :center="false"
                          :bordered="false"
                          :grow="true" />
                    </a-col>
                    <a-col :span="6">
                        <head-info title="销售目标完成率" content="92%" :center="false" :bordered="false" />
                    </a-col>
                    <a-col :span="6">
                        <head-info title="活动剩余时间" content="0" :center="false" />
                    </a-col>
                    <a-col :span="6">
                        <head-info title="每秒交易总额" content="234" after="元" :center="false" :grow="true" />
                    </a-col>
                </a-row>
                <map-data :data="earthquakeData" :geoData="mapData" />
            </a-card>
        </a-col>
        <a-col :xl="6" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card :bordered="false" title="活动情况预测" :style="{ minHeight: '300px',marginBottom:'24px' }">
                <head-info title="目标评估" content="有望达到预期" :center="false" :bordered="false" />
                <div class="predict">
                    <div class="predict-label">
                      <p>最大值： {{ pricePredictLabel.max }} 亿元</p>
                      <p>最小值： {{ pricePredictLabel.min }} 亿元</p>
                    </div>
                    <mini-smooth-area class="predict-chart" :style="{ height: '45px' }" :dataSource="pricePredictData" :scale="pricePredictScale" />
                </div>
            </a-card>
            <a-card :bordered="false" title="券核效率" :style="{ minHeight: '300px',marginBottom:'24px' }">
                <gauge />
            </a-card>
        </a-col>
    </a-row>
    <a-row :gutter="24">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card :bordered="false" title="各品类占比" :style="{ minHeight: '300px',marginBottom:'24px' }">
                <ring />
            </a-card>
        </a-col>
        <a-col :xl="6" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card :bordered="false" title="热门搜索" :style="{ minHeight: '300px',marginBottom:'24px' }">
                <word-cloud :data="wordData" />
            </a-card>
        </a-col>
        <a-col :xl="6" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card :bordered="false" title="资源剩余" :style="{ minHeight: '300px',marginBottom:'24px' }">
                <water-wave/>
            </a-card>
        </a-col>
    </a-row>
</div>
</template>

<script>
import moment from 'moment'
import HeadInfo from '@/components/tools/HeadInfo'
import { MapData, ChartCard, MiniSmoothArea, Gauge, Ring, WordCloud, WaterWave } from '@/components'
import { getworldGeo, getearthQuake, getWordCloud } from '@/api/manage'

const DataSet = require('@antv/data-set')

const pricePredictScale = [
    {
        dataKey: 'x',
        alias: '时间'
    },
    {
        dataKey: 'y',
        alias: '亿元'
    }
]

export default {
    name: 'Monitor',
    components: {
        HeadInfo,
        MapData,
        ChartCard,
        MiniSmoothArea,
        Gauge,
        Ring,
        WordCloud,
        WaterWave
    },
    data() {
        return {
            loading: false,
            mapData: {},
            earthquakeData: {},
            pricePredictScale,
            pricePredictData: [],
            pricePredictLabel: {
                max: 0,
                min: 0
            },
            wordData: []
        }
    },
    methods: {
        async getMap() {
            this.loading = true
            const geoData = await getworldGeo()
            const data = await getearthQuake()

            const dv = new DataSet.View().source(geoData, {
                type: 'GeoJSON'
            }).transform({
                type: 'geo.projection',
                projection: 'geoMercator',
                as: ['x', 'y', 'centroidX', 'centroidY']
            })
            const earthquakeData = new DataSet.View().source(data).transform({
                type: 'map',
                callback: (obj) => {
                    const projectedCoord = dv.geoProjectPosition([obj.lng * 1, obj.lat * 1], 'geoMercator')
                    obj.x = projectedCoord[0]
                    obj.y = projectedCoord[1]
                    obj.deaths = obj.deaths * 1
                    obj.magnitude = obj.magnitude * 1
                    return obj
                }
            })
            this.mapData = dv
            this.earthquakeData = earthquakeData
            this.loading = false
        },
        updatePricePredictData() {
            const me = this
            const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            const count = ~~(Math.random() * 5) + 22
            const newData = me.pricePredictData.slice()
            if (newData.length >= 200) {
                newData.shift()
            }
            newData.push({
                x: time,
                y: count,
                type: '记录1'
            })
            me.pricePredictLabel.min = newData[0].y
            me.pricePredictLabel.max = newData[newData.length - 1].y
            me.pricePredictData = newData
        },
        async getWordCloudData() {
            const res = await getWordCloud()
            this.wordData = res.list
        }
    },
    created() {
        this.getMap()
        this.getWordCloudData()
    },
    mounted() {
        setInterval(this.updatePricePredictData, 1000)
    }
}
</script>

<style lang="less" scoped>
.predict{
  position: relative;
  height: 80px;
  margin-top: 50px;
  &-label{
    position: absolute;
    top: -30px;
    left: 0;
  }
  &-chart{
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
