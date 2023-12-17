<template>
    <div class="page">
        <myNavbar :title="`${ company }待审核事项`"></myNavbar>
        <div class="func_area">
            <nut-cell v-for="(item , index) in examineList" 
            :key="index" 
            :title="item.type" 
            :sub-title="'金额：' + item.money"
             is-link
             @click="baseClick(item)">
            </nut-cell>
        </div>
        <nut-dialog v-model:visible="visible1" text-align="'left'" 
        @cancel="onCancel(currentItem.examineId)" @ok="onOk(currentItem.examineId)" cancel-text="驳回" ok-text="通过">
            <template #header>
                <h2>审核内容</h2>
            </template>
            <template #default>
                <div>
                    <div>申请序号: {{ currentItem.examineId }}</div>
                    <div>申请时间: {{ currentItem.examineTime }}</div>
                    <div>金额: {{ currentItem.money }}</div>
                    <div>申请公司: {{ currentItem.examineCompany }}</div>
                </div>
            </template>
        </nut-dialog>
    </div>
</template>

<script setup>
import { Refresh } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro'
import { ref, onMounted } from "vue";
import myNavbar from '../../compoment/navbar.vue'
const visible1 = ref(false);
const examineList = ref([]);
const company = ref('');
const currentItem = ref({}); // 新增一个变量来存储当前选中的项目

onMounted(() => {
    company.value = Taro.getCurrentInstance().router.params.company;
    getList();
})
const getList=()=>{
    Taro.request({
            method: 'POST',
            url: 'http://101.200.32.224:3000/financial/examine/list',
            data: {
                examineCompany: company.value,
            },
            success:(res)=>{
                if(res.data.message==='success'){
                    examineList.value = res.data.list;
                }
            }
        })
}
const onCancel = (id) => {
    Taro.request({
            method: 'POST',
            url: 'http://101.200.32.224:3000/financial/examine/finish',
            data: {
                examineId: id,
                pass:0
            },
            success:(res)=>{
                if(res.data.message==='success'){
                    getList();
                }
            }
        })
};

const onOk = (id) => {
    Taro.request({
            method: 'POST',
            url: 'http://101.200.32.224:3000/financial/examine/finish',
            data: {
                examineId: id,
                pass:1
            },
            success:(res)=>{
                if(res.data.message==='success'){
                    getList();
                }
            }
        });

};

function baseClick(item) {
    currentItem.value = item; // 将当前选中的项目存入 currentItem
    visible1.value = true;
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
nut-dialog .nut-button--primary{
    color:aqua
}
</style>