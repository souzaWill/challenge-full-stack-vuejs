export const required = (v: string) => !!v || 'Campo obrigatório'

export const name = (v: string) =>
  (v && v.trim().length >= 2) || 'O nome deve ter ao menos 2 caracteres'

export const nameOnlyLetters = (v: string) =>
  /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(v) || 'O nome só pode conter letras e espaços'

export const email = (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido'

export const passwordMin = (v: string) => v.length >= 8 || 'A senha deve ter no mínimo 8 caracteres'

export const confirmPassword = (password: string) => {
  return (v: string) => v === password || 'As senhas não coincidem'
}

export const cpf = (v: string) => {
  const clean = v.replace(/\D/g, '')
  if (!/^\d{11}$/.test(clean)) return 'CPF deve conter 11 dígitos'

  if (/^(\d)\1{10}$/.test(clean)) return 'CPF inválido'

  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(clean[i]) * (10 - i)
  let check1 = (sum * 10) % 11
  if (check1 === 10) check1 = 0
  if (check1 !== parseInt(clean[9])) return 'CPF inválido'

  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(clean[i]) * (11 - i)
  let check2 = (sum * 10) % 11
  if (check2 === 10) check2 = 0
  if (check2 !== parseInt(clean[10])) return 'CPF inválido'

  return true
}

export const rules = {
  required,
  name,
  nameOnlyLetters,
  email,
  passwordMin,
  confirmPassword,
  cpf,
}
