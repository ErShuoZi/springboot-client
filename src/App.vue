<template>
<div class="mainApp">
  <el-config-provider :locale="local">
    <RouterView />
  </el-config-provider>

</div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import {ref} from "vue";
const local = ref( zhCn)
</script>

<style scoped>

</style>
