import { Editor } from '@tiptap/react'
import Icon from '@mdi/react'
import {
  mdiFormatBold, mdiFormatItalic,
  mdiFormatListBulleted, mdiFormatListNumbered, mdiUndo, mdiRedo
} from '@mdi/js'
import { colors } from 'styles/variables'
import { ReactElement } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import FormatBoldSvg from '@/components/svg/FormatBoldSvg'
import FormatItalicSvg from '@/components/svg/FormatItalicSvg'
import FormatListNumberedSvg from '@/components/svg/FormatListNumberedSvg'
import UndoSvg from '@/components/svg/UndoSvg'
import RedoSvg from '@/components/svg/RedoSvg'
interface Props {
  editor?: Editor | null
  onEditLink: () => void
}
const ToolbarButton = ({ onClick, children, isActive, disabled }: { onClick: () => void, children: ReactElement, isActive?: boolean, disabled?: boolean }) => {
  return (<div
    onClick={!disabled ? onClick : undefined}
    className={classNames(styles.button, { [styles.active]: isActive, [styles.disabled]: disabled })}
  >
    {children}
  </div>)
}
const IconToolbar = ({ path }: { path: string }) => {
  return <Icon path={path}
    size={1}
    color={colors.black} />

}
export default function RichTextToolbar({ editor, onEditLink }: Props) {
  if (!editor) {
    return null
  }

  return (
    <div className={styles.root}>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <FormatBoldSvg color={colors.textPrimary} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <FormatItalicSvg color={colors.textPrimary} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      >
        <IconToolbar path={mdiFormatListBulleted} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      >
        <FormatListNumberedSvg color={colors.textPrimary} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <UndoSvg color={colors.textPrimary} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <RedoSvg color={colors.textPrimary} />
      </ToolbarButton>
    </div>
  )
}
