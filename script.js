// 1. 명단 데이터 관리용 배열
let teamData = []

// 2. 초기 로드 시 기존 HTML 카드들을 읽어 데이터화 하기
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
      // 상세 정보에서 이메일 등 추가 데이터 추출 가능
      element: card,
      detailElement: detail,
    })
  })
  updateCount()
}

// 3. 인원수 갱신
function updateCount() {
  document.getElementById('totalCount').textContent = teamData.length
}

// 4. 새로운 아기 사자 추가
document.getElementById('memberForm').addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = new FormData(e.target)
  const skillInput = formData.get('skills')
  const skillArray = skillInput.split(',').map((s) => s.trim()) // 쉼표 기준 분리

  const newMember = {
    name: formData.get('name'),
    role: formData.get('role'),
    badge: skillArray[0], // 첫 번째 값이 배지
    intro: formData.get('intro'),
    skills: skillArray,
  }

  // 요약 카드 DOM 생성 및 추가
  const cardHTML = `
    <article class="card">
      <span class="badge">${newMember.badge}</span>
      <img src="https://cdn-icons-png.flaticon.com/512/666/666175.png" />
      <h3>${newMember.name}</h3>
      <p class="role">${newMember.role}</p>
      <p>${newMember.intro}</p>
    </article>`

  document.querySelector('.container').insertAdjacentHTML('beforeend', cardHTML)

  // 상세 카드 DOM 생성 및 추가 (지침 6-5-3 반영)
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

  // 데이터 동기화 및 UI 정리
  teamData.push(newMember)
  updateCount()
  e.target.reset()
  document.getElementById('formSection').classList.add('hidden')
})

// 5. 마지막 항목 삭제
document.getElementById('deleteLastBtn').addEventListener('click', () => {
  if (teamData.length === 0) return // 명단이 비어있으면 동작 안 함

  const container = document.querySelector('.container')
  const detailSection = document.querySelector('section.detail')

  container.lastElementChild.remove() // 요약 카드 삭제
  detailSection.lastElementChild.remove() // 상세 카드 삭제

  teamData.pop() // 배열에서 제거
  updateCount()
})

// 폼 토글
document.getElementById('addBtn').addEventListener('click', () => {
  document.getElementById('formSection').classList.toggle('hidden')
})

// 초기화 실행
window.onload = initData
