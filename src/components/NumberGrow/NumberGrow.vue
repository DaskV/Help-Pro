<!--
 * @Author: DaskV
 * @Date: 2019-09-09 16:01:24
 * @LastEditors: DaskV
 * @LastEditTime: 2019-09-09 18:03:16
 * @Description: 数字增长变化
 -->
<template>
    <div class="number-grow-warp">
        <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">0</span>
    </div>
</template>

<script>
export default {
    name: 'NumberGrow',
    props: {
        time: {
            type: Number,
            default: 1
        },
        value: {
            type: [Number, String],
            default: 0
        }
    },
    data() {
        return {
            values: 0,
            pre: '',
            after: ''
        }
    },
    watch: {
        value(val) {
            const value = this.formatValue(val)
            if (value > 0) {
                this.values = value
                this.numberGrow(this.$refs.numberGrow)
            }
        }
    },
    methods: {
        numberGrow(ele) {
            const step = parseInt((this.values * 10) / (this.time * 1000))
            let current = 0
            let start = 0
            let t = setInterval(() => {
                start += step
                if (start > this.values) {
                    clearInterval(t)
                    start = this.values
                    t = null
                }
                if (start == 0) {
                    start = this.values
                    clearInterval(t)
                }
                if (current === start) {
                    return
                }
                current = start
                ele.innerHTML = this.pre + current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,') + this.after
            }, 10)
        },
        formatValue(val) {
            if (typeof val === 'number') {
                return val
            } else if (typeof val === 'string') {
                const preObj = /^\D+(?=\d)/.exec(val)
                const end = val[val.length - 1]
                this.pre = preObj ? preObj[0] : ''
                this.after = isNaN(Number(end)) ? end : ''
                return Number(val.replace(/[^0-9]/ig, ''))
            }
        }
    },
    mounted() {
        this.values = this.formatValue(this.value)
        this.values > 0 && this.numberGrow(this.$refs.numberGrow)
    }
}
</script>

<style scoped>
.number-grow-warp {
    transform: translateZ(0);
    display: inline-block;
}

.number-grow {
    display: inline-block;
}
</style>
