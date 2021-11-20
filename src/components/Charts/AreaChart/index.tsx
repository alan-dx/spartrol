import dynamic from 'next/dynamic';
import React from 'react';
import { ApexOptions } from 'apexcharts'

import { eachDayOfInterval, subDays } from 'date-fns';

import styles from './styles.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

interface AreaChartProps {
  data: number[]
} 

export function AreaChart({data = []}: AreaChartProps) {

  let datesInterval = React.useMemo(() => {

    return eachDayOfInterval({
      start: subDays(new Date(), data.length - 1),
      end: new Date()
    })
    
  }, [data.length])//make it clear date.length
  
  const options: ApexOptions = {
    chart: {
      id: "area-chart",
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
      categories: datesInterval.map(date => date.getUTCDate()),
    }
  }
  
  const series = [
    { name: 'Valor',  data: data}
  ]

  return (
    <div className={styles.chart__container} >
      <Chart options={options} series={series} type="area" height="100%" />
    </div>
  )
}