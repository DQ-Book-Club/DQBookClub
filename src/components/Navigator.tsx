import { Component } from "react";
import ContestList from "./ContestList";
import PhotoDrawer from "./PhotoDrawer";

export default class Navigator extends Component {

  render() {
    return (
      <>
        <ContestList />
        <PhotoDrawer />
      </>
    )
  }
}