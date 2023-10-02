import { Preset } from 'types/enums'
import IFile from 'data/interfaces/IFile'
import ImageHelper from 'utils/ImageHelper'

export default function imagePreloader(file: IFile, preset: Preset): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = ImageHelper.urlFromFile(file, preset)
    img.onload = () => {
      resolve()
    }
  })
}
