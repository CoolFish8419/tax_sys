<template>
    <div class="page">
        <myNavbar :title="'小微企业财务辅助工具'"></myNavbar>
        <div>
            <nut-cell
                style="border:none;background-color: rgba(255, 255, 255, 0); margin-left:0 2px 0 2px; box-shadow: none;">
                <nut-avatar size="normal">
                    <img
                        src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
                </nut-avatar>
                <div style="display: flex;flex-direction: column;">
                    <p style="margin-left:10px;height: 40px; line-height: 40px; color: aliceblue;">Hi,用户{{ company }}</p>
                </div>
            </nut-cell>
        </div>
        <nut-cell title="账号性质" :desc="actType" style="width: 300px;margin-left: 37px; flex-basis: none;"></nut-cell>
        <div class="func_area">
            <nut-cell title="待审核事项" is-link @click="goToPage('/pages/admin/examine')"></nut-cell>
        </div>
    </div>
</template>
<script setup>
import Taro from '@tarojs/taro'
import { ref, onMounted } from "vue";
import myNavbar from '../../compoment/navbar.vue'
const company = ref('');
onMounted(() => {
    company.value = Taro.getStorageSync('company');
    if(company.value!=='admin'){
        actType.value = '纳税人账户'
    }else{
        actType.value = '管理员'
    }
})
function goToPage(url) {
    Taro.navigateTo({ url })
}

</script>
<style>
.page {
    position: absolute;
    top: 0;
    left: 0;
    width: 750px;
    height: 1334px;
    background-image: url('https://s3.bmp.ovh/imgs/2023/12/13/b3f324c9a23bbaab.png');
    background-size: 100% 100%;
}

.func_area {
    width: 600rpx;
    height: 600rpx;
    margin: 100rpx 75rpx;
}

</style>