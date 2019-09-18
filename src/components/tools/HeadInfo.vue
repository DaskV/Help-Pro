<template>
<div class="head-info" :class="center && 'center'">
    <span>{{ title }}</span>
    <p class="head-info-content" v-if="grow"> <number-grow :value="content" /> <span>{{ after }}</span> </p>
    <p class="head-info-content" v-else>{{ content }} <span>{{ after }}</span> </p>

    <em v-if="bordered" />
</div>
</template>

<script>
import NumberGrow from '@/components/NumberGrow/NumberGrow'
export default {
    name: 'HeadInfo',
    components: { NumberGrow },
    props: {
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        bordered: {
            type: Boolean,
            default: false
        },
        center: {
            type: Boolean,
            default: true
        },
        after: {
            type: String,
            default: ''
        },
        grow: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="less" scoped>
.head-info {
    position: relative;
    text-align: left;
    padding: 0 32px 0 0;
    min-width: 125px;

    &.center {
        text-align: center;
        padding: 0 32px;
    }

    span {
        color: rgba(0, 0, 0, .45);
        display: inline-block;
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 4px;
    }

    &-content {
        color: rgba(0, 0, 0, .85);
        font-size: 24px;
        line-height: 32px;
        margin: 0;

        span {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.85);
            margin: 0;
        }
    }

    em {
        background-color: #e8e8e8;
        position: absolute;
        height: 56px;
        width: 1px;
        top: 0;
        right: 0;
    }

    &-after {
        display: inline-block;
        font-size: 12px;
        margin-left: 4px;
    }
}
</style>
