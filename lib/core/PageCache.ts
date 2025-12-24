interface PageCacheInterface {
    get(
        pageNumber: number,
        scale: number
    ): HTMLCanvasElement | undefined

    set(
        pageNumber: number,
        scale: number,
        canvas: HTMLCanvasElement
    ): void

    clear(): void
}

export default class PageCache implements PageCacheInterface {
  private cache = new Map<string, HTMLCanvasElement>()

  private key(pageNumber: number, scale: number): string {
    return `${pageNumber}@${scale}`
  }

  get(pageNumber: number, scale: number) {
    return this.cache.get(this.key(pageNumber, scale))
  }

  set(pageNumber: number, scale: number, canvas: HTMLCanvasElement) {
    this.cache.set(this.key(pageNumber, scale), canvas)
  }

  clear() {
    this.cache.clear()
  }
}