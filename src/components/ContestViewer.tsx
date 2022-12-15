import dynamic from 'next/dynamic'

type ContestViewerProps = {
  onClose: () => void
  images?: { src: string }[]
  activeIndex?: number
  showViewer: boolean
}

// https://github.com/infeng/react-viewer#server-side-nextjs
const Lightbox  = dynamic(
  () => import('yet-another-react-lightbox'),
  { ssr: false }
)


export default function ContestViewer(props: ContestViewerProps) {
  return (
    <Lightbox
      open={props.showViewer}
      close={props.onClose}
      slides={props.images}
      index={props.activeIndex}
      controller={{
        closeOnBackdropClick: true
      }}
    />
  )
}
