import { 
  FiHome,
  FiPieChart,
  FiAward,
  FiPackage
} from 'react-icons/fi';

export function getNavbarIcon(name: string) {
  switch (name) {
    case 'Home':
      return <FiHome />      
    case 'Relatórios':
      return <FiPieChart />
    case 'Objetivos':
      return <FiAward />
    default:
      return <FiPackage />
  }
}