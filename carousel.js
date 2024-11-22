class Carousel {
  constructor(p) {
    const settings = { ...{ containerId: '#carousel', slideId: '.slide', interval: 2000, isPlaying: true }, ...p }
    this.container = document.querySelector(settings.containerId)
    this.slideItems = this.container.querySelectorAll(settings.slideId)
    this.INTERVAL = settings.interval
    this.isPlaying = settings.isPlaying
  }

  _initProps() {
    this.currentSlide = 0
    this.SLIDES_COUNT = this.slideItems.length
    this.CODE_ARROW_LEFT = 'ArrowLeft'
    this.CODE_ARROW_RIGHT = 'ArrowRight'
    this.CODE_SPACE = 'Space'
  }

  _initControls() {
    const controls = document.createElement('div')
    const PAUSE = '<div id="pause-btn" class="control control-pause">Pause</div>'
    const PREV = '<div id="prev-btn" class="control control-prev">Prev</div>'
    const NEXT = '<div id="next-btn" class="control control-next">Next</div>'

    controls.innerHTML = PAUSE + PREV + NEXT
    controls.setAttribute('id', 'controls-container')
    controls.setAttribute('class', 'controls')
    this.container.append(controls)

    this.pauseButton = this.container.querySelector('#pause-btn')
    this.previousButton = this.container.querySelector('#prev-btn')
    this.nextButton = this.container.querySelector('#next-btn')
  }

  _initIndicators() {
    const indicators = document.createElement('div')

    indicators.setAttribute('id', 'indicators-container')
    indicators.setAttribute('class', 'indicators')

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('div')
      indicator.setAttribute('class', i === 0 ? 'indicator active' : 'indicator')
      indicator.dataset.slideTo = i
      indicators.append(indicator)
    }

    this.container.append(indicators)

    this.indicatorsContainer = this.container.querySelector('#indicators-container')
    this.indicatorItems = this.container.querySelectorAll('.indicator')
  }

  _initListeners() {
    this.pauseButton.addEventListener('click', this.pausePlay.bind(this))
    this.previousButton.addEventListener('click', this.prev.bind(this))
    this.nextButton.addEventListener('click', this.next.bind(this))
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this))
    document.addEventListener('keydown', this._pressKey.bind(this))
    this.container.addEventListener('mouseenter', this.pause.bind(this))
    this.container.addEventListener('mouseleave', this.play.bind(this))
  }

  _gotoNth(n) {
    this.slideItems[this.currentSlide].classList.toggle('active')
    this.indicatorItems[this.currentSlide].classList.toggle('active')
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT
    this.slideItems[this.currentSlide].classList.toggle('active')
    this.indicatorItems[this.currentSlide].classList.toggle('active')
  }

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1)
  }

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1)
  }

  _tick() {
    if (!this.isPlaying) return
    if (this.timerID) return
    this.timerID = setInterval(() => this._gotoNext(), this.INTERVAL)
  }

  _indicate(e) {
    const { target } = e
    if (target && target.classList.contains('indicator')) {
      this.pause()
      this._gotoNth(+target.dataset.slideTo)
    }
  }

  _pressKey(e) {
    const { code } = e
    if (code === this.CODE_ARROW_LEFT) this.prev()
    if (code === this.CODE_ARROW_RIGHT) this.next()
    if (code === this.CODE_SPACE) {
      e.preventDefault()
      this.pausePlay()
    }
  }

  pause() {
    if (!this.isPlaying) return
    this.pauseButton.textContent = 'Play'
    this.isPlaying = false
    clearInterval(this.timerID)
    this.timerID = null
  }

  play() {
    if (this.isPlaying) return
    this.pauseButton.textContent = 'Pause'
    this.isPlaying = true
    this._tick()
  }

  pausePlay() {
    this.isPlaying ? this.pause() : this.play()
  }

  prev() {
    this.pause()
    this._gotoPrev()
  }

  next() {
    this.pause()
    this._gotoNext()
  }

  init() {
    this._initProps()
    this._initControls()
    this._initIndicators()
    this._initListeners()
    if (this.isPlaying) this._tick()
  }
}

export default Carousel
