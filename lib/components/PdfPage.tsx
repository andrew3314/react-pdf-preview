import { useEffect, useRef } from "react"
import type PdfDocument  from "../core/PdfDocument"
import type { RowComponentProps } from "react-window"


export default function PdfPage({ index, pdf, style, scale }: RowComponentProps<{pdf: PdfDocument, scale: number}>){
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    pdf.renderPageToCanvas(index + 1, scale).then(canvas => {
      if (cancelled) return

      const container = containerRef.current!
      container.innerHTML = ""
      container.style.display = 'flex'
      container.style.justifyContent = 'center'
      container.appendChild(canvas)
    })

    return () => {
      cancelled = true
    }
  }, [pdf, index, scale])

  return (
    <div style={style} ref={containerRef} />
  )
}
