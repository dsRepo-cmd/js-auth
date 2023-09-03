import { USER_ROLE } from '../../script/user'

document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.user-title')
  const email = document.querySelector('.user-email')
  const role = document.querySelector('.user-role')

  const session = window.session

  //   console.log( session)
  title.href = `/user-item?id=${session.user.id}`
  email.innerText = session.user.email
  role.innerText = USER_ROLE[session.user.role]
})
