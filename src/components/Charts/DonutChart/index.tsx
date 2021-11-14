import dynamic from 'next/dynamic';
import React from 'react';
import { ApexOptions } from 'apexcharts'

import styles from './styles.module.scss';

import { Wallet } from '../../../@types/Wallet';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

interface DonutChartProps {
  data: Wallet[] 
}

export function DonutChart({ data = [] }: DonutChartProps) {

  const options: ApexOptions = {
    plotOptions: {
      pie: {
        donut: {
          size: '50%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "0.8rem",
              fontFamily: "Poppins",
            },
            value: {
              color: "#303030",
              fontSize: "0.8rem",
              fontWeight: "600",
              fontFamily: "Poppins",
              show: true,
              offsetY: -10,
              formatter: (percent: string) => `${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Number(percent))}`
            },
          }
        }
      }
    },
    labels: data.map(wallet => wallet.title),
    legend: {
      show: true,
      position: 'bottom',
      fontWeight: "600",
      fontFamily: "Poppins",
      horizontalAlign: 'center',
      offsetX: 300,
    },
    responsive: [{
      breakpoint: 768,
      options: {
        legend: {
          position: 'right',
          offsetX: 15
        },
        chart: {
          animations: {
            enabled: false
          }
        }
      },
    }]
  }
  
  const series = data.map(wallet => Number(wallet.value.toFixed(2)))

  return (
    <div className={styles.chart__container} >
      <Chart options={options} series={series} type="donut" height="100%" />
    </div>
  )
}