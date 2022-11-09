import { ChangeEventHandler, useRef } from "react"

type ImageUploadButtonProps = {
  onUploadFile: ChangeEventHandler<HTMLInputElement>
  progressText?: string
  progress?: number
}

export default function ImageUploadButton(props: ImageUploadButtonProps) {
  props = { progressText: 'progress', ...props}
  const fileInput = useRef<HTMLInputElement>(null)

  function handleClick() {
    fileInput.current?.click()
  }

  return (<>
    {!props.progress && <button className="upload-button" onClick={handleClick}>Upload</button>}
    {!!props.progress && <>
      <label htmlFor="upload-progress">{props.progressText}</label>
      <progress id="upload-progress" className="btn" value={props.progress} max="1"></progress>
    </>}
    <input ref={fileInput} type="file" style={{ display: 'none' }} id="upload-photos"
      accept="image/*" onChange={props.onUploadFile} />
  </>)
}