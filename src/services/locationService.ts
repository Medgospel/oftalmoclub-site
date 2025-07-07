import { api, API_ENDPOINTS, handleApiResponse } from './api'
import { brasilApi, BrasilApiError } from '@/lib/brasilApi'
import type { CepResponse } from '@/lib/brasilApi'

// Types for location
export interface Cidade {
  id: number
  nome: string
  uf: string
  numero_ibge?: string
  is_capital?: boolean
}

export interface CidadesResponse extends Array<Cidade> {}

// CEP information interface
export interface CepInfo {
  cep: string
  logradouro: string
  bairro: string
  cidade: string
  estado: string
  latitude?: string
  longitude?: string
}

// Location service error
export class LocationServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: Error
  ) {
    super(message)
    this.name = 'LocationServiceError'
  }
}

// Location Service
export const locationService = {
  // ===== CITIES API METHODS =====

  // Get cities by state (UF)
  async getCidadesByState(uf: string) {
    const response = await fetch(`https://98.84.138.10.nip.io/v1/cidades/?uf=${uf}`)
    const data: CidadesResponse = await response.json()
    
    if (response.ok) {
      return { success: true, data }
    } else {
      return { success: false, error: 'Failed to fetch cities' }
    }
  },



  // ===== CEP METHODS =====

  /**
   * Get CEP information from BrasilAPI
   * @param cep - CEP to lookup
   * @returns Promise<CepInfo> - Address information
   */
  async getCepInfo(cep: string): Promise<CepInfo> {
    try {
      console.log('🔍 Validating CEP:', cep)
      
      // Validate CEP format
      if (!this.validateCep(cep)) {
        console.log('❌ CEP validation failed for:', cep)
        throw new LocationServiceError(
          'CEP inválido. Deve conter 8 dígitos.',
          'INVALID_CEP'
        )
      }

      console.log('✅ CEP validation passed, calling BrasilAPI...')
      
      // Get CEP data from BrasilAPI
      const cepData = await brasilApi.getCep(cep)
      
      console.log('📦 BrasilAPI response:', cepData)
      
      // Parse and return standardized format
      return this.parseCepResponse(cepData)
    } catch (error) {
      console.error('🚨 Error in getCepInfo:', error)
      
      if (error instanceof BrasilApiError) {
        console.log('🔍 BrasilAPI Error:', error.message, error.status)
        throw new LocationServiceError(
          error.message,
          'CEP_NOT_FOUND',
          error
        )
      }
      
      if (error instanceof LocationServiceError) {
        console.log('🔍 LocationService Error:', error.message, error.code)
        throw error
      }

      // Log the original error for debugging
      console.error('🔍 Original error:', error)
      console.error('🔍 Error type:', typeof error)
      console.error('🔍 Error constructor:', error?.constructor?.name)

      throw new LocationServiceError(
        `Erro ao consultar CEP: ${error instanceof Error ? error.message : String(error)}`,
        'SERVICE_ERROR',
        error as Error
      )
    }
  },

  /**
   * Validate CEP format
   * @param cep - CEP to validate
   * @returns boolean - True if valid
   */
  validateCep(cep: string): boolean {
    return brasilApi.isValidCep(cep)
  },

  /**
   * Format CEP with mask
   * @param cep - CEP to format
   * @returns string - Formatted CEP
   */
  formatCep(cep: string): string {
    return brasilApi.formatCep(cep)
  },

  /**
   * Get clean CEP (without mask)
   * @param cep - CEP to clean
   * @returns string - Clean CEP
   */
  cleanCep(cep: string): string {
    return brasilApi.cleanCep(cep)
  },

  /**
   * Parse BrasilAPI response to standardized format
   * @param cepData - Raw CEP data from BrasilAPI
   * @returns CepInfo - Standardized address information
   */
  parseCepResponse(cepData: CepResponse): CepInfo {
    // Convert state name to abbreviation
    const stateAbbreviation = this.getStateAbbreviation(cepData.state)
    
    return {
      cep: brasilApi.formatCep(cepData.cep),
      logradouro: cepData.street,
      bairro: cepData.neighborhood,
      cidade: cepData.city,
      estado: stateAbbreviation,
    }
  },

  /**
   * Get state abbreviation from state name
   * @param stateName - Full state name
   * @returns string - State abbreviation
   */
  getStateAbbreviation(stateName: string): string {
    const stateMap: { [key: string]: string } = {
      'Acre': 'AC',
      'Alagoas': 'AL',
      'Amapá': 'AP',
      'Amazonas': 'AM',
      'Bahia': 'BA',
      'Ceará': 'CE',
      'Distrito Federal': 'DF',
      'Espírito Santo': 'ES',
      'Goiás': 'GO',
      'Maranhão': 'MA',
      'Mato Grosso': 'MT',
      'Mato Grosso do Sul': 'MS',
      'Minas Gerais': 'MG',
      'Pará': 'PA',
      'Paraíba': 'PB',
      'Paraná': 'PR',
      'Pernambuco': 'PE',
      'Piauí': 'PI',
      'Rio de Janeiro': 'RJ',
      'Rio Grande do Norte': 'RN',
      'Rio Grande do Sul': 'RS',
      'Rondônia': 'RO',
      'Roraima': 'RR',
      'Santa Catarina': 'SC',
      'São Paulo': 'SP',
      'Sergipe': 'SE',
      'Tocantins': 'TO'
    }
    
    return stateMap[stateName] || stateName
  }
}

export default locationService 