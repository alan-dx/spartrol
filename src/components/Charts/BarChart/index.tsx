import dynamic from 'next/dynamic';
import React from 'react';
import { ApexOptions } from 'apexcharts'

import styles from './styles.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

interface BarChartProps {
  data: []
} 

export function BarChart({ data }:BarChartProps) {

  const options: ApexOptions = {
    chart: {
      id: "bar-chart",
      toolbar: {
        show: false
      },
      foreColor: '#303030',
      fontFamily: "Poppins",
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: ['#79c9c9'],
      width: 3,
      dashArray: 0,      
    },
    theme: {
      mode: 'light', 
      palette: 'palette1', 
      monochrome: {
          enabled: true,
          color: '#79c9c9',
          shadeTo: 'light',
          shadeIntensity: 0.65
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: [19, 20, 21, 22, 23, 24, 25, 26],
    }
  }
  
  const series = [
    { name: 'Soma',  data: data.map((item: any) => item.value)}
  ]

  return (
    <div className={styles.chart__container} >
      <Chart options={options} series={series} type="bar" height="100%" />
    </div>
  )
}