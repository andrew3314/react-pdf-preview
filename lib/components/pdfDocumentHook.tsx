import { useState, useEffect } from "react"
import PdfDocument from "../core/PdfDocument"
import pdfjs from "../core/pdfJsWorker"
import PageCache from "../core/PageCache"

interface usePdfDocumentProps{
  pdf: PdfDocument | null
  status: string | null
}
export default function usePdfDocument(url: string): usePdfDocumentProps {
  const [pdf, setPdf] = useState<PdfDocument | null>(null)
  const [status, setStatus] = useState<string | null>('loading')
  async function loadPdf(cancelled: boolean){
    pdfjs.getDocument(url).promise.then(d => {
      if (cancelled) return
      
      const cache = new PageCache()
      setPdf(new PdfDocument(d, cache))
      setStatus('loaded')
      console.log(pdf)

    }).catch((reason: any) =>{
      setStatus(`error: ${reason}`)
      return {
        pdf, status
      }
    })
  }
  useEffect(() => {
    let cancelled = false
    loadPdf(cancelled)
    
    return () => {
      cancelled = true
    }
  }, [url])
  return {pdf, status}
}