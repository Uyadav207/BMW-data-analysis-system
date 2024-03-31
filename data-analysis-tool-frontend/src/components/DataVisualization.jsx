import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

function DataVisualization({ requestData }) {

    const [loading, setLoading] = useState(true);
    const data = JSON.parse(requestData.data);

    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    const keys = Object.keys(data[0]);
    const xAxisData = data.map(item => item[keys[0]]);
    const [selectedPlotType, setSelectedPlotType] = useState('line');

    const seriesData = keys.slice(1).map((key) => ({
        name: key,
        type: selectedPlotType,
        data: data.map((item) => item[key]),
    }));

    const options = {
        title: {
            text: requestData.filename,
            left: 'center'
        },
        grid: {
            left: 100,
            right: 100,
            bottom: 40,
            containLabel: true
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: { name: requestData.filename }
            }
        },
        xAxis: {
            name: keys[0],
            type: 'category',
            data: xAxisData,
            axisLabel: {
                interval: Math.ceil(xAxisData.length / 20), // Limit number of labels
                // formatter: function (value, index) {
                //     // Only display label for every 20th data point
                //     return index % 20 === 0 ? value : '';
                // }
            }
        },
        yAxis: {
            type: 'value',
        },
        series: seriesData,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: 'white',
                    color: 'black'
                }
            }
        },
        legend: {
            left: 10,
            selected: {},
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 4
            },
            {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 4
            }
        ]
    };

    const handlePlotTypeChange = (value) => {
        setSelectedPlotType(value);
    };

    const handleChartReady = () => {
        setLoading(false); // Set loading to false once chart is rendered
    };

    return (
        <div className='border p-5'>
            <ReactECharts option={options} lazyUpdate={true} notMerge={true} onChartReady={handleChartReady} showLoading={loading} />
            <div className='flex justify-center p-10'>
                <div className="p-1">
                    <select className='p-2' value={selectedPlotType} onChange={(e) => handlePlotTypeChange(e.target.value)}>
                        <option value="scatter">Scatter Plot</option>
                        <option value="line">Line Plot</option>
                        <option value="bar">Bar Plot</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default DataVisualization;
