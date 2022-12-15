import { File } from 'akar-icons'
import Link from 'next/link'
import styles from './NavigationBar.module.css'

const NavigationBar = () => (
  <nav className={styles.nav}>
    <Link href="/"><span className={styles.navSpan}>DQ Book Club</span></Link>
    <Link className="akar-icon" href="/notes/"><File /></Link>
  </nav>
)
export default NavigationBar