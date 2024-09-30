import { createPortal } from 'react-dom'
import Modal from './Modal'
import { useAtom } from 'jotai'
import { uiAtom } from '../State'

const mountElement = document.getElementById('overlays')

 const Overlays = ({ newQuiz, closeModal }) => {
  const [ui] = useAtom(uiAtom)
  return createPortal(
    ui.modal && 
    <>
      <Modal
        newQuiz={newQuiz}
        closeModal={closeModal}
      />
    </>, 
    mountElement
  )
}

export default Overlays