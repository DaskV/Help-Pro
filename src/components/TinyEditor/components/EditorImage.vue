<!--
 * @Author: DaskV
 * @Date: 2019-09-12 11:40:45
 * @LastEditors: DaskV
 * @LastEditTime: 2019-09-12 11:40:45
 * @Description:
 -->
<template>
<div class="upload-container">
    <a-button :style="{background:color,borderColor:color}" icon="el-icon-upload" type="primary" @click=" dialogVisible=true">
        插入
    </a-button>
    <a-modal :visible="dialogVisible">
        <a-upload
            action="https://httpbin.org/post"
            listType="picture-card"
            class="editor-slide-upload"
            :multiple="true"
            :fileList="fileList"
            :showUploadList="true"
            :beforeUpload="beforeUpload"
            :remove="handleRemove"
            @change="handleChange"
            >
        </a-upload>
    </a-modal>
</div>
</template>

<script>
// import { getToken } from 'api/qiniu'

export default {
    name: 'EditorSlideUpload',
    props: {
        color: {
            type: String,
            default: '#1890ff'
        }
    },
    data() {
        return {
            dialogVisible: false,
            listObj: {},
            fileList: []
        }
    },
    methods: {
        checkAllSuccess() {
            return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
        },
        handleSubmit() {
            const arr = Object.keys(this.listObj).map(v => this.listObj[v])
            if (!this.checkAllSuccess()) {
                this.$message('Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!')
                return
            }
            this.$emit('successCBK', arr)
            this.listObj = {}
            this.fileList = []
            this.dialogVisible = false
        },
        handleSuccess(response, file) {
            const uid = file.uid
            const objKeyArr = Object.keys(this.listObj)
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    this.listObj[objKeyArr[i]].url = response.files.file
                    this.listObj[objKeyArr[i]].hasSuccess = true
                    return
                }
            }
        },
        handleChange(info) {
            if (info.file.status === 'done') {
                console.log(info)
                // this.handleSuccess(info.file.response)
            }
        },
        handleRemove(file) {
            const uid = file.uid
            const objKeyArr = Object.keys(this.listObj)
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    delete this.listObj[objKeyArr[i]]
                    return
                }
            }
        },
        beforeUpload(file) {
            const _self = this
            const _URL = window.URL || window.webkitURL
            const fileName = file.uid
            this.listObj[fileName] = {}
            return new Promise((resolve, reject) => {
                const img = new Image()
                img.src = _URL.createObjectURL(file)
                img.onload = function () {
                    _self.listObj[fileName] = {
                        hasSuccess: false,
                        uid: file.uid,
                        width: this.width,
                        height: this.height
                    }
                }
                resolve(true)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.editor-slide-upload {
    margin-bottom: 20px;

    /deep/ .el-upload--picture-card {
        width: 100%;
    }
}
</style>
