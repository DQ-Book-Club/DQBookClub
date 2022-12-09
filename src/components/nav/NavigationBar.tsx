import { File } from 'akar-icons'
import styles from './NavigationBar.module.css'

const NavigationBar = () => (
  <nav className={styles.nav}>
    <span className={styles.navSpan}>DQ Book Club</span>
    <a className="akar-icon" href="/notes/"><File /></a>
  </nav>
)
export default NavigationBar