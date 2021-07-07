import styles from './styles.module.scss'
import { FiMenu } from 'react-icons/fi'
import { useContext } from 'react'
import { SidebarContext } from '../../contexts/SidebarContext'

export function Header() {
  
  const { toogleSideBar } = useContext(SidebarContext)

  return (
    <header className={styles.container}>
      <button onClick={toogleSideBar}>
        <FiMenu size={40} color="#4F4F4F" />
      </button>
    </header>

  )
}