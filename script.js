const bingoItems = [
  'Wełpa i Pasternak gadają',
  'Siad obok Adama Marka',
  'Dziecko jest chore',
  'Pytanie się Konia, co powiedział',
  'Nowakowski odwala',
  'Radek pierdoli głupoty',
  'Śmianie się z Nikodema',
  'Żart o seksie',
  'Narzekanie na słabe wyniki',
  'Straszenie maturą',
  'Żart z Bentkowskiego',
  'Żart z Kowalskiego',
  'Żart ze Śmietany',
  'Żart z Dawida',
  'Opowieści z innych klas',
  '\"Schowanie telefonów\"',
  '\"Prawda Paweł?\"',
  '\"Chodź tu do pani\"',
  '\"Czy jesz na oczach wygłodniałego pracownika budżetówki?\"',
  '\"Kocham miłością wielką\"',
  'Wełpa z mokrymi włosami',
  'Historia o synu',
  'Gadanie o słodyczach/jedzeniu',
  'Żart seksistowski',
  'Paweł mówi za cicho',
  '\"Pomyśleć/przyjąć na zasadzie dogmatu\"',
  'Michał ucieka z lekcji',
  'Nazywanie kogoś dzieckiem',
  'Ploteczki',
  'Narzekanie na niską frekwencję',
  'Zapowiedź sprawdzianu bez powtórki',
  'Dymy w gabinecie polonistów',
  '\"Moje [...] serce (np. polonistyczne)\"',
  '\"Dzień dobry panowie\" + trzaśnięcie drzwiami'
]
const width = 5
const height = width
const center = Math.floor(width / 2)
const main = document.querySelector("main")

generateTableFromCookies()

function shuffle(toShuffle) {
  const array = [...toShuffle]
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  return array
}

function onBingoSelect(cell) {
  if (cell.classList.contains("selected")) {
    cell.classList.remove("selected")
  } else {
    cell.classList.add("selected")
  }
  updateCookies()
}

function genereteTable(items) {
  let i = 0
  const table = document.createElement("table")
  table.id = "bingo-table"
  
  for (let y = 0; y < height; y++) {
    const row = document.createElement("tr")
    for (let x = 0; x < width; x++) {
      const cell = document.createElement("td")
      if (x === center && y === center) {
        cell.innerText = "X"
        cell.classList.add("center")
      } else {
        cell.onclick = () => onBingoSelect(cell)
        cell.innerText = items[i]
        i++
      }
      row.append(cell)
    }
    table.append(row)
  }

  return table
}

function getCookies() {
  try {
    const cookieString = document.cookie.split("json=")[1] 
    return JSON.parse(cookieString)
  } catch (e) {
    return null
  }
}

function generateTableFromCookies() {
  const cookieJson = getCookies()
  if (!cookieJson) return

  let i = 0
  const table = document.createElement("table")
  table.id = "bingo-table"
  
  for (let y = 0; y < height; y++) {
    const row = document.createElement("tr")
    for (let x = 0; x < width; x++) {
      const cell = document.createElement("td")
      if (x === center && y === center) {
        cell.innerText = "X"
        cell.classList.add("center")
      } else {
        cell.onclick = () => onBingoSelect(cell)
        cell.innerText = cookieJson[i].text
        if (cookieJson[i].isSelected) {
          cell.classList.add("selected")
        }
      }
      i++
      row.append(cell)
    }
    table.append(row)
  }

  main.append(table)
}

function updateCookies() {
  const cells = document.querySelectorAll("#bingo-table td")
  if (!cells || cells.length === 0) return 

  const date = new Date()
  date.setDate(date.getDate() + 1);
  date.setHours(1)
  date.setMinutes(0)
  date.setSeconds(0)

  const items = new Array(cells.length)
  let i = 0
  for (const cell of cells) {
    items[i] = {text: cell.textContent, isSelected: cell.classList.contains("selected")}
    i++
  }

  document.cookie = `json=${JSON.stringify(items)}; expires=${date.toUTCString()};path=/;SameSite=Strict`
}

document.getElementById("gen-btn").onclick = () => {
  main.innerHTML = ""

  const bingoTable = genereteTable(shuffle(bingoItems))

  main.append(bingoTable)  
  updateCookies()
}

document.getElementById("reset-btn").onclick = () => {
  const cells = document.querySelectorAll("#bingo-table td")
  if (!cells || cells.length === 0) return

  for (const cell of cells) {
    cell.classList.remove("selected")
  }

  updateCookies()
}
