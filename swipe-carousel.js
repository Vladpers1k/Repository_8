import Carousel from './carousel.js'

class SwipeCarousel extends Carousel {
  constructor(...args) {
    super(...args)
    this.slidesContainer = this.slideItems[0]?.parentNode
  }

  _initListeners() {
    super._initListeners()
    this.container.addEventListener('touchstart', this._swipeStart.bind(this))
    this.container.addEventListener('mousedown', this._swipeStart.bind(this))
    this.container.addEventListener('touchend', this._swipeEnd.bind(this))
    this.container.addEventListener('mouseup', this._swipeEnd.bind(this))
  }

  _swipeStart(e) {
    this.startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX
  }

  _swipeEnd(e) {
    this.endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX

    const deltaX = this.endPosX - this.startPosX

    if (deltaX > 50) this.prev()
    if (deltaX < -50) this.next()
  }
}

export default SwipeCarousel
