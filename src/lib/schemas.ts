import { z } from 'zod'

// CEP validation regex
const cepRegex = /^\d{5}-?\d{3}$/

// CPF validation regex (basic format)
const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/

// Phone validation regex
const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Helper function to clean CPF (remove dots and dash)
const cleanCpf = (cpf: string) => cpf.replace(/\D/g, '')

// Helper function to clean phone (remove parentheses, spaces, and dash)
const cleanPhone = (phone: string) => phone.replace(/\D/g, '')

// Brazilian states with abbreviations
export const estados = [
  { nome: 'Acre', sigla: 'AC' },
  { nome: 'Alagoas', sigla: 'AL' },
  { nome: 'Amapá', sigla: 'AP' },
  { nome: 'Amazonas', sigla: 'AM' },
  { nome: 'Bahia', sigla: 'BA' },
  { nome: 'Ceará', sigla: 'CE' },
  { nome: 'Distrito Federal', sigla: 'DF' },
  { nome: 'Espírito Santo', sigla: 'ES' },
  { nome: 'Goiás', sigla: 'GO' },
  { nome: 'Maranhão', sigla: 'MA' },
  { nome: 'Mato Grosso', sigla: 'MT' },
  { nome: 'Mato Grosso do Sul', sigla: 'MS' },
  { nome: 'Minas Gerais', sigla: 'MG' },
  { nome: 'Pará', sigla: 'PA' },
  { nome: 'Paraíba', sigla: 'PB' },
  { nome: 'Paraná', sigla: 'PR' },
  { nome: 'Pernambuco', sigla: 'PE' },
  { nome: 'Piauí', sigla: 'PI' },
  { nome: 'Rio de Janeiro', sigla: 'RJ' },
  { nome: 'Rio Grande do Norte', sigla: 'RN' },
  { nome: 'Rio Grande do Sul', sigla: 'RS' },
  { nome: 'Rondônia', sigla: 'RO' },
  { nome: 'Roraima', sigla: 'RR' },
  { nome: 'Santa Catarina', sigla: 'SC' },
  { nome: 'São Paulo', sigla: 'SP' },
  { nome: 'Sergipe', sigla: 'SE' },
  { nome: 'Tocantins', sigla: 'TO' }
]

// Helper function to get state abbreviation by name
export const getStateAbbreviation = (stateName: string): string => {
  const state = estados.find(estado => 
    estado.nome.toLowerCase() === stateName.toLowerCase()
  )
  return state?.sigla || ''
}

// Helper function to get state name by abbreviation
export const getStateName = (stateAbbreviation: string): string => {
  const state = estados.find(estado => 
    estado.sigla === stateAbbreviation.toUpperCase()
  )
  return state?.nome || ''
}

// CodPage Registration Form Schema
export const codPageSchema = z.object({
  // Pessoal tab
  nome: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  cpf: z.string()
    .min(1, 'CPF é obrigatório')
    .refine((cpf) => {
      const cleanCpfValue = cleanCpf(cpf)
      return cleanCpfValue.length === 11
    }, 'CPF deve ter 11 dígitos')
    .refine((cpf) => {
      const cleanCpfValue = cleanCpf(cpf)
      // Basic CPF validation (all same digits check)
      return !/^(\d)\1{10}$/.test(cleanCpfValue)
    }, 'CPF inválido'),
  
  dataNascimento: z.string()
    .min(1, 'Data de nascimento é obrigatória')
    .refine((date) => {
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 18 && age <= 120
    }, 'Idade deve estar entre 18 e 120 anos'),
  
  sexo: z.number()
    .min(1, 'Sexo é obrigatório')
    .refine((sexo) => [4, 5].includes(sexo), 'Sexo deve ser válido'),
  
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail deve ser válido')
    .regex(emailRegex, 'E-mail deve ser válido'),
  
  senha: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres'),  
  telefone: z.string()
    .min(1, 'Telefone é obrigatório')
    .refine((telefone) => {
      const cleanPhoneValue = cleanPhone(telefone)
      return cleanPhoneValue.length === 10 || cleanPhoneValue.length === 11
    }, 'Telefone deve ter 10 ou 11 dígitos'),
  
  // Endereço tab
  cep: z.string()
    .min(1, 'CEP é obrigatório')
    .regex(cepRegex, 'CEP deve estar no formato 00000-000'),
  
  logradouro: z.string()
    .min(3, 'Logradouro deve ter pelo menos 3 caracteres')
    .max(100, 'Logradouro deve ter no máximo 100 caracteres'),
  
  numero: z.string()
    .min(1, 'Número é obrigatório')
    .max(10, 'Número deve ter no máximo 10 caracteres'),
  
  bairro: z.string()
    .min(2, 'Bairro deve ter pelo menos 2 caracteres')
    .max(50, 'Bairro deve ter no máximo 50 caracteres'),
  
  cidade: z.string()
    .min(2, 'Cidade deve ter pelo menos 2 caracteres')
    .max(50, 'Cidade deve ter no máximo 50 caracteres'),
  
  estado: z.string()
    .min(1, 'Estado é obrigatório')
    .refine((estado) => estados.some(e => e.sigla === estado), 'Estado deve ser válido'),
  
  // Igreja tab
  fkIndicador: z.number()
    .min(0, 'ID do Indicador deve ser maior ou igual a 0'),
  
  fkPessoaJuridica: z.number()
    .min(0, 'ID Pessoa Jurídica deve ser maior ou igual a 0'),
})

// Type for the form data
export type CodPageFormData = z.infer<typeof codPageSchema>

// Partial schema for step-by-step validation
export const pessoalSchema = codPageSchema.pick({
  nome: true,
  cpf: true,
  dataNascimento: true,
  sexo: true,
  email: true,
  senha: true,
  telefone: true,
})

export const enderecoSchema = codPageSchema.pick({
  cep: true,
  logradouro: true,
  numero: true,
  bairro: true,
  cidade: true,
  estado: true,
})

export const igrejaSchema = codPageSchema.pick({
  fkIndicador: true,
  fkPessoaJuridica: true,
})

// Helper function to format CPF
export const formatCpf = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '')
  if (cleanValue.length <= 3) return cleanValue
  if (cleanValue.length <= 6) return `${cleanValue.slice(0, 3)}.${cleanValue.slice(3)}`
  if (cleanValue.length <= 9) return `${cleanValue.slice(0, 3)}.${cleanValue.slice(3, 6)}.${cleanValue.slice(6)}`
  return `${cleanValue.slice(0, 3)}.${cleanValue.slice(3, 6)}.${cleanValue.slice(6, 9)}-${cleanValue.slice(9, 11)}`
}

// Helper function to format phone
export const formatPhone = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '')
  if (cleanValue.length <= 2) return cleanValue
  if (cleanValue.length <= 6) return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2)}`
  if (cleanValue.length <= 10) return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 6)}-${cleanValue.slice(6)}`
  return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 7)}-${cleanValue.slice(7, 11)}`
} 