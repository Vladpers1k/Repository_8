function SwipeCarousel() {
  Carousel.apply(this, arguments)
  this.slidesContainer = this.container.querySelector('#slides-container')
}

SwipeCarousel.prototype = Object.create(Carousel.prototype)
SwipeCarousel.prototype.constructor = SwipeCarousel

SwipeCarousel.prototype._initListeners = function () {
  Carousel.prototype._initListeners.apply(this)

  this.container.addEventListener('touchstart', this.swipeStartHandler.bind(this))
  this.container.addEventListener('mousedown', this.swipeStartHandler.bind(this))
  this.container.addEventListener('touchend', this.swipeEndHandler.bind(this))
  this.container.addEventListener('mouseup', this.swipeEndHandler.bind(this))
}

SwipeCarousel.prototype.swipeStartHandler = function (e) {
  this.startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX
}

SwipeCarousel.prototype.swipeEndHandler = function (e) {
  this.endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX

  const deltaX = this.endPosX - this.startPosX

  if (deltaX > 50) this.prev()
  if (deltaX < -50) this.next()
}
