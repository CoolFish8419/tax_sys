<template>
    <myNavbar :title="'用户管理'"></myNavbar>
    <nut-input v-model="user" placeholder="请输入名字" />
    <nut-input v-model="company" placeholder="请输入公司" />
    <nut-button type="primary" @click="fetchUser" block>查询</nut-button>

    <scroll-view>
        <nut-swipe v-for="item in users">
            <nut-cell>
                名称:{{ item.username }},公司:{{ item.company }}
            </nut-cell>
            <template #right>
                <nut-button @click="handleDelete(item.userId)" shape="square" style="height:100%"
                    type="danger">删除</nut-button>
                <nut-button @click="handleEdit(item.userId)" shape="square" style="height:100%"
                    type="info">编辑</nut-button>
            </template>

        </nut-swipe>
    </scroll-view>

    <nut-popup position="bottom" v-model:visible="show_overlay">
        <nut-input v-model="name_change" placeholder="请输入用户名" />
        <nut-input v-model="company_change" placeholder="请输入公司" />
        <nut-input v-model="password_change" placeholder="请输入密码" />
        <nut-button type="primary" @click="Updateconfirm" block>更新</nut-button>
    </nut-popup>
</template>
<script setup>
import myNavbar from '../../compoment/navbar.vue'
import { ref } from 'vue';
import Taro from '@tarojs/taro'
const password_change = ref('');
const show_overlay = ref(false);
const name_change = ref('');
const company_change = ref('');
const company = ref('');
const users = ref([]);
const user=ref('');
function handleEdit(userId) {
    show_overlay.value = true;
    Taro.setStorageSync('userId', userId);
}


const fetchUser = () => {
    Taro.request({
        url: 'http://101.200.32.224:3000/financial/user/select',
        method: 'POST',
        data: {
            user: user.value,
            company: company.value,
        }
    }).then(res => {
        users.value = res.data.list;
    }).catch((err) => {
        console.log(err);
    })
}
async function Updateconfirm() {
    await Taro.request({
        url: 'http://101.200.32.224:3000/financial/user/update',
        method: 'POST',
        data: {
            userId: Taro.getStorageSync('userId'),
            company: company_change.value,
            username: name_change.value,
            password: password_change.value,
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
        url: 'http://101.200.32.224:3000/financial/user/delete',
        method: 'POST',
        data: {
            transactionId: Id,
        }
    }).then(res => {

    }).catch((err) => {
        console.log(err);
    })
}


</script>
  