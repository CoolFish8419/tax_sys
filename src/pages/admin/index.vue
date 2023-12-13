<template>
    <myNavbar :title="'小微企业财务辅助工具'"></myNavbar>
    <div>
        <nut-cell title="用户管理" @click="goToPage('/pages/admin/user')"></nut-cell>
        <!-- <nut-cell title="公司管理" @click="goToPage('/pages/admin/company')"></nut-cell> -->
    </div>
    
</template>
<script setup>
import Taro from '@tarojs/taro'
function goToPage(url) {
    Taro.navigateTo({ url })
}

</script>