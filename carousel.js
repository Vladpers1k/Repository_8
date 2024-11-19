function Carousel(containerId = '#carousel', slideId = '.slide', interval = 2000, isPlaying = true) {
  this.container = document.querySelector(containerId)
  this.slides = this.container.querySelectorAll('.slide')
  this.INTERVAL = interval
  this.isPlaying = true
}

Carousel.prototype = {
  _initProps() {
    this.currentSlide = 0

    this.indicatorsContainer = this.container.querySelector('#indicators-container')
    this.indicatorItems = this.container.querySelectorAll('.indicator')
    this.pauseButton = this.container.querySelector('#pause-btn')
    this.previousButton = this.container.querySelector('#prev-btn')
    this.nextButton = this.container.querySelector('#next-btn')

    this.CODE_ARROW_LEFT = 'ArrowLeft'
    this.CODE_ARROW_RIGHT = 'ArrowRight'
    this.CODE_SPACE = 'Space'
    this.INTERVAL = 2000
  },

  _initListeners() {
    this.pauseButton.addEventListener('click', this.pausePlay.bind(this))
    this.previousButton.addEventListener('click', this.prev.bind(this))
    this.nextButton.addEventListener('click', this.next.bind(this))
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this))
    document.addEventListener('keydown', this._pressKey.bind(this))
  },

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active')
    this.indicatorItems[this.currentSlide].classList.toggle('active')
    this.currentSlide = (n + this.slides.length) % this.slides.length
    this.slides[this.currentSlide].classList.toggle('active')
    this.indicatorItems[this.currentSlide].classList.toggle('active')
  },

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1)
  },

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1)
  },

  _tick() {
    this.timerID = setInterval(() => this._gotoNext(), this.INTERVAL)
  },

  _indicate(e) {
    const { target } = e
    if (target && target.classList.contains('indicator')) {
      this.pause()
      this._gotoNth(+target.dataset.slideTo)
    }
  },

  _pressKey(e) {
    const { code } = e
    if (code === this.CODE_ARROW_LEFT) this.prev()
    if (code === this.CODE_ARROW_RIGHT) this.next()
    if (code === this.CODE_SPACE) {
      e.preventDefault()
      this.pausePlay()
    }
  },

  pause() {
    if (!this.isPlaying) return
    this.pauseButton.textContent = 'Play'
    this.isPlaying = !this.isPlaying
    clearInterval(this.timerID)
  },

  play() {
    this.pauseButton.textContent = 'pause'
    this.isPlaying = !this.isPlaying
    this._tick()
  },

  pausePlay() {
    this.isPlaying ? this.pause() : this.play()
  },

  prev() {
    this.pause()
    this._gotoPrev()
  },

  next() {
    this.pause()
    this._gotoNext()
  },

  init() {
    this._initProps()
    this._initListeners()
    this._tick()
  }
}

Carousel.prototype.constructor = Carousel
