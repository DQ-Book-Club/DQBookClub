import { ChangeEventHandler, useRef } from "react"

type ImageUploadButtonProps = {
  onUploadFile: ChangeEventHandler<HTMLInputElement>
}

export default function ImageUploadButton(props: ImageUploadButtonProps) {
  const fileInput = useRef<HTMLInputElement>(null)

  function handleClick() {
    fileInput.current?.click()
  }

  return (<>
    <button className="upload-button" onClick={handleClick}>Upload</button>
    <input ref={fileInput} type="file" style={{ display: 'none' }} id="upload-photos"
      accept="image/*" onChange={props.onUploadFile} />
  </>)
}