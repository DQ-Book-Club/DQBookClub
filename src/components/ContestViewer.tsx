import dynamic from 'next/dynamic'

type ContestViewerProps = {
  onClose: () => void
  images?: { src: string }[]
  activeIndex?: number
  showViewer: boolean
}

// https://github.com/infeng/react-viewer#server-side-nextjs
const ReactViewer = dynamic(
  () => import('react-viewer'),
  { ssr: false }
)


export default function ContestViewer(props: ContestViewerProps) {
  return (
    <ReactViewer
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
