export interface UploadButton {
  [name: string]: {
    handler: (data: Array<string>) => void
    clearHandler: () => void
    disabled: boolean
  }
}
