import dynamic from 'next/dynamic';
import React from 'react';
import { ApexOptions } from 'apexcharts'

import styles from './styles.module.scss';

import { Categories } from '../../../@types/Categories';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

interface BarChartProps {
  data: [string, number][][];
  categories: Categories["gain" | "spent"]
} 

export function BarChart({ data, categories }:BarChartProps) {

  const XAxisCategories = new Map()

  data.forEach((category_sum_by_day) => {//sum all values by category at the period
    category_sum_by_day.forEach((category_sum) => {
      XAxisCategories.set(
        category_sum[0],
        XAxisCategories.has(category_sum[0]) ? XAxisCategories.get(category_sum[0]) + category_sum[1] : category_sum[1]
      )
    })
  })


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
      categories: Array.from(XAxisCategories.keys()).map(category_id => {
        return categories.find(category => category_id === category.ref['@ref'].id).data.title
      }),
      labels: {
        trim: true,
        style: {
          fontSize: '0.7rem'
        }
      }
    }
  }
  
  const series = [
    { name: 'Soma',  data: Array.from(XAxisCategories.values()).map(value => value.toFixed(2))}
  ]



  return (
    <div className={styles.chart__container} >
      <Chart options={options} series={series} type="bar" height="100%" />
    </div>
  )
}