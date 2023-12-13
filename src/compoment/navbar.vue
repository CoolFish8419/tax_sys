<template>
    <nut-navbar class="navbar" @click-back="back" :title=title>
        <template #left v-if="showBackIcon">
            <div>返回</div>
        </template>
    </nut-navbar>
</template>

<script>
import Taro from '@tarojs/taro'
import { createApp } from 'vue';
import { Navbar } from '@nutui/nutui-taro';
const app = createApp();
app.use(Navbar);
export default {
    name: 'myNavbar',
    components: {
        Navbar,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        showBackIcon: {
            type: Boolean,
            default:true
        },
    },
    methods: {
        back() {
            Taro.navigateBack()
        }
    }
}
</script>

<style>
.navbar {
    margin-top: 35px;
}

.navbar .nut-navbar {
    padding: 0;
    background: rgba(255, 255, 255, 0);
    box-shadow: none
}

.navbar .nut-navbar__title {
    margin-left: 50px;
    font-weight: bold;
}

.navbar .nut-navbar__title .title {
    color: #f7f7f7;
}

.navbar .nut-navbar__left {
    color: aliceblue;
}</style>