import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="player"
export default class extends Controller {
  static values = {
    url: String,
    comments: Array
  }
  static targets = ["waveform"]

  async connect() {
    this._decoded = false
    this._pendingComments = []

    const { default: WaveSurfer } = await import("wavesurfer.js")
    const { default: Regions } = await import('wavesurfer.js/dist/plugins/regions.esm.js')
    
    this.regions = Regions.create()

    this.waveSurfer = WaveSurfer.create({
      container: this.waveformTarget,
      waveColor: "#4F4A85",
      progressColor: "#F76E11",
      url: this.urlValue,
      plugins: [this.regions]
    })

    this.waveSurfer.on('decode', () => {
      this._decoded = true

      this.commentsValue.forEach((comment, _index) => {
        this.regions.addRegion({
          start: Number(comment.timestamp),
          color: 'grey',
          commentId: comment.id
        })
      })

      // If any comments were saved before the audio finished decoding, render them now.
      if (this._pendingComments.length > 0) {
        this._pendingComments.forEach((comment) => this._addRegionForComment(comment))
        this._pendingComments = []
      }

      this.regions.on("region-clicked", (region, e) => {
        e.stopPropagation()
        const comment = "hi"
        // seek playback to the region start
        this.waveSurfer.seekTo(region.start / this.waveSurfer.getDuration())
        console.log("seeked")
        // show UI using comment (preview, etc.)
      })
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


  addCommentLocally(comment) {
    // Keep the Stimulus value in sync so a future refresh/reconnect is consistent.

    const timestampToInsert = Number(comment.timestamp)
    const list = [...(this.commentsValue ?? [])]

    let insertAt = list.length
    for (let i = 0; i < list.length; i++) {
      if (Number(list[i].timestamp) > timestampToInsert) {
        insertAt = i
        break
      }
    }
    list.splice(insertAt, 0, comment)
    this.commentsValue = list

    if (!this._decoded) {
      this._pendingComments.push(comment)
      return
    }

    this._addRegionForComment(comment)
  }

  _addRegionForComment(comment) {
    // Avoid duplicates if something calls addCommentLocally twice.
    const existing = this.regions
      ?.getRegions?.()
      ?.some((r) => String(r.commentId) === String(comment.id))
    if (existing) return

    this.regions.addRegion({
      start: Number(comment.timestamp),
      color: 'grey',
      commentId: comment.id
    })
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