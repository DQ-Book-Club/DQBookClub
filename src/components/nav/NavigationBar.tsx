import { File } from 'akar-icons'
import "./NavigationBar.css"

const NavigationBar = () => (
  <nav>
    <span>DQ Book Club</span>
    <a className="akar-icon" href="/notes/"><File /></a>
  </nav>
)
export default NavigationBar