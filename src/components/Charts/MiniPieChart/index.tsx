import React from 'react';
import dynamic from 'next/dynamic';

import { ApexOptions } from 'apexcharts';

interface MiniPieChartProps {
  monthSpent: number;
  monthTarget: number;
}

var options = {
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "50%"
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: false,
        },
      }
    }
  },
  fill: {
    type: "gradient",
    colors: ['#F03E35'],
    gradient: {
      shade: "dark",
      type: "horizontal",
      shadeIntensity: 1,
      gradientToColors: ["#e44138"],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 100]
    }
  },
  stroke: {
    lineCap: "round",
  }
  
} as ApexOptions

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

export function MiniPieChart({ monthSpent = 0, monthTarget = 1 }: MiniPieChartProps) {

  const chartSeries = Number(monthSpent/monthTarget * 100).toFixed(2)

  return (
    <div>
      <Chart
        options={options}
        series={[chartSeries]}
        type="radialBar"
        height={110} 
        width="40%"
      />
    </div>
  )
}