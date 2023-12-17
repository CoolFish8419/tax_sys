<template>
    <div class="page">
        <myNavbar :title="'待审核事项所在公司'"></myNavbar>
        <div class="func_area">
            <nut-cell v-for="(company, index) in companies" :key="index" :title="company" is-link
                @click="goToPage('/pages/admin/examineList',company)"></nut-cell>
        </div>
    </div>
</template>
<script setup>
import Taro from '@tarojs/taro'
import { ref, onMounted } from "vue";
import myNavbar from '../../compoment/navbar.vue'
const companies = ref([]); 
onMounted(() => {
    Taro.request({
        method: 'POST',
        url: 'http://101.200.32.224:3000/financial/examine/search',
        data:{},
        success: (res) => {
            if (res.data.message === 'success') {
                companies.value = res.data.list.map(item => item.examine_company);
            }
        },
    });
});

function goToPage(url, company) {
    Taro.navigateTo({ url: url + '?company=' + company });
}


</script>

<style>
.page {
    position: absolute;
    top: 0;
    left: 0;
    width: 750px;
    height: 1334px;
    background-image: url('https://s3.bmp.ovh/imgs/2023/12/13/6ea91358da86adc6.png');
    background-size: 100% 100%;
}

.func_area {
    width: 600rpx;
    height: 600rpx;
    margin: 100rpx 75rpx;
}
</style>