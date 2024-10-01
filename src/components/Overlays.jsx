import { createPortal } from 'react-dom'
import { useAtom } from 'jotai'
import { uiAtom } from '../State'

const mountElement = document.getElementById('overlays')

 const Overlays = ({ newQuiz, closeModal }) => {

  const modal = 
  <div className="modal">
    <h1>Are you sure you want a new quiz?</h1>
    <div className="btn-container">
      <button className="btn-primary" onClick={newQuiz}>
        Yes
      </button>
      <button className="btn-secondary" onClick={closeModal}>
        No
      </button>

    </div>
  </div>

  const [ui] = useAtom(uiAtom)
  
  return createPortal(
    ui.modal && 
    <>
      {modal}
    </>, 
    mountElement
  )
}

export default Overlays