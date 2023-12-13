<template>
    <nut-navbar class="navbar" :title="'小微企业财务辅助工具'">
    </nut-navbar>
    <img class="img" width="375px" src="https://s3.bmp.ovh/imgs/2023/12/12/a97e4a4df8e43774.png">
    <div class="form" style="margin-top: 200px;">
        <nut-row label="用户名" >
            <nut-col>
            <nut-input v-model="username" class="nut-input-text" placeholder="请输入用户名" type="text" />
        </nut-col>
        </nut-row>
        <nut-row label="密码" >
            <nut-col>
            <nut-input v-model="password" class="nut-input-text" placeholder="请输入密码" type="password" />
        </nut-col>
        </nut-row>
        <nut-row label="公司">
        <nut-col>
            <nut-input v-model="company" class="nut-input-text" placeholder="请输入公司" type="text" />
        </nut-col>
        </nut-row>
    </div>
    <nut-space direction="vertical" style="align-items: center;justify-content: center;margin-top: 10px;" fill>
        <nut-button class="btn_login" type="info" @click="Login"
            style="width: 200px;margin:0 0 15px 0;">登录</nut-button>
        <nut-button class="btn_login" type="primary" @click="Register" 
        style="width: 200px;">注册</nut-button>
    </nut-space>
</template>
<script setup>
import { reactive, ref } from 'vue';
import Taro from '@tarojs/taro'
import myNavbar from '../../compoment/navbar.vue'
const username = ref('123456')
const password = ref('123456')
const company = ref('123456')
function Register() {
    if (username.value == '' || password.value == '' || company.value == '') {
    }
    else {
        Taro.request({
            method: 'POST',
            url: 'http://101.200.32.224:3000/financial/user/register',
            data: {
                username: username.value,
                password: password.value,
                company: company.value,
                type: 'guest'
            }
        })
        Taro.navigateTo({ url: '/pages/index/index' });
    }

}
function Login() {
    if (username.value == '' || password.value == '' || company.value == '') {
        Taro.showToast({
            title: '请填写必要的登录信息',
            icon: 'none',
            duration: 2000
        })
    }
    else if (company.value == 'admin') {
        const arr = Taro.request({
            method: 'POST',
            url: 'http://101.200.32.224:3000/financial/user/login',
            data: {
                username: username,
                password: password,
            }
        })
        try {
            Taro.setStorage({
                key: "company",
                data: company.value
            })
        } catch (error) {
            console.log(error);
        }
        Taro.navigateTo({ url: '/pages/admin/index' });
    }

    else {
        const arr = Taro.request({
            method: 'POST',
            url: 'http://101.200.32.224:3000/financial/user/login',
            data: {
                username: username.value,
                password: password.value,
                company: company.value
            },
            fail: (res) => {
                Taro.showToast({
                            title: '网络异常',
                            icon: 'error',
                            duration: 2000
                        })
            },
            success: (res) => {
                console.log(res);
                if (res.statusCode === 200) {
                    if (res.data.message === 'success') {
                        Taro.showToast({
                            title: '登陆成功',
                            icon: 'success',
                            duration: 1000
                        })
                        try {
                            Taro.setStorage({
                                key: "company",
                                data: company.value
                            })
                        } catch (error) {
                            console.log(error);
                        }
                        setTimeout(() => {
                            Taro.navigateTo({ url: '/pages/home/index' });
                        }, 1000);
                    }

                    if (res.data.message === 'fail') {
                        Taro.showToast({
                            title: '身份信息有误',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }

            }
        })


    }
}
</script>
<style>
.navbar {
    margin-top: 15px;
}

.navbar .nut-navbar {
    padding: 0;
    background: rgba(255, 255, 255, 0);
    box-shadow: none
}

.navbar .nut-navbar__title {
    margin-left: 100px;
    font-weight: bold;
}

.navbar .nut-navbar__title .title {
    color: #000000;
}
.img{
    position: absolute;
    top: 0;
}
.form{
    border-radius: 10px;
    margin: auto;
    padding: 10px;
    background-color: rgb(225, 223, 223);
    width: 700px;
    
}
.form .nut-input{
    background-color: rgb(255, 255, 255)
}
</style>