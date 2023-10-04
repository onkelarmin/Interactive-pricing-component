const slider = document.querySelector('#slider')
const toggle = document.querySelector('#billing-cycle-toggle')

const billingCycleOptions = [
  ...document.querySelectorAll('.billing-cycle-option'),
]
const monthlyBillingEl = document.querySelector('[data-cycle="monthly"]')
const yearlyBillingEl = document.querySelector('[data-cycle="yearly"]')
const pageViewsEl = document.querySelector('.page-views .value')
const priceEl = document.querySelector('.price .value')

const ranges = [
  { views: '10k', pricePerMonth: 8 },
  { views: '50k', pricePerMonth: 12 },
  { views: '100k', pricePerMonth: 16 },
  { views: '500k', pricePerMonth: 24 },
  { views: '1m', pricePerMonth: 36 },
]

toggle.checked = false

toggle.addEventListener('change', () => {
  if (toggle.checked === true) {
    monthlyBillingEl.setAttribute('aria-selected', 'false')
    yearlyBillingEl.setAttribute('aria-selected', 'true')
  } else {
    monthlyBillingEl.setAttribute('aria-selected', 'true')
    yearlyBillingEl.setAttribute('aria-selected', 'false')
  }
  renderUI()
})

slider.addEventListener('change', () => {
  renderUI()
})

function renderUI() {
  const currRange = ranges[slider.value]

  const currViews = currRange.views
  const currPricePerMonth = currRange.pricePerMonth

  const [currCycleEl] = billingCycleOptions.filter(
    (option) => option.getAttribute('aria-selected') === 'true'
  )
  const yearlyBilling = currCycleEl.dataset.cycle === 'yearly' ? true : false

  const currPrice = yearlyBilling ? currPricePerMonth * 0.75 : currPricePerMonth

  pageViewsEl.innerText = currViews
  priceEl.innerText = `$${currPrice.toFixed(2)}`

  // Fill slider progress

  const progressPerc = (slider.value / (ranges.length - 1)) * 100
  slider.style.setProperty('--_progress-perc', progressPerc + '%')
}

renderUI()
