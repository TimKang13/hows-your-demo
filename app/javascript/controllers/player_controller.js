import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="player"
export default class extends Controller {
  static values = {
    url: String,
  }
  static targets = ["waveform"]

  async connect() {
    const { default: WaveSurfer } = await import("wavesurfer.js")
    
    this.waveSurfer = WaveSurfer.create({
      container: this.waveformTarget,
      waveColor: "#4F4A85",
      progressColor: "#F76E11",
      url: this.urlValue,
    })

    this._onKeyDown = (e) => {
      if (e.code == "Space") {
        const t = e.target
        const tag = t?.tagName
        const isTypingTarget =
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT" ||
            t?.isContentEditable

        if (isTypingTarget) return

        e.preventDefault()
        this.playPause()
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

  getCurrentTimestamp(){
    return this.waveSurfer?.getCurrentTime?.() ?? 0
  }

  playPause() {
    this.waveSurfer.playPause()
  } 
}