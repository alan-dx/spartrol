import { HomePieChart } from "../components/Charts/HomePieChart";
import { Header } from "../components/Header";

export default function Metrics() {
  return (
    <>
      <Header />
      <HomePieChart monthSpent={400} monthTarget={600} />
    </>
  )
}