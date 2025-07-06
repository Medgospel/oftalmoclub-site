// Export API configuration
export { default as api, API_ENDPOINTS, handleApiResponse } from './api'

// Export pessoa fisica service
export { default as pessoaFisicaService } from './pessoaFisicaService'

// Export location service
export { default as locationService } from './locationService'

// Export types
export type { ApiResponse } from './api'
export type { PessoaFisicaData, PessoaFisicaResponse } from './pessoaFisicaService'
export type { Cidade, CidadesResponse, CepInfo } from './locationService'
export { LocationServiceError } from './locationService' 