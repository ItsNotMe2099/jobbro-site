import styles from './index.module.scss'
import Link from 'next/link'

import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown'
import classNames from 'classnames'
import React from 'react'
interface Props {
  linkClassName?: string
  children: string
}

export default function MarkdownText(props: Props) {

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        p: ({ children }) => (
          <p className={styles.paragraph}>{children}</p>
        ),
        a: ({ node, ...itemProps }) => {
          console.log('props: ', { itemProps })
          const linkChildren = Array.isArray(itemProps.children) ? itemProps.children : [itemProps.children]
          const firstChild = linkChildren[0]
          return (
            <Link href={itemProps.href as string} target={
              itemProps.href?.includes('https') ? '_blank' : '_self'
            } className={classNames(styles.link, props.linkClassName)} >
              {firstChild}
            </Link>
          )
        },
      }}
    >
      {props.children}
    </ReactMarkdown>
  )
}
