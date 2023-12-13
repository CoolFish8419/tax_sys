<template>
        <div class="page">

    <myNavbar :title="'添加财务管理条目'"></myNavbar>
    <div class="form">
    <nut-row>
        <nut-col>
            <nut-input placeholder="请输入名称" v-model="name" />
        </nut-col>
    </nut-row>

    <nut-row style="margin-top: 16px;">
        <nut-col>
            <nut-input placeholder="请输入金额（支持小数)" v-model="number" type="digit" />
        </nut-col>
    </nut-row>

    <nut-row>
        <nut-col>
            <nut-cell title="选择日期" :desc="popupDesc" @click="show = true"></nut-cell>
        </nut-col>
    </nut-row>

    <nut-row>
        <nut-col>
            <nut-cell title="请选择类型" :desc="desc" @click="show_type = true"></nut-cell>
        </nut-col>
    </nut-row>
    </div>
    <nut-row>
        <nut-col style="display: flex; justify-content: center; ">
            <nut-button class="btn" type="success" @click="submitTransaction">提交</nut-button>
        </nut-col>
    </nut-row>

    <nut-popup position="bottom" v-model:visible="show">
        <nut-date-picker v-model="currentDate" type="year-month" :min-date="minDate" :max-date="maxDate"
            @confirm="popupConfirm" :is-show-chinese="true">
        </nut-date-picker>
    </nut-popup>
    <nut-popup position="bottom" v-model:visible="show_type">
        <nut-picker v-model="value" :columns="columns" title="请选择类型" @confirm="confirm" @cancel="show_type = false">
        </nut-picker>
    </nut-popup>
    </div>
</template>
<script setup>
import { ref, } from 'vue';
import Taro from '@tarojs/taro'
import myNavbar from '../../compoment/navbar.vue'
const name = ref('');
const number = ref('');
const value = ref(['收入']);
const columns = ref([
    { text: '收入', value: '收入' },
    { text: '支出', value: '支出' },
]);
const desc = ref();
const popupDesc = ref();
const show_type = ref(false);
const show = ref(false);
const currentDate = new Date();
const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2025, 10, 1);
const confirm = ({ selectedValue, selectedOptions }) => {
    desc.value = selectedOptions.map((val) => val.text).join(',');
    show_type.value = false;
};


const popupConfirm = ({ selectedValue, selectedOptions }) => {
    popupDesc.value = selectedOptions.map((val) => val.text).join('');
    show.value = false;
};

const submitTransaction = () => {
    Taro.request({
        url: 'http://101.200.32.224:3000/financial/transaction/add',
        method: 'POST',
        data: {
            name: name.value,
            incoming: number.value,
            date: currentDate,
            type: value.value.toString(),
            company:Taro.getStorageSync('company').toString(),
        }
    }).then(res => {
        Taro.navigateBack();
    }).catch((err) => {
        console.log(err);
    })
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