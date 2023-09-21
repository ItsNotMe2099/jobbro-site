import {Editor} from '@tiptap/react'
import Icon from '@mdi/react'
import { mdiFormatBold, mdiFormatQuoteClose,mdiFormatItalic, mdiFormatUnderline, mdiFormatListBulleted,mdiFormatListNumbered, mdiUndo, mdiRedo, mdiLinkVariant, mdiFormatClear, mdiFormatHeader2, mdiFormatHeader3, mdiFormatHeader4, mdiFormatHeader5, mdiFormatHeader6 } from '@mdi/js'
import {Level} from '@tiptap/extension-heading'
import {colors} from 'styles/variables'
import {ReactElement} from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
interface Props {
  editor?: Editor | null
  onEditLink: () => void
}
const HeadingButton = ({editor, level, path}: {editor: Editor, level: Level, path: string}) => (
  <ToolbarButton
    onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
    isActive={editor.isActive('heading', {level})}
  >
    <IconToolbar path={path}/>
  </ToolbarButton>
)
const ToolbarButton = ({onClick, children, isActive, disabled}: {onClick: () => void, children: ReactElement, isActive?: boolean, disabled?: boolean}) => {
 return ( <div
    onClick={!disabled ? onClick : undefined}
    className={classNames(styles.button, {[styles.active]: isActive, [styles.disabled]: disabled})}
  >
    {children}
  </div>)
}
const IconToolbar = ({path}: {path: string}) => {
  return  <Icon path={path}
                size={1}
                color={colors.black}/>

}
export default function RichTextToolbar({editor, onEditLink}: Props) {
  if(!editor){
    return null
  }

  return (
    <div className={styles.root}>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <IconToolbar path={mdiFormatBold}/>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <IconToolbar path={mdiFormatItalic}/>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
      >
        <IconToolbar path={mdiFormatUnderline}/>
      </ToolbarButton>
      <HeadingButton editor={editor} level={2} path={mdiFormatHeader2} />
      <HeadingButton editor={editor} level={3} path={mdiFormatHeader3}/>
      <HeadingButton editor={editor} level={4} path={mdiFormatHeader4}/>
      <HeadingButton editor={editor} level={5} path={mdiFormatHeader5}/>
      <HeadingButton editor={editor} level={6} path={mdiFormatHeader6}/>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      >
        <IconToolbar path={mdiFormatListBulleted}/>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      >
        <IconToolbar path={mdiFormatListNumbered}/>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <IconToolbar path={mdiFormatClear}/>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <IconToolbar path={mdiUndo}/>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <IconToolbar path={mdiRedo}/>
      </ToolbarButton>
      <ToolbarButton
        onClick={onEditLink}
      >
        <IconToolbar path={mdiLinkVariant}/>
      </ToolbarButton>
      <ToolbarButton          onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} >
        <IconToolbar path={mdiFormatQuoteClose}/>
      </ToolbarButton>
    </div>
  )
}
