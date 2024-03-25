import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

function DataVisualization({ requestData }) {
    // Parse the data string into an array of objects
    // console.log(requestData);
    const data = JSON.parse(requestData.data);

    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    // Extract keys from each object in the data array
    const keys = Object.keys(data[0]);
    const resx = data.map(item => item[keys[0]]);
    const [selectedPlotType, setSelectedPlotType] = useState('line'); // Default plot type
    const seriesData = keys.slice(1).map((key) => ({
        name: key,
        type: selectedPlotType,
        data: data.map((item) => item[key]),
      }));

    console.log("seriesData", seriesData.length);
    // ECharts options
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
                saveAsImage: { name: data.filename }
            }
        },
        xAxis: {
            name: 'Cycle_Number', 
            type: 'category',
            data: resx, 
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
            left: 10
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 65,
                end: 85
            },
            {
                type: 'inside',
                realtime: true,
                start: 65,
                end: 85
            }
        ]
    };

    // Event handler for changing plot type
    const handlePlotTypeChange = (value) => {
        setSelectedPlotType(value);
    };

    return (
        <div  className='border p-5'>
            <ReactECharts  notMerge={true}
  lazyUpdate={true} option={options} />
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
