import {Editor} from '@tiptap/react'
import {IRichTextLinkData} from 'types/types'

export const removeLink = (editor: Editor) => {
  editor.chain().focus().unsetLink().run()
}

const getSelectedText = (editor: Editor) => {
  const { from, to, empty } = editor.state.selection

  if (empty) {
    return null
  }

  return editor.state.doc.textBetween(from, to, ' ')
}

export const insertLink = (editor: Editor, {title, href}: IRichTextLinkData) => {
  title = title?.trim() || href
  editor.commands.insertContent({
    type: 'text',
    text: title ?? '',
    marks: [{
      type: 'link',
      attrs: { href }
    }]
  })
}

export const getLinkDetails = (editor: Editor): IRichTextLinkData => {
  const result: IRichTextLinkData = { href: null, title: null }

  if (editor.isActive('link')) {
    result.href = editor.getAttributes('link').href
    editor.chain().focus().extendMarkRange('link').run()
  }
  // needs to be done here so that we can get title for current link after selection
  result.title = getSelectedText(editor)
  return result
}
