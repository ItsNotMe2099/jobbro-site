import { useEffect } from 'react'
import {FormikProps} from 'formik'
import * as Scroll from 'react-scroll'
import Converter from '@/utils/converter'
export default function useFormErrorScroll(
  formik: FormikProps<any>,
  offset: number
): void {
  useEffect(() => {
    if (!formik.isSubmitting) return
    try {
      const errors = Converter.getObjectDotsKeys(formik.errors)

      if (errors.length > 0) {
        const name = errors[0]
        let byAttribute = document.querySelectorAll(`[data-field="${name}"]`)
        const byAttributeLabel = document.querySelectorAll(`[data-field-label="${name}"]`)
        if(byAttributeLabel){
          byAttribute = byAttributeLabel
        }
        if (byAttribute.length > 0) {
          const rect = byAttribute[0]?.getBoundingClientRect()
           byAttribute[0].scrollIntoView()
          setTimeout(() => {
            Scroll.animateScroll.scrollMore(offset)

          }, 100)

        }
        const byName = document.getElementsByName(name)
        if (byName.length > 0) {
          return byName[0].focus()
        }

      }
    } catch (e) {
      console.error(e)
    }
  }, [formik])
}
