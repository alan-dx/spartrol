import dynamic from 'next/dynamic'
import styles from './styles.module.scss'
import { ApexOptions } from 'apexcharts'

interface HomePieChartProps {
  monthSpent: number;
  monthTarget: number;
}

var options = {
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "60%"
      },
      dataLabels: {
        showOn: "always", 
        name: {
          offsetY: -5,
          show: true,
          color: "#8C8C8C",
          fontSize: "0.67rem",
          fontFamily: "Poppins",
        },
        value: {
          color: "#303030",
          fontSize: "1rem",
          fontWeight: "600",
          fontFamily: "Poppins",
          show: true,
          offsetY: 0
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
  labels: ["Meta mensal"],

} as ApexOptions

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

export const HomePieChart = ({monthSpent, monthTarget}:HomePieChartProps) => {

  //formatar no useStatement
  const monthTargetFormatted = monthTarget ? new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(monthTarget) : new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(0.0)

  const monthSpentFormatted = monthSpent ? new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(monthSpent) : new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(0.0)

  const chartSeries = monthSpent ? Number(monthSpent/monthTarget * 100).toFixed(2) : 0
  
  return (
    <>
    <Chart options={options} series={[chartSeries]} type="radialBar" height={220} />
    {/* utilizar div aq causa um bug */}
    <section className={styles.container__target_info}>
      <div className={styles.container__target_info__month_spent}>
        <span>{monthSpentFormatted} <br /> <span>gastos este m??s</span></span>
      </div>
      <div className={styles.container__target_info__month_spent}>
        <span>{monthTargetFormatted} <br /> <span>meta mensal</span></span>
      </div>
    </section>
  </> 
  )
}
