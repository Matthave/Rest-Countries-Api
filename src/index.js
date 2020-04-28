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

    this.details = document.querySelector('.details');
    this.detailsBtn = document.querySelector('.details__btn');
  }


  darkModeChange() {
    const main = document.querySelector('main');
    const cards = document.querySelectorAll('.card');
    const cardsBody = document.querySelectorAll('.card-body');
    const headeing = document.querySelector('.heading');
    const inputsWrap = document.querySelector('.searcher__inputWrap')
    const searcher = document.querySelector('.searcher')
    const input = document.querySelector('.form-control')
    const select = document.querySelector('.custom-select')
    const details = document.querySelector('details');

    searcher.classList.toggle('searcher--darkMode');
    inputsWrap.classList.toggle('searcher__inputWrap--darkMode');
    input.classList.toggle('form-control--darkMode');
    select.classList.toggle('custom-select--darkMode')
    headeing.classList.toggle('heading--darkMode');
    main.classList.toggle('main--darkMode');
    details.classList.toggle('details--darkMode')

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
    this.detailsBtn.addEventListener('click', () => {
      this.details.style.left = '-110%';
      document.body.style.overflow = 'inherit';
    })
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
        card.setAttribute('class', `card align-items
        -center ${this.darkMode ? 'card--darkMode' : ''}`)
        card.addEventListener('click', () => this.detailsCard(country.name))

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
        card.addEventListener('click', () => this.detailsCard(country.name))

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

  detailsCard(name) {
    const nameOfCountry = document.querySelector('.name');
    const native = document.querySelector('.native');
    const population = document.querySelector('.population');
    const region = document.querySelector('.countryRegion');
    const sub = document.querySelector('.sub');
    const capital = document.querySelector('.capital');
    const topLevel = document.querySelector('.topLevel');
    const currencies = document.querySelector('.currencies');
    const lang = document.querySelector('.lang');
    const flag = document.querySelector('.details__img');
    const borderOne = document.querySelector('.borderOne');
    const borderTwo = document.querySelector('.borderTwo');
    const borderThree = document.querySelector('.borderThree');

    const detailsOfCountry = this.allCountries.filter((country) => {
      return country.name === name
    })

    flag.style.backgroundImage = `url(${detailsOfCountry[0].flag})`
    nameOfCountry.textContent = `${detailsOfCountry[0].name}`;
    native.textContent = `${detailsOfCountry[0].nativeName}`;
    population.textContent = `${detailsOfCountry[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    region.textContent = `${detailsOfCountry[0].region}`;
    sub.textContent = `${detailsOfCountry[0].subregion}`;
    capital.textContent = `${detailsOfCountry[0].capital}`;
    topLevel.textContent = `${detailsOfCountry[0].topLevelDomain}`;
    currencies.textContent = `${detailsOfCountry[0].currencies[0].name}`;
    lang.textContent = `${detailsOfCountry[0].languages[0].name}`;
    borderOne.textContent = `${detailsOfCountry[0].borders[0]}`;
    borderTwo.textContent = `${detailsOfCountry[0].borders[1]}`;
    borderThree.textContent = `${detailsOfCountry[0].borders[2]}`;

    document.body.style.overflow = 'hidden'
    this.details.style.left = '0'
  }

}

const api = new Api;

api.start()






