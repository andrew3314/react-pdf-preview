// core/PdfDocument.ts
import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist"
import type PageCache  from "./PageCache"

export default class PdfDocument {
    private pdf: PDFDocumentProxy
    private pageCache: PageCache

    constructor(pdf: PDFDocumentProxy, pageCache: PageCache) {
        this.pdf = pdf
        this.pageCache = pageCache
    }

    get numPages() {
        return this.pdf.numPages
    }

    async getPage(pageNumber: number): Promise<PDFPageProxy> {
        return await this.pdf.getPage(pageNumber)
    }

    async renderPageToCanvas(
    pageNumber: number,
    scale: number
    ): Promise<HTMLCanvasElement> {
        const cached = this.pageCache.get(pageNumber, scale)
        if (cached) {
            console.log(true)
            return cached
        }

        const page = await this.getPage(pageNumber)
        const viewport = page.getViewport({ scale })

        const canvas = document.createElement("canvas")
        canvas.className = 'pdf-layer__canvas'

        const ctx = canvas.getContext("2d")!

        canvas.width = viewport.width
        canvas.height = viewport.height

        await page.render({
            canvasContext: ctx,
            canvas,
            viewport
        }).promise

        this.pageCache.set(pageNumber, scale, canvas)

        return canvas
    }

}
