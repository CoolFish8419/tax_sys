<template>
    <div class="page">
    <myNavbar :title="'展示图表'"></myNavbar>
    <view class="bar-chart ">
        <EChart ref="canvas" />
    </view>
</div>
</template>
  
<script setup>
import myNavbar from '../../compoment/navbar.vue'
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import { EChart } from "echarts4taro3";
const canvas = ref(null);
const options = {
    title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}


onMounted(() => {
    const echartComponentInstance = canvas.value; // 组件实例
    Taro.request({
        url: "http://101.200.32.224:3000/financial/transaction/data",
        method: "GET",
    }).then((res) => {
        options.series[0].data = res.data.list;
        // let firstValue = options.series[0].data.shift();
        // options.series[0].data.push(firstValue);

    })
    echartComponentInstance.refresh(options).then((myChart) => {
        myChart.setOption(options);
    });

    // myChart 即为 echarts 实例，可使用的实例方法，具体可参考 echarts 官网

});
</script>
  
<style>
.bar-chart {
    position: absolute;
    top: 150px;
    width: 100%;
    height: 100%;
}
.page {
    position: absolute;
    top: 0;
    left: 0;
    width: 750px;
    height: 1334px;
    background-image: url('https://s3.bmp.ovh/imgs/2023/12/13/b3f324c9a23bbaab.png');
    background-size: 100% 100%;
}

</style>
