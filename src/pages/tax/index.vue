<template>
    <div class="page">
    <myNavbar :title="'营业税额'"></myNavbar>
    <div class="form">
    <nut-row>
        <nut-col>
            <nut-cell title="选择日期" :desc="popupDesc" @click="show = true"></nut-cell>
        </nut-col>
    </nut-row>

    <nut-row>
        <nut-col>
            <nut-cell title="税率">
                <template #desc>
                    <nut-input-number v-model="taxRate" step="0.1" decimal-places="1" />
                </template>
            </nut-cell>
        </nut-col>
    </nut-row>
</div>
    <nut-button style="margin-left: auto;
  margin-right: auto;" class="btn" type="success" @click="handleSubmit" block>查询</nut-button>
    <nut-popup position="bottom" v-model:visible="show">
        <nut-date-picker type="year-month" v-model="currentDate" :min-date="minDate" :max-date="maxDate"
            @confirm="popupConfirm" :is-show-chinese="true">
        </nut-date-picker>
    </nut-popup>
    <scroll-view scroll-y class="container">
        <view class="page-body">
            <view class="page-section">
                <view class="page-section-spacing">
                    <nut-table :columns="columns" :data="transactions" bordered=false></nut-table>
                </view>
            </view>
        </view>
    </scroll-view>
    <li>总额:{{ total }}</li>
    <li>税额:{{ tax }}</li>
</div>
</template>

<script setup>
import { ref } from 'vue';
import Taro from '@tarojs/taro'
import myNavbar from '../../compoment/navbar.vue'
const show = ref(false);
const popupDesc = ref();
const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2025, 10, 1);
const currentDate = ref(new Date());
const transactions = ref('');
const total = ref(0);
const taxRate = ref(1);
const tax = ref(1);

const columns = [
    {
        title: '月份',
        key: 'month',
        align: 'center'
    },
    {
        title: '明细',
        key: 'incoming'
    },
    {
        title: '税款',
        key: 'tax'
    },
];



const popupConfirm = ({ selectedValue, selectedOptions }) => {
    popupDesc.value = selectedOptions.map((val) => val.text).join('');
    show.value = false;
};
async function handleSubmit() {
    await Taro.request({
        url: 'http://101.200.32.224:3000/financial/transaction/sum',
        method: 'POST',
        data: {
            date: currentDate.value
        }
    }).then(res => {
        let sum = 0;

        for (let index = 0; index < res.data.list.length; index++) {
            const element = res.data.list[index];
            element.tax = element.incoming * taxRate.value / 100.0;
            sum += element.incoming;
        }
        console.log(sum);
        transactions.value = res.data.list;

        total.value = sum;
        tax.value = total.value * taxRate.value / 100.0;

    }).catch((err) => {
        console.log(err);
    })
};

const value = ref(1);
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
.form{
    border-radius: 10px;
    margin-top: 60rpx;
    margin-left: 25rpx;
    width: 600px;
    padding: 50px;
    background-color: rgba(244, 244, 244, 0.887);
}
.btn{
    width: 200px;
}
</style>