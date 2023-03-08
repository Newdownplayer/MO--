import { defineComponent, onMounted, ref } from "vue";
import * as echarts from 'echarts';
import s from './LineChart.module.scss';
export const LineChart = defineComponent({
    setup: (props, context) => {
        const refDiv = ref<HTMLDivElement>()
        onMounted(() => {
            // 基于准备好的dom，初始化echarts实例
            if (!refDiv.value) { return }
            var myChart = echarts.init(refDiv.value);
            // 绘制图表
            myChart.setOption({
                grid: [{ left: 30, top: 15, right: 0, button: 20 }],
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line'
                    }
                ]
            });
        })
        return () => (
            <div ref={refDiv} class={s.wrapper}></div>
        )
    }
})