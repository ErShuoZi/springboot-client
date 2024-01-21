<template>
    <div class="common-layout">
      <el-container class="layout">
        <el-header class="header">Header</el-header>
        <el-container class="page">
          <el-aside  class="aside">Aside</el-aside>
          <el-main class="main">Main</el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.common-layout {
  flex: 1;
  display: flex;
  .layout{
    flex: 1;
    .header{
      height: 50px;
      background-color: yellow;
    }
    .page {
      display: flex;
      .aside {
        width: 200px;
        background-color: red;
      }
      .main {
        flex: 1;
      }
    }

  }

}
</style>
