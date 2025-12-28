import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="comment"
export default class extends Controller {

  static outlets = ["player"]
  static targets = [
    "commentBox",
    "commentInput",
    "timestampInput"
  ]

  async connect() {
    
    this._onKeyDown = (e) => {
        console.log(e)
        if (e.code == "Enter") {
            const t = e.target
            const tag = t?.tagName
            const isTypingTarget =
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                tag === "SELECT" ||
                t?.isContentEditable

        if (isTypingTarget) return

        e.preventDefault()
        this.showCommentBox()
      }
    }

    window.addEventListener("keydown", this._onKeyDown)
  }

  disconnect() {
    if (this._onKeyDown) {
      window.removeEventListener("keydown", this._onKeyDown)
      this._onKeyDown = null
    }
  }

  stamp(){
    const t = this.playerOutlet.getCurrentTimestamp()
    console.log(t)
    this.timestampInputTarget.value = Number.isFinite(t) ? t.toFixed(3) : ""
  }

  showCommentBox() {
    const shouldShow = this.commentBoxTarget.hidden
    this.commentBoxTarget.hidden = !shouldShow
    if (shouldShow && this.hasCommentInputTarget) {
      this.commentInputTarget.focus()
    }
  }
}