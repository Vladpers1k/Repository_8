function Carousel() {
  this.container = document.querySelector('#carousel')
  this.slides = this.container.querySelectorAll('.slide')
  this.indicatorsContainer = this.container.querySelector('#indicators-container')
  this.indicatorItems = this.container.querySelectorAll('.indicator')
  this.pauseButton = this.container.querySelector('#pause-btn')
  this.previousButton = this.container.querySelector('#prev-btn')
  this.nextButton = this.container.querySelector('#next-btn')

  this.CODE_ARROW_LEFT = 'ArrowLeft'
  this.CODE_ARROW_RIGHT = 'ArrowRight'
  this.CODE_SPACE = 'Space'
  this.INTERVAL = 2000

  this.currentSlide = 0
  this.isPlaying = true
  this.timerID = null
  this.startPosX = null
  this.endPosX = null
}

Carousel.prototype = {
  gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active')
    this.indicatorItems[this.currentSlide].classList.toggle('active')
    this.currentSlide = (n + this.slides.length) % this.slides.length
    this.slides[this.currentSlide].classList.toggle('active')
    this.indicatorItems[this.currentSlide].classList.toggle('active')
  },

  gotoPrev() {
    this.gotoNth(this.currentSlide - 1)
  },

  gotoNext() {
    this.gotoNth(this.currentSlide + 1)
  },

  tick() {
    this.timerID = setInterval(() => this.gotoNext(), this.INTERVAL)
  },

  PauseHandler() {
    if (!this.isPlaying) return
    this.pauseButton.textContent = 'Play'
    this.isPlaying = !this.isPlaying
    clearInterval(this.timerID)
  },

  playHandler() {
    this.pauseButton.textContent = 'Pause'
    this.isPlaying = !this.isPlaying
    this.tick()
  },

  pausePlayHandler() {
    this.isPlaying ? this.PauseHandler() : this.playHandler()
  },

  prevHandler() {
    this.PauseHandler()
    this.gotoPrev()
  },

  nextHandler() {
    this.PauseHandler()
    this.gotoNext()
  },

  indicateHandler(e) {
    const { target } = e
    if (target && target.classList.contains('indicator')) {
      this.pausePlayHandler()
      this.gotoNth(+target.dataset.slideTo)
    }
  },

  pressKeyHandler(e) {
    const { code } = e
    if (code === this.CODE_ARROW_LEFT) this.prevHandler()
    if (code === this.CODE_ARROW_RIGHT) this.nextHandler()
    if (code === this.CODE_SPACE) {
      e.preventDefault()
      this.pausePlayHandler()
    }
  },

  swipeStartHandler(e) {
    this.startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX
  },

  swipeEndHandler(e) {
    this.endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX
    if (this.endPosX - this.startPosX > 100) this.prevHandler()
    if (this.endPosX - this.startPosX < -100) this.nextHandler()
  },

  initListeners() {
    this.pauseButton.addEventListener('click', this.pausePlayHandler.bind(this))
    this.previousButton.addEventListener('click', this.prevHandler.bind(this))
    this.nextButton.addEventListener('click', this.nextHandler.bind(this))
    this.indicatorsContainer.addEventListener('click', this.indicateHandler.bind(this))
    this.container.addEventListener('touchstart', this.swipeStartHandler.bind(this))
    this.container.addEventListener('mousedown', this.swipeStartHandler.bind(this))
    this.container.addEventListener('touchend', this.swipeEndHandler.bind(this))
    this.container.addEventListener('mouseup', this.swipeEndHandler.bind(this))
    document.addEventListener('keydown', this.pressKeyHandler.bind(this))
  },

  init() {
    this.initListeners()
    this.tick()
  }
}

Carousel.prototype.constructor = Carousel

const carousel = new Carousel()
carousel.init()
