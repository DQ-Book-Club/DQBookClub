import { ChangeEvent, Component } from "react";
import './PhotoDrawer.css';
import { storage, auth } from '../services/firebaseServices'
import { ref, StorageReference, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

type FilePreview = Pick<File, 'name'> & { src: string }

type PhotoDrawerState = {
  photosToUpload?: FilePreview[]
  userPhotoUrls?: string[]
}

export default class PhotoDrawer extends Component<{}, PhotoDrawerState> {
  private userFolder: StorageReference 
  constructor(props: any) {
    super(props)

    this.inspectPhotos = this.inspectPhotos.bind(this)
    this.state = {}
    this.userFolder = ref(storage, auth.currentUser?.uid)
  }

  async componentDidMount() {
    const userImages = await listAll(this.userFolder)
    const urls: string[] = []
    const userPhotoUrls = await Promise.all(userImages.items.map((item) => getDownloadURL(item)))
    this.setState({ userPhotoUrls })
  }

  passClickToInput() {
    document.getElementById('upload-photos')?.click()
  }

  async inspectPhotos(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return

    const newUrls = []
    for (let file of event.target.files) {
      let fileRef = ref(this.userFolder, file.name)
      const uploadResult = await uploadBytes(fileRef, file)
      newUrls.push(await getDownloadURL(uploadResult.ref))
    }

    this.setState({
      userPhotoUrls: [...this.state.userPhotoUrls || [], ...newUrls]
    })
  }


  render() {
    // Input for files is ugly. Hide it an wire it up to a button.
    return (
      <div className="photo-drawer">
        {this.state.userPhotoUrls?.map(photoUrl => (
          <img draggable key={photoUrl} src={photoUrl} />
        ))}
        <button className="upload-button" onClick={this.passClickToInput}>Upload</button>
        <input type="file" style={{ display: 'none' }} id="upload-photos"
               accept="image/*" multiple onChange={this.inspectPhotos} />
      </div> 
    )
  }
}