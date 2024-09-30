import { useSetAtom } from "jotai";
import { uiAtom } from "../State";
import '../overlays.css'

export default function Modal({ newQuiz, closeModal }) {
  const setUI = useSetAtom (uiAtom)

  return(
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
  )
}