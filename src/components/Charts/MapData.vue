<template>
    <v-chart :forceFit="true" height="450" :padding="[0, 20, 40]" :scale="scale">
        <v-coord type="rect" direction="TL" />
        <v-tooltip
            :showTitle="tooltipOpts.showTitle"
            :containerTpl="tooltipOpts.containerTpl"
            :itemTpl="tooltipOpts.itemTpl"
            :g2Tooltip="tooltipOpts.g2Tooltip" />
        <v-view :data="geoData" :scale="scale">
            <v-polygon
                :position="view1Opts.position"
                :vStyle="view1Opts.style"
                :tooltip="view1Opts.tooltip" />
        </v-view>
        <v-view :data="data">
            <v-point
                :position="view2Opts.position"
                :size="view2Opts.size"
                :opacity="view2Opts.opacity"
                :color="view2Opts.color"
                :tooltip="view2Opts.tooltip"
                shape="circle" />
        </v-view>
    </v-chart>
</template>

<script>
const scale = [{
    dataKey: 'x',
    sync: true,
    nice: false
}, {
    dataKey: 'y',
    sync: true,
    nice: false
}]

const tooltipOpts = {
    showTitle: false,
    containerTpl: '<div class="g2-tooltip">' +
        '<table class="g2-tooltip-list"></table></div>',
    itemTpl: '<tr data-index={index}><td style="padding: 5px; background-color:#545454">{name}</td><td style="padding: 5px; background-color:#fff;color: #000">{value}</td></tr>',
    g2Tooltip: {
        borderRadius: '2px',
        backgroundColor: '#DDDDDD',
        padding: 0,
        border: '1px solid #333'
    }
}

const view1Opts = {
    quickType: 'polygon',
    position: 'x*y',
    style: {
        fill: '#ddd',
        stroke: '#b1b1b1',
        lineWidth: 0.5,
        fillOpacity: 0.85
    },
    tooltip: false
}

const view2Opts = {
    quickType: 'point',
    position: 'x*y',
    size: ['deaths', [2, 30]],
    opacity: 0.45,
    color: '#1890ff',
    tooltip: 'date*location*lat*lng*deaths*magnitude'
}

export default {
    data() {
        return {
            scale,
            tooltipOpts,
            view1Opts,
            view2Opts
        }
    },
    props: {
        data: {
            type: Object,
            default: () => {
                return []
            }
        },
        geoData: {
            type: Object,
            default: () => {
                return {}
            }
        }
    }
}
</script>

<style>

</style>
