import { ChangeEvent, Component } from "react";
import './PhotoDrawer.css';

type FilePreview = File & { src: string }

type PhotoDrawerState = {
  photosToUpload?: FilePreview[]
}

export class PhotoDrawer extends Component<{}, PhotoDrawerState> {
  constructor(props: any) {
    super(props)

    this.inspectPhotos = this.inspectPhotos.bind(this)
    this.state = {}
  }

  passClickToInput() {
    document.getElementById('upload-photos')?.click()
  }

  inspectPhotos(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return

    const photosToUpload = new Array<FilePreview>(event.target.files.length)
    for (let file of event.target.files) {
      const filePreview: FilePreview = { ...file, src: './book.svg' }
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          filePreview.src = e.target.result
          this.forceUpdate()
        }
      }
      reader.readAsDataURL(file);
      photosToUpload.push(filePreview)
    }

    this.setState({photosToUpload})
  }


  render() {
    // Input for files is ugly. Hide it an wire it up to a button.
    return (
      <div className="photo-drawer">
        {this.state.photosToUpload?.map(photo => <img key={photo.name} src={photo.src} />)}
        <button className="upload-button" onClick={this.passClickToInput}>Upload</button>
        <input type="file" style={{ display: 'none' }} id="upload-photos"
               accept="image/*" multiple onChange={this.inspectPhotos} />
      </div> 
    )
  }
}