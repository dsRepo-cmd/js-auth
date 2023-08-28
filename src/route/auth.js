// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')

User.create({
  email: 'test@mail.com',
  password: 123,
  role: 1,
})
// ================================================================

router.get('/signup', function (req, res) {
  res.render('signup', {
    name: 'signup',

    component: [
      'back-button',
      'field',
      'field-password',
      'field-checkbox',
      'field-select',
    ],

    title: 'Signup Page ',

    data: {
      role: [
        { value: User.USER_ROLE.USER, text: 'Користувач' },
        {
          value: User.USER_ROLE.ADMIN,
          text: 'Адміністратор',
        },
        {
          value: User.USER_ROLE.DEVELOPER,
          text: 'Розробник',
        },
      ],
    },
  })
})

router.post('/signup', function (req, res) {
  const { email, password, role } = req.body

  if (!email || !password || !role) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const existingUser = User.getByEmail(email)

    if (existingUser) {
      return res.status(401).json({
        message: 'Користувач з таким e-mail вже уснує',
      })
    } else {
      User.create({ email, password, role })

      return res.status(200).json({
        message: 'Користувач успішно зареєстрований',
      })
    }
  } catch (error) {
    return res.status(400).json({
      message: 'Помилка створення користувача',
    })
  }
})

module.exports = router
