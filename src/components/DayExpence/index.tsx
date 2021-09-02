import useWindowDimensions from '../../hooks/useWindowDimensions'
import { ProgressBar } from '../ProgressBar'
import dynamic from 'next/dynamic'
import styles from './styles.module.scss'
import { ApexOptions } from 'apexcharts'
import { useMemo } from 'react'

interface DayExpenceProps {
  daySpent?: string;
  monthSpent?: number;
}

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

var options = {
  plotOptions: {
    radialBar: {
      offsetY: -20,
      hollow: {
        margin: 0,
        size: "60%"
      },
      dataLabels: {
        showOn: "always",
        name: {
          offsetY: 0,
          show: true,
          color: "#8C8C8C",
          fontSize: "0.7rem",
          fontFamily: "Poppins",
        },
        value: {
          color: "#303030",
          fontSize: "1.2rem",
          fontWeight: "bold",
          fontFamily: "Poppins",
          show: true,
          offsetY: 7
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
    lineCap: "round"
  },
  labels: ["% Meta mensal"],

} as ApexOptions

export function DayExpence({daySpent, monthSpent}: DayExpenceProps) {

  // const windowSize = process.browser ? useWindowDimensions() : {width: 0, height: 0}
  const windowSize = useWindowDimensions()

  const monthTarget = 100.00

  const monthTargetFormatted = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(monthTarget).replace(/\s/g, '')

  const chartSeries = useMemo(() => {
    return Number(monthSpent/monthTarget * 100).toFixed(2)
  }, [monthSpent])

  const monthSpentFormatted = useMemo(() => {
    return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(monthSpent).replace(/\s/g, '')
  }, [monthSpent])

  return (
    <div className={styles.container}>
      <div className={styles.container__day_spent_info}>
        <span>Hoje, você gastou:</span>
        <strong>
          {daySpent ? daySpent : "R$0,00"}
        </strong>
      </div>
      {
        windowSize.width < 768 
        ?
          <ProgressBar monthSpent={monthSpentFormatted} /> 
        :
        <>
          <Chart options={options} series={[chartSeries]} type="radialBar" height={250} />
          {/* utilizar div aq causa um bug */}
          <section className={styles.container__target_info}>
            <div className={styles.container__target_info__month_spent}><span>{monthSpentFormatted} <br /> <span>gastos este mês</span></span></div>
            <div className={styles.container__target_info__month_spent}><span>{monthTargetFormatted} <br /> <span>meta mensal</span></span></div>
          </section>
        </> 
      }
    </div>
  )
}