import { File } from 'akar-icons'
import { Component } from "react";
import "./NavigationBar.css"

export default class NavigationBar extends Component<{}> {
  render() {
    return (
      <nav>
        <span>DQ Book Club</span>
        <a className="akar-icon" href="/notes/"><File /></a>
      </nav>
    )
  }
}
