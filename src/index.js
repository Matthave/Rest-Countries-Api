import './SASS/style.scss';


export default class Api {
  constructor() {
    this.allCountries = ''
    this.container = document.querySelector('.countries');
    this.input = document.querySelector('input')
    this.select = document.querySelector('select')
    this.darkModeTheme = document.querySelector('.heading__darkMode');


    this.selectedOption = 0;
    this.darkMode = false;
  }


  darkModeChange() {
    const main = document.querySelector('main');
    const cards = document.querySelectorAll('.card');
    const cardsBody = document.querySelectorAll('.card-body');
    const header = document.querySelector('header');
    const inputsWrap = document.querySelector('.searcher__inputWrap')
    const searcher = document.querySelector('.searcher')
    const input = document.querySelector('.form-control')
    const select = document.querySelector('.custom-select')

    searcher.classList.toggle('searcher--darkMode');
    inputsWrap.classList.toggle('searcher__inputWrap--darkMode');
    input.classList.toggle('form-control--darkMode');
    select.classList.toggle('custom-select--darkMode')
    header.classList.toggle('header--darkMode');
    main.classList.toggle('main--darkMode');
    cards.forEach((card) => {
      card.classList.toggle('card--darkMode')
    })
    cardsBody.forEach((card) => {
      card.classList.toggle('card-body--darkMode')
    })

    this.darkMode = !this.darkMode
  }

  start() {
    this.darkModeTheme.addEventListener('click', () => this.darkModeChange())
    this.select.addEventListener('change', (e) => {
      this.selectedOption = e.target.options.selectedIndex;
      this.fetchAPI()
    })
    this.fetchAPI()
  }

  fetchAPI() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(dataAll => {
        if (this.selectedOption === 0) {
          this.container.innerHTML = ''
          this.init(dataAll)
        }
        if (this.selectedOption === 1) {
          const africaArray = dataAll.filter((ele) => {
            return ele.region === 'Africa'
          })
          this.container.innerHTML = ''
          this.init(africaArray)
        }
        if (this.selectedOption === 2) {
          const americaArray = dataAll.filter((ele) => {
            return ele.region === 'Americas'
          })
          this.container.innerHTML = ''
          this.init(americaArray)
        }
        if (this.selectedOption === 3) {
          const asiaArray = dataAll.filter((ele) => {
            return ele.region === 'Asia'
          })
          this.container.innerHTML = ''
          this.init(asiaArray)
        }
        if (this.selectedOption === 4) {
          const europeArray = dataAll.filter((ele) => {
            return ele.region === 'Europe'
          })
          this.container.innerHTML = ''
          this.init(europeArray)
        }
        if (this.selectedOption === 5) {
          const oceaniaArray = dataAll.filter((ele) => {
            return ele.region === 'Oceania'
          })
          this.container.innerHTML = ''
          this.init(oceaniaArray)
        }
      })
  }

  init(dataAll) {
    this.allCountries = dataAll
    this.input.addEventListener('change', (e) => this.onChange(e))
    this.createCountry()
  }

  onChange(e) {
    const allCountriesArr = [...this.allCountries];
    const allCountriesNewARrr = allCountriesArr.filter((country) => {
      return (country.name.toUpperCase()).includes(e.target.value.toUpperCase())
    })

    this.createCountry(allCountriesNewARrr, e.target.value)
  }

  createCountry(newArr, inputValue) {
    if (inputValue === undefined) {
      const allCountriesArr = [...this.allCountries];
      allCountriesArr.forEach((country) => {
        const card = document.createElement('div')
        card.setAttribute('class', `card align-items-center ${this.darkMode ? 'card--darkMode' : ''}`)

        const cardImg = document.createElement('div');
        cardImg.setAttribute('class', 'card__img')
        cardImg.style.backgroundImage = `url(${country.flag})`
        card.appendChild(cardImg)

        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', `card-body ${this.darkMode ? 'card-body--darkMode' : ''}`)
        card.appendChild(cardBody)

        const cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', 'card__title')
        cardTitle.textContent = `${country.name}`
        cardBody.appendChild(cardTitle)

        const cardTxtOne = document.createElement('p');
        cardTxtOne.setAttribute('class', 'card__txt')
        cardTxtOne.innerHTML = `<span class="span__type">Populations:</span><span class="span__api">${(country.population).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>`
        cardBody.appendChild(cardTxtOne)

        const cardTxtTwo = document.createElement('p');
        cardTxtTwo.setAttribute('class', 'card__txt')
        cardTxtTwo.innerHTML = `<span class="span__type">Region:</span><span class="span__api">${country.region}</span>`
        cardBody.appendChild(cardTxtTwo)

        const cardTxtThree = document.createElement('p');
        cardTxtThree.setAttribute('class', 'card__txt')
        cardTxtThree.innerHTML = `<span class="span__type">Capital:</span><span class="span__api">${country.capital}</span>`
        cardBody.appendChild(cardTxtThree)

        this.container.appendChild(card)
      })
    } else if (inputValue !== undefined) {
      const allCountriesArr = [...newArr];
      this.container.innerHTML = '';
      allCountriesArr.forEach((country) => {
        const card = document.createElement('div')
        card.setAttribute('class', `card align-items-center ${this.darkMode ? 'card--darkMode' : ''}`)

        const cardImg = document.createElement('div');
        cardImg.setAttribute('class', 'card__img')
        cardImg.style.backgroundImage = `url(${country.flag})`
        card.appendChild(cardImg)

        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', `card-body ${this.darkMode ? 'card-body--darkMode' : ''}`)
        card.appendChild(cardBody)

        const cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', 'card__title')
        cardTitle.textContent = `${country.name}`
        cardBody.appendChild(cardTitle)

        const cardTxtOne = document.createElement('p');
        cardTxtOne.setAttribute('class', 'card__txt')
        cardTxtOne.innerHTML = `<span class="span__type">Populations:</span><span class="span__api">${(country.population).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>`
        cardBody.appendChild(cardTxtOne)

        const cardTxtTwo = document.createElement('p');
        cardTxtTwo.setAttribute('class', 'card__txt')
        cardTxtTwo.innerHTML = `<span class="span__type">Region:</span><span class="span__api">${country.region}</span>`
        cardBody.appendChild(cardTxtTwo)

        const cardTxtThree = document.createElement('p');
        cardTxtThree.setAttribute('class', 'card__txt')
        cardTxtThree.innerHTML = `<span class="span__type">Capital:</span><span class="span__api">${country.capital}</span>`
        cardBody.appendChild(cardTxtThree)

        this.container.appendChild(card)
      })
    }
  }

}

const api = new Api;

api.start()






