import { api, API_ENDPOINTS, handleApiResponse } from './api'

// Types for pessoa fisica
export interface PessoaFisicaData {
  email: string
  telefone: string
  endereco: {
    tipo_logradouro: string
    logradouro: string
    numero: string
    bairro: string
    cep: string
    fk_cidade: number
  }
  fk_indicador: number
  senha: string
  tipo: string
  nome: string
  cpf: string
  data_nascimento: string
  sexo: string
  // codigo_indicacao: string
}

export interface PessoaFisicaResponse {
  success: boolean
  message?: string
  data?: any
}

// Types for indicators
export interface Indicador {
  id: number
  nome: string
  codigo_indicacao: string
  nome_fantasia: string
}

export interface IndicadorResponse extends Array<Indicador> {}

// Pessoa Fisica Service
export const pessoaFisicaService = {
  // Create new pessoa fisica
  async createPessoaFisica(data: PessoaFisicaData) {
    const response = await fetch('https://98.84.138.10.nip.io/v1/pessoa-fisica/app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }
    
    const responseData = await response.json()
    return { success: true, data: responseData }
  },

  // Get indicators by codigo_indicacao
  async getIndicadorByCodigo(codigoIndicacao: string) {
    const response = await fetch(`https://98.84.138.10.nip.io/v1/pessoa-fisica/indicadores/?codigo_indicacao=${codigoIndicacao}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return { success: true, data: { results: data } }
  },

  // Helper function to format pessoa fisica data from form
  formatPessoaFisicaData(formData: {
    nome: string
    cpf: string
    dataNascimento: string
    sexo: string
    email: string
    senha: string
    telefone: string
    enderecoTipo: string
    tipoLogradouro: string
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cep: string
    cidade: string
    estado: string
    fkIndicador: number
    fkPessoaJuridica: number
    code?: string
  }): PessoaFisicaData {
    return {
      email: formData.email,
      telefone: formData.telefone,
      endereco: {
        tipo_logradouro: formData.tipoLogradouro,
        logradouro: formData.logradouro,
        numero: formData.numero,
        bairro: formData.bairro,
        cep: formData.cep,
        fk_cidade: 0 // This should be looked up based on cidade/estado
      },
      fk_indicador: formData.fkIndicador,
      senha: formData.senha,
      tipo: 'T', // Default value as per API example
      nome: formData.nome,
      cpf: formData.cpf,
      data_nascimento: formData.dataNascimento,
      sexo: formData.sexo,
      // codigo_indicacao: formData.code || '',
    }
  }
}

export default pessoaFisicaService 