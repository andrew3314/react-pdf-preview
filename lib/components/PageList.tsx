import { List as List } from "react-window"
import PdfPage  from "./PdfPage"
import type PdfDocument from "../core/PdfDocument"
import { useEffect, useState, type JSX } from "react"

interface ViewerProps {
  loadPdfDocument: {pdf: PdfDocument | null, status: string | null}
  scale: number
  loadingComponent?: JSX.Element,
  errorComponent?: JSX.Element
}

export default function PageList({ loadPdfDocument, scale, loadingComponent = (<div>Loading...</div>), errorComponent = (<div>Something went wrong</div>) }: ViewerProps) {
    const [pagesHeights, setPageHeights] = useState<number[]>([])
    useEffect(()=>{
        loadPdfDocument.status === 'loaded' ? getAllPagesHeights() : null
    }, [loadPdfDocument, scale])
    async function getAllPagesHeights () {
        const heights: number[] = []

        for (let i = 1; i <= loadPdfDocument.pdf.numPages; i++) {
            const page = await loadPdfDocument.pdf.getPage(i)
            const viewport = page.getViewport({ scale })
            heights.push(viewport.height)
        }
        setPageHeights(heights)
    }

    function getPageHeight(index: number) {
        return pagesHeights[index]
    }

    function loadList(){
        if (loadPdfDocument.status === 'loading'){
            return <div>{loadingComponent}</div>
        } else if (loadPdfDocument.status === 'loaded'){
            return(
                <List
                    rowHeight={getPageHeight}
                    rowCount={loadPdfDocument.pdf.numPages}
                    overscanCount={3}
                    rowProps={{pdf: loadPdfDocument.pdf, scale}}      
                    rowComponent={
                        PdfPage
                    } 
                    style={{width: '100%'}}
                />
            )
        } else{
            return <div>{errorComponent}</div>
        }
    }
    return (
        <>
        {loadList()}
        </>
        
    )
}
