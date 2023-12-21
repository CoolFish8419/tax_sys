<template>
    <div class="page">
    <myNavbar :title="'添加工资条目'"></myNavbar>
    <div class="form">
    <nut-row>
        <nut-col>
            <nut-input placeholder="请输入名称" v-model="name" />
        </nut-col>
    </nut-row>
    <nut-row>
        <nut-col>
            <nut-input placeholder="请输入金额（支持小数)" @click="numberVisible = true" v-model="number" type="digit" />
        </nut-col>
    </nut-row>
    <nut-row>
        <nut-col>
            <nut-cell title="选择日期" :desc="popupDesc" @click="show = true"></nut-cell>
        </nut-col>
    </nut-row>
</div>

    <nut-row>
        <nut-col>
            <nut-button class="btn" type="success" @click="submitTransaction" block>提交</nut-button>
        </nut-col>
    </nut-row>
    <nut-number-keyboard
    type="rightColumn"
    v-model="number"
    v-model:visible="numberVisible"
    :custom-key="customKey"
    maxlength="12"
    @input="input"
    @close="closeNumber"
  >
  </nut-number-keyboard>
    <nut-popup position="bottom" v-model:visible="show">
        <nut-date-picker v-model="currentDate" type="year-month" :min-date="minDate" :max-date="maxDate"
            @confirm="popupConfirm" :is-show-chinese="true">
        </nut-date-picker>
    </nut-popup>
</div>
</template>
<script setup>
import { ref,reactive } from 'vue';
import Taro from '@tarojs/taro'
import myNavbar from '../../compoment/navbar.vue'
const customKey = reactive(['.']);
const numberVisible = ref(false);
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
const currentDate = ref(new Date());
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

function click() {
    
}
function closeNumber(){
    numberVisible.value  = false;
}
function input (){

}
const submitTransaction = () => {
    if(name.value===''||number.value===''||currentDate.value===''||value.value===''){
        Taro.showToast({
            title: '请填写必要的录入信息',
            icon: 'none',
            duration: 2000
        })
    }
    else{
        Taro.request({
        url: 'http://101.200.32.224:3000/financial/wages/add',
        method: 'POST',
        data: {
            name: name.value,
            money: number.value,
            date: currentDate,
            type: value.value.toString(),
            company:Taro.getStorageSync('company').toString(),
        }
    }).then(res => {
        Taro.showToast({
            title: '提交成功，请等待审核',
            icon: 'none',
            duration: 1000
        })
        setTimeout(() => {
            Taro.navigateBack();
        }, 1000);
        
    }).catch((err) => {
        Taro.showToast({
            title: '网络异常',
            icon: 'none',
            duration: 2000
        })
    })
    }
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
    margin:auto;
    width: 200px;
}
</style>