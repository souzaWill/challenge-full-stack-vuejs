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

export const rules = {
  required,
  name,
  nameOnlyLetters,
  email,
  passwordMin,
  confirmPassword,
}
