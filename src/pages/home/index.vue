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
        <nut-cell title="账号性质" :desc="actType" style="width: 300px;margin-left: 20px; flex-basis: none;"></nut-cell>
        <div class="func_area">
            <nut-grid :column-num="2" square>
                <nut-grid-item text="工资管理" @click="goToPage('/pages/wage/index')">
                    <nut-avatar class="avatar">
                        <img src="https://s3.bmp.ovh/imgs/2023/12/13/04eac5bc028b2746.png" />
                    </nut-avatar>
                </nut-grid-item>
                <nut-grid-item text="财务管理" @click="goToPage('/pages/transaction/index')">
                    <nut-avatar >
                        <img src="https://s3.bmp.ovh/imgs/2023/12/13/e12518119c7e9657.png" />
                    </nut-avatar>
                </nut-grid-item>
                <nut-grid-item text="报表统计" @click="goToPage('/pages/table/index')">
                    <nut-avatar >
                        <img src="https://s3.bmp.ovh/imgs/2023/12/13/90a113bb4ce0cdc0.png" />
                    </nut-avatar>
                </nut-grid-item>
                <nut-grid-item text="营业税额" @click="goToPage('/pages/tax/index')">
                    <nut-avatar >
                        <img src="https://s3.bmp.ovh/imgs/2023/12/13/e07f340d88266ce1.png" />
                    </nut-avatar>
                </nut-grid-item>
            </nut-grid>
        </div>
    </div>
</template>
<script setup>
import Taro from '@tarojs/taro'
import { ref, onMounted } from "vue";
import myNavbar from '../../compoment/navbar.vue'
const company = ref('');
const actType = ref('')
onMounted(() => {
    company.value = Taro.getStorageSync('company');
    if(company.value!=='admin'){
        actType.value = '报税人账户'
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