let teamData = []

function initData() {
  const cards = document.querySelectorAll('.container .card')
  const details = document.querySelectorAll('.detail article.detail')

  cards.forEach((card, index) => {
    const detail = details[index]
    teamData.push({
      name: card.querySelector('h3').textContent,
      role: card.querySelector('.role').textContent,
      badge: card.querySelector('.badge').textContent,
      intro: card.querySelector('p:not(.role)').textContent,
      element: card,
      detailElement: detail,
    })
  })
  updateCount()
}

function updateCount() {
  document.getElementById('totalCount').textContent = teamData.length
}

document.getElementById('memberForm').addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = new FormData(e.target)
  const skillInput = formData.get('skills')
  const skillArray = skillInput.split(',').map((s) => s.trim())

  const newMember = {
    name: formData.get('name'),
    role: formData.get('role'),
    badge: skillArray[0],
    intro: formData.get('intro'),
    skills: skillArray,
  }

  const cardHTML = `
    <article class="card">
      <span class="badge">${newMember.badge}</span>
      <img src="https://cdn-icons-png.flaticon.com/512/666/666175.png" />
      <h3>${newMember.name}</h3>
      <p class="role">${newMember.role}</p>
      <p>${newMember.intro}</p>
    </article>`

  document.querySelector('.container').insertAdjacentHTML('beforeend', cardHTML)

  const detailHTML = `
    <article class="detail">
      <h2>${newMember.name}</h2>
      <p class="role">${newMember.role}</p>
      <h4>관심 기술</h4>
      <ul>${newMember.skills.map((s) => `<li>${s}</li>`).join('')}</ul>
    </article>`

  document
    .querySelector('section.detail')
    .insertAdjacentHTML('beforeend', detailHTML)

  teamData.push(newMember)
  updateCount()
  e.target.reset()
  document.getElementById('formSection').classList.add('hidden')
})

document.getElementById('deleteLastBtn').addEventListener('click', () => {
  if (teamData.length === 0) return

  const container = document.querySelector('.container')
  const detailSection = document.querySelector('section.detail')

  container.lastElementChild.remove()
  detailSection.lastElementChild.remove()

  teamData.pop()
  updateCount()
})

document.getElementById('addBtn').addEventListener('click', () => {
  document.getElementById('formSection').classList.toggle('hidden')
})

window.onload = initData
