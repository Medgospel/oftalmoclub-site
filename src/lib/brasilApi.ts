// BrasilAPI integration for CEP lookup
// Documentation: https://brasilapi.com.br/docs

export interface CepResponse {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  service: string
}

export interface CepError {
  message: string
  service: string
  type: string
}

export class BrasilApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: CepError
  ) {
    super(message)
    this.name = 'BrasilApiError'
  }
}

// BrasilAPI service
export const brasilApi = {
  // Base URL for BrasilAPI
  baseUrl: 'https://brasilapi.com.br/api',

  // Get CEP information
  async getCep(cep: string): Promise<CepResponse> {
    try {
      // Clean CEP (remove non-digits)
      const cleanCep = cep.replace(/\D/g, '')
      
      if (cleanCep.length !== 8) {
        throw new BrasilApiError('CEP deve ter 8 dígitos', 400)
      }

      const response = await fetch(`${this.baseUrl}/cep/v1/${cleanCep}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new BrasilApiError('CEP não encontrado', 404)
        }
        throw new BrasilApiError(`Erro na requisição: ${response.status}`, response.status)
      }

      const data = await response.json()
      return data as CepResponse
    } catch (error) {
      if (error instanceof BrasilApiError) {
        throw error
      }
      throw new BrasilApiError('Erro ao consultar CEP', 500)
    }
  },

  // Format CEP with mask (00000-000)
  formatCep(cep: string): string {
    // If CEP already has a dash, return as is
    if (cep.includes('-')) {
      return cep
    }
    
    const cleanCep = cep.replace(/\D/g, '')
    if (cleanCep.length === 8) {
      return `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`
    }
    return cep
  },

  // Clean CEP (remove mask)
  cleanCep(cep: string): string {
    return cep.replace(/\D/g, '')
  },

  // Validate CEP format
  isValidCep(cep: string): boolean {
    const cleanCep = this.cleanCep(cep)
    return cleanCep.length === 8 && /^\d{8}$/.test(cleanCep)
  },

  // Get address components from CEP response
  parseAddressFromCep(cepData: CepResponse) {
    return {
      logradouro: cepData.street,
      bairro: cepData.neighborhood,
      cidade: cepData.city,
      estado: cepData.state,
      cep: this.formatCep(cepData.cep),
    }
  }
}

export default brasilApi 