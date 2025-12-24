import './App.css'
import book from '../public/qm.pdf'
import {usePdfDocument, PageList} from '../lib/main'

function App() {
  const loadPdfDocument = usePdfDocument(book)
  return (
    <div style={{overflow: 'hidden', height: '100vh', display: 'flex', justifyContent: 'center'}}>
      <PageList loadPdfDocument={loadPdfDocument} scale={1}/>
    </div>
  )
}

export default App
