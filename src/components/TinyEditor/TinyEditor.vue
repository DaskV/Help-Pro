<!--
 * @Author: DaskV
 * @Date: 2019-09-12 11:40:45
 * @LastEditors: DaskV
 * @LastEditTime: 2019-09-16 10:44:27
 * @Description: TinyEditor
 -->
<template>
<div class="tinymce">
    <h1>tinymce</h1>
    <editor id="tinymce" v-model="tinymceHtml" :init="init"></editor>
    <div v-html="tinymceHtml"></div>
</div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
export default {
    name: 'TinyEditor',
    data() {
        return {
            tinymceHtml: '请输入内容',
            init: {
                language_url: '/tinymce/zh_CN.js',
                language: 'zh_CN',
                skin_url: '/tinymce/skins/lightgray',
                height: 300,
                plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                branding: false,
                images_upload_handler: (blob, success, fail) => {
                    this.imagesUpload(blob, success, fail)
                }
            }
        }
    },
    mounted() {
        tinymce.init({})
    },
    methods: {
        imagesUpload(blob, success, fail) {
            console.log('上传成功')
        }
    },
    components: {
        Editor
    }
}
</script>
