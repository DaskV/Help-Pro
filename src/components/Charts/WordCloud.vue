<template>
<div>
    <v-chart :forceFit="true" :height="180" :padding="padding" :data="rows" :scale="scale">
        <v-tooltip :show-title="false" />
        <v-coord type="rect" direction="TL" />
        <v-point position="x*y" color="category" shape="cloud" tooltip="name*value" />
    </v-chart>
</div>
</template>

<script>
import {
    registerShape
} from 'viser-vue'
const DataSet = require('@antv/data-set')

const scale = [{
    dataKey: 'x',
    nice: false
},
{
    dataKey: 'y',
    nice: false
}
]

registerShape('point', 'cloud', {
    draw(cfg, container) {
        return container.addShape('text', {
            attrs: {
                fillOpacity: cfg.opacity,
                fontSize: cfg.origin._origin.size,
                rotate: cfg.origin._origin.rotate,
                text: cfg.origin._origin.text,
                textAlign: 'center',
                fontFamily: cfg.origin._origin.font,
                fill: cfg.color,
                textBaseline: 'Alphabetic',
                ...cfg.style,
                x: cfg.x,
                y: cfg.y
            }
        })
    }
})

export default {
    watch: {
        data(now) {
            if (now.length > 0) {
                this.loadData(now)
            }
        }
    },
    methods: {
        loadData(data) {
            const dv = new DataSet.View().source(data)
            const range = dv.range('value')
            const min = range[0]
            const max = range[1]
            dv.transform({
                type: 'tag-cloud',
                fields: ['name', 'value'],
                size: [380, 300],
                font: 'Verdana',
                padding: 0,
                timeInterval: 5000, // max execute time
                rotate() {
                    let random = ~~(Math.random() * 4) % 4
                    if (random == 2) {
                        random = 0
                    }
                    return random * 90 // 0, 90, 270
                },
                fontSize(d) {
                    if (d.value) {
                        return ((d.value - min) / (max - min)) * (24 - 12) + 6
                    }
                    return 0
                }
            })
            this.$data.rows = dv.rows
        }
    },
    data() {
        return {
            padding: [0],
            scale,
            rows: [0, 0, 0, 0]
        }
    },
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        }
    }
}
</script>
