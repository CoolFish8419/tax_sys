<template>
    <myNavbar :title="'小微企业财务辅助工具'"></myNavbar>
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
    <nut-row>
        <nut-col :span="12">
            <nut-button type="primary" @click="fetchTransaction" block>查询</nut-button>
        </nut-col>
        <nut-col :span="12">
            <nut-button type="primary" @click="goToPage('/pages/transaction/add')" block>添加</nut-button>
        </nut-col>

    </nut-row>


    <nut-popup position="bottom" v-model:visible="show">
        <nut-date-picker v-model="currentDate" type="year-month" :min-date="minDate" :max-date="maxDate"
            @confirm="popupConfirm" :is-show-chinese="true">
        </nut-date-picker>
    </nut-popup>

    <scroll-view>
        <nut-swipe v-for="item in transactions" :key="item.transactionId">
            <nut-cell>
                姓名:{{ item.name }},数目:{{ item.incoming }},类型:{{ item.type }}
            </nut-cell>
            <template #right>
                <nut-button @click="handleDelete(item.transactionId)" shape="square" style="height:100%"  type="danger">删除</nut-button>
                <nut-button @click="handleEdit(item.transactionId)" shape="square" style="height:100%" type="info">编辑</nut-button>
            </template>

        </nut-swipe>
    </scroll-view>

    <nut-popup position="bottom" v-model:visible="show_type">
        <nut-picker v-model="value" :columns="columns" title="请选择类型" @confirm="confirm" @cancel="show_type = false">
        </nut-picker>
    </nut-popup>

    <nut-popup position="bottom" v-model:visible="show_overlay">
        <nut-input v-model="name_change" placeholder="请输入名字" />
        <nut-input v-model="money" placeholder="请输入金额" />
        <nut-date-picker v-model="currentDate" type="year-month" :min-date="minDate" :max-date="maxDate"
            @confirm="confirm" :is-show-chinese="true">
        </nut-date-picker>
        <nut-picker v-model="value" :columns="columns" title="请选择类型" @confirm="confirm" @cancel="show_type = false">
        </nut-picker>
        <nut-button type="primary" @click="Updateconfirm" block>更新</nut-button>

    </nut-popup>

</template>
<script setup>
import { DatePicker } from '@nutui/nutui-taro';

import { ref } from 'vue';
import Taro from '@tarojs/taro'
const value = ref(['收入']);
const columns = ref([
    { text: '收入', value: '收入' },
    { text: '支出', value: '支出' },
]);
const show_overlay = ref(false);
const name_change = ref('');
const money = ref('');
const type_change=('');


const show_type = ref(false);
const show = ref(false);
const desc = ref();
const popupDesc = ref();
const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2025, 10, 1);
const currentDate = ref(new Date());
const transactions = ref([]);



const confirm = ({ selectedValue, selectedOptions }) => {
    desc.value = selectedOptions.map((val) => val.text).join(',');
    show_type.value = false;
};


const popupConfirm = ({ selectedValue, selectedOptions }) => {
    popupDesc.value = selectedOptions.map((val) => val.text).join('');
    show.value = false;
};

function handleEdit(transactionid) {
    show_overlay.value = true;
    Taro.setStorageSync('txnId', transactionid);
}


const fetchTransaction = () => {
    Taro.request({
        url: 'http://101.200.32.224:3000/financial/transaction/list',
        method: 'POST',
        data: {
            company: Taro.getStorageSync('company').toString(),
            date: currentDate.value,
            type: value.value.toString()
        }
    }).then(res => {
        transactions.value = res.data.list;
        console.log(this.transactions);
    }).catch((err) => {
        console.log(err);
    })
}
async function Updateconfirm() {
    await Taro.request({
        url: 'http://101.200.32.224:3000/financial/transaction/update',
        method: 'POST',
        data: {
            wageId: Taro.getStorageSync('txnId'),
            name: name_change.value,
            incoming: money.value,
            company: Taro.getStorageSync('company').toString(),
            date: currentDate.value
        }
    }).then(res => {
        show_overlay.value = false;
    }).catch((err) => {
        console.log(err);
    })

}
async function handleDelete(Id) {
    console.log(Id);
     await Taro.request({
        url: 'http://101.200.32.224:3000/financial/transaction/delete',
        method: 'POST',
        data: {
            transactionId: Id,
        }
    }).then(res => {
        
    }).catch((err) => {
        console.log(err);
    })
}


function goToPage(url) {
    Taro.navigateTo({ url })
}
</script>
  