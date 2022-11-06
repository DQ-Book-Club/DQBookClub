import Viewer from "react-viewer"

type ContestViewerProps = {
  onClose: () => void
  images?: { src: string }[]
  activeIndex?: number
  showViewer: boolean
}

export default function ContestViewer(props: ContestViewerProps) {
  return (
    <Viewer
      visible={props.showViewer}
      onClose={props.onClose}
      images={props.images}
      activeIndex={props.activeIndex}
      attribute={false}
      showTotal={false}
      noImgDetails={true}
      noToolbar={true}
      scalable={false}
      drag={true}
    />
  )
}
