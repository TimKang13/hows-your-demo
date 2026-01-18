import { Controller } from "@hotwired/stimulus"
import { postFormJSON } from "utils/rails_fetch"

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

  async submit(e) {

    e.preventDefault()

    this.stamp()

    const form = e.target

    try {
      const comment = await postFormJSON(form)
      console.log("Comment: ", comment)
      this.playerOutlet.addCommentLocally(comment)
    } catch (err) {
      console.error("Failed to save comment", err)
      return
    }

    if (this.hasCommentInputTarget) this.commentInputTarget.value = ""
    if (this.hasTimestampInputTarget) this.timestampInputTarget.value = ""
    if (this.hasCommentBoxTarget) this.commentBoxTarget.hidden = true
  }

  showCommentBox() {
    const shouldShow = this.commentBoxTarget.hidden
    this.commentBoxTarget.hidden = !shouldShow
    if (shouldShow && this.hasCommentInputTarget) {
      this.commentInputTarget.focus()
    }
  }
}