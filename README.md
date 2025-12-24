# react-pdf-preview
## How to use it
Install it with   `npm i @andrew3314/react-pdf-preview`
Then, you can use it in your react component as follows:
```
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
```

## Project structure
Inside src folder you can find a minimal example of the library in usage. In the lib folder, you can find the components and core tools exported by the library. 
