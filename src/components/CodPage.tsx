import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye, EyeOff } from 'lucide-react'
import { locationService, pessoaFisicaService } from '@/services'
import { 
  codPageSchema, 
  pessoalSchema, 
  enderecoSchema, 
  igrejaSchema,
  formatCpf,
  formatPhone,
  estados,
  getStateAbbreviation,
  getStateName,
  type CodPageFormData 
} from '@/lib'



const tiposLogradouro = ['Rua', 'Avenida', 'Travessa', 'Alameda', 'Praça', 'Estrada', 'Rodovia']
const sexos = [
  { id: 4, fk_dominio: "SEXO", fk_valor: "M - Masculino", status: true },
  { id: 5, fk_dominio: "SEXO", fk_valor: "F - Feminino", status: true }
]



function CodPage() {
  const { code } = useParams()
  const [activeTab, setActiveTab] = useState('pessoal')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [cidades, setCidades] = useState<Array<{ id: number; nome: string; uf: string }>>([])
  const [isLoadingCidades, setIsLoadingCidades] = useState(false)
  const [cepCityToSet, setCepCityToSet] = useState<string>('')
  const [isLoadingIndicator, setIsLoadingIndicator] = useState(false)
  
  // Initialize form with React Hook Form and Zod validation
  const form = useForm<CodPageFormData>({
    resolver: zodResolver(codPageSchema),
    defaultValues: {
      nome: 'João Silva',
      cpf: '086.558.993.30',
      dataNascimento: '2024-03-18',
      sexo: 4,
      email: 'joaosilva123@gmail.com',
      senha: '',
      telefone: '(86) 9 9999-9999',
      logradouro: '',
      numero: '',
      bairro: '',
      cep: '',
      cidade: 'Teresina',
      estado: 'PI',
      fkIndicador: 0,
      fkPessoaJuridica: 0,
    },
    mode: 'onChange', // Validate on change for better UX
  })

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid }, 
    setValue, 
    watch, 
    trigger,
    getValues,
    setError,
    clearErrors
  } = form

  // Watch form values for conditional logic
  const watchedValues = watch()

  // Load indicator when component mounts
  useEffect(() => {
    const loadIndicator = async () => {
      if (code) {
        setIsLoadingIndicator(true)
        try {
          const result = await pessoaFisicaService.getIndicadorByCodigo(code)
          if (result.success && result.data && result.data.results && result.data.results.length > 0) {
            const indicador = result.data.results[0]
            setValue('fkIndicador', indicador.id, { shouldValidate: true })
            console.log('Indicador carregado:', indicador)
            toast.success(`Convite de: ${indicador.nome}`)
          } else {
            console.warn('Indicador não encontrado para o código:', code)
            toast.error('Código de indicação inválido ou não encontrado')
            setError('fkIndicador', { 
              type: 'manual', 
              message: 'Código de indicação inválido' 
            })
          }
        } catch (error) {
          console.error('Erro ao buscar indicador:', error)
          toast.error('Erro ao buscar indicador. Tente novamente.')
          setError('fkIndicador', { 
            type: 'manual', 
            message: 'Erro ao buscar indicador' 
          })
        } finally {
          setIsLoadingIndicator(false)
        }
      }
    }

    loadIndicator()
  }, [code, setValue, setError])

  // Load cities when component mounts or when state changes
  useEffect(() => {
    const loadCidades = async () => {
      const currentEstado = watchedValues.estado
      if (currentEstado && currentEstado !== '') {
        setIsLoadingCidades(true)
        try {
          const result = await locationService.getCidadesByState(currentEstado)
          if (result.success && result.data) {
            setCidades(result.data)
            
            // If we have a CEP city to set, try to find and set it
            if (cepCityToSet) {
              const matchingCity = result.data.find((city: { id: number; nome: string; uf: string }) => 
                city.nome.toLowerCase() === cepCityToSet.toLowerCase()
              )
              if (matchingCity) {
                setValue('cidade', matchingCity.nome, { shouldValidate: true })
                clearErrors(['cidade'])
                setCepCityToSet('') // Clear since we set it
              }
            }
          } else {
            setCidades([])
          }
        } catch (error) {
          console.error('Erro ao buscar cidades:', error)
          setCidades([])
        } finally {
          setIsLoadingCidades(false)
        }
      }
    }

    loadCidades()
  }, [watchedValues.estado, cepCityToSet, setValue, clearErrors])

  // Auto-select city when cities are loaded and we have a cidade value from CEP
  useEffect(() => {
    if (cidades.length > 0 && watchedValues.cidade === '') {
      // This might be from CEP lookup, try to find and set the city
      const currentCidade = getValues('cidade')
      if (currentCidade) {
        const matchingCity = cidades.find(city => 
          city.nome.toLowerCase() === currentCidade.toLowerCase()
        )
        if (matchingCity) {
          setValue('cidade', matchingCity.nome, { shouldValidate: true })
        }
      }
    }
  }, [cidades, watchedValues.cidade, setValue, getValues])

  const handleNext = async () => {
    let isValidStep = false
    
    if (activeTab === 'pessoal') {
      isValidStep = await trigger(['nome', 'cpf', 'dataNascimento', 'sexo', 'email', 'senha', 'telefone'])
      if (isValidStep) {
        setActiveTab('endereco')
      } else {
        toast.error('Por favor, corrija os erros antes de continuar')
      }
    }
  }

  const handleBack = () => {
    if (activeTab === 'endereco') setActiveTab('pessoal')
  }

  const onSubmit = async (data: CodPageFormData) => {
    console.log('Form data:', data)
    
    try {
      // Find the city ID based on the selected city and state
      const selectedCity = cidades.find(city => city.nome === data.cidade)
      const fkCidade = selectedCity ? selectedCity.id : 0
      
      // Remove masks from fields
      const cpfSemMascara = data.cpf.replace(/\D/g, '')
      const telefoneSemMascara = '55' + data.telefone.replace(/\D/g, '')
      const cepSemMascara = data.cep.replace(/\D/g, '')
      
      // Format data using the service helper
      const payload = pessoaFisicaService.formatPessoaFisicaData({
        nome: data.nome,
        cpf: cpfSemMascara,
        dataNascimento: data.dataNascimento,
        sexo: data.sexo,
        email: data.email,
        senha: data.senha,
        telefone: telefoneSemMascara,
        enderecoTipo: 'Residencial',
        tipoLogradouro: 'Rua',
        logradouro: data.logradouro,
        numero: data.numero,
        complemento: '',
        bairro: data.bairro,
        cep: cepSemMascara,
        cidade: data.cidade,
        estado: data.estado,
        fkIndicador: data.fkIndicador,
        fkPessoaJuridica: data.fkPessoaJuridica,
        code: code || '',
      })
      
      // Update the fk_cidade with the actual city ID
      payload.endereco.fk_cidade = fkCidade
      
      console.log('Payload:', payload)
      
      // Submit using the service
      const result = await pessoaFisicaService.createPessoaFisica(payload)
      
      if (result.success) {
        toast.success('Cadastro realizado com sucesso!')
        // Optionally redirect or clear form
      } else {
        toast.error(`Erro no cadastro: ${result.error || 'Erro desconhecido'}`)
      }
    } catch (error) {
      console.error('Erro ao enviar cadastro:', error)
      toast.error('Erro ao enviar cadastro. Tente novamente.')
    }
  }

  // Handle CEP lookup
  const handleCepChange = async (newCep: string) => {
    // Apply CEP mask as user types
    const maskedCep = locationService.formatCep(newCep)
    setValue('cep', maskedCep, { shouldValidate: true })
    
    // Only lookup if CEP has 8 digits
    if (locationService.validateCep(maskedCep)) {
      setIsLoadingCep(true)
      try {
        const cepInfo = await locationService.getCepInfo(maskedCep)
        
        setValue('logradouro', cepInfo.logradouro, { shouldValidate: true })
        setValue('bairro', cepInfo.bairro, { shouldValidate: true })
        setValue('estado', cepInfo.estado, { shouldValidate: true })
        
        // Store the city name from CEP to set it later when cities are loaded
        setCepCityToSet(cepInfo.cidade)
        
        // Clear any previous errors for these fields
        clearErrors(['logradouro', 'bairro', 'estado'])
        
        // Try to set city immediately if cities are already loaded
        if (cidades.length > 0) {
          const matchingCity = cidades.find(city => 
            city.nome.toLowerCase() === cepInfo.cidade.toLowerCase()
          )
          if (matchingCity) {
            setValue('cidade', matchingCity.nome, { shouldValidate: true })
            clearErrors(['cidade'])
            setCepCityToSet('') // Clear since we set it
          }
        }
      } catch (error) {
        console.error('Erro ao consultar CEP:', error)
        setError('cep', { 
          type: 'manual', 
          message: 'Erro ao consultar CEP. Verifique se o CEP está correto.' 
        })
        setCepCityToSet('') // Clear on error
      } finally {
        setIsLoadingCep(false)
      }
    }
  }

  // Handle state change
  const handleEstadoChange = async (newEstado: string) => {
    setValue('estado', newEstado, { shouldValidate: true })
    setValue('cidade', '', { shouldValidate: true }) // Clear city when state changes
    setCepCityToSet('') // Clear any pending CEP city when state is manually changed
    
    // Fetch cities for the selected state
    setIsLoadingCidades(true)
    try {
      const result = await locationService.getCidadesByState(newEstado)
      if (result.success && result.data) {
        setCidades(result.data)
        
        // If there's only one city, auto-select it
        if (result.data.length === 1) {
          setValue('cidade', result.data[0].nome, { shouldValidate: true })
        }
      } else {
        setCidades([])
      }
    } catch (error) {
      console.error('Erro ao buscar cidades:', error)
      setCidades([])
    } finally {
      setIsLoadingCidades(false)
    }
  }

  // Handle CPF formatting
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = formatCpf(e.target.value)
    setValue('cpf', formattedCpf, { shouldValidate: true })
  }

  // Handle phone formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value)
    setValue('telefone', formattedPhone, { shouldValidate: true })
  }

  return (
    <>
      <div className="flex flex-col items-center bg-[#2176bf] pt-10 pb-2">
        <img src="/logo_branca.png" alt="medgospel logo" className="h-15 mb-0" />
      </div>
      <div className="min-h-screen bg-[#2176bf] py-8">
        <style>{`
          .cod-modal-card {
            width: 95vw;
            max-width: 1100px;
          }
          .cod-modal-content {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          .cod-tabs-content {
            min-height: 400px;
            height: 400px;
            overflow-y: auto;
          }
          .cod-form-section {
            margin-bottom: 2.5rem;
          }
          .cod-form-section-title {
            font-size: 1.15rem;
            font-weight: 700;
            margin-bottom: 1.2rem;
            color: theme('colors.primary.DEFAULT');
            letter-spacing: 0.01em;
          }
          .cod-form-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem 2rem;
          }
          .cod-form-col {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .cod-form-row {
            grid-column: 1/-1;
            display: flex;
            flex-direction: column;
            gap: 16px;
            align-items: flex-end;
            margin-top: 8px;
          }
          .cod-form-row-fields {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .cod-form-btn {
            grid-column: 1/-1;
            display: flex;
            justify-content: center;
            margin-top: 24px;
            gap: 1rem;
          }
          .nome-sexo-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .nome-field {
            width: 100%;
          }
          .sexo-field {
            width: 100%;
          }
          .error-message {
            color: #ef4444;
            font-size: 0.75rem;
            margin-top: 0.25rem;
          }
          @media (min-width: 700px) {
            .cod-modal-content {
              padding: 0 2.5rem;
            }
            .cod-form-grid {
              grid-template-columns: 1fr 1fr;
            }
            .cod-form-row {
              flex-direction: row;
              align-items: flex-end;
            }
            .cod-form-row-fields {
              flex-direction: row;
            }
            .nome-sexo-container {
              flex-direction: row;
              gap: 0.5rem;
              align-items: flex-end;
            }
            .nome-field {
              flex: 1;
            }
            .sexo-field {
              width: 20%;
            }
          }
        `}</style>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="cod-modal-card mx-auto mt-8"
        >
          <Card>
            <CardContent style={{ padding: 0 }}>
              <div className="cod-modal-content" >
                <Button variant="ghost" className="w-8 mb-2 text-2xl text-gray-500" onClick={() => window.history.back()}><span aria-label="voltar">←</span></Button>
              </div>
              <div className="cod-modal-content pb-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Tabs value={activeTab} onValueChange={async (newTab) => {
                    // Prevent tab change if there are validation errors
                    if (activeTab === 'pessoal' && newTab === 'endereco') {
                      const isValid = await trigger(['nome', 'cpf', 'dataNascimento', 'sexo', 'email', 'senha', 'telefone'])
                      if (!isValid) {
                        toast.error('Por favor, corrija os erros antes de continuar')
                        return
                      }
                    }
                    setActiveTab(newTab)
                  }} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                      <TabsTrigger value="pessoal">Pessoal</TabsTrigger>
                      <TabsTrigger value="endereco">Endereço</TabsTrigger>
                    </TabsList>
                    
                    <div className="cod-tabs-content">
                      {/* Step 1: Pessoal */}
                      <TabsContent value="pessoal" className="h-full">
                        <div className="cod-form-section">
                          <div className="cod-form-grid">
                            <div className="cod-form-col">
                              <div className="nome-sexo-container">
                                <div className="nome-field">
                                  <Label htmlFor="nome" className="mb-5 text-xs font-semibold text-gray-500">Nome Completo</Label>
                                  <Input 
                                    id="nome" 
                                    placeholder="João Silva" 
                                    {...register('nome')}
                                    className={errors.nome ? 'border-red-500' : ''}
                                  />
                                  {errors.nome && (
                                    <div className="error-message">{errors.nome.message}</div>
                                  )}
                                </div>
                                <div className="sexo-field">
                                  <Label htmlFor="sexo" className="mb-5 text-xs font-semibold text-gray-500">Sexo</Label>
                                  <Select 
                                    value={watchedValues.sexo?.toString()} 
                                    onValueChange={(value) => setValue('sexo', parseInt(value))}
                                  >
                                    <SelectTrigger id="sexo" className={errors.sexo ? 'border-red-500' : ''}>
                                      <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {sexos.map(sexo => (
                                        <SelectItem key={sexo.id} value={sexo.id.toString()}>
                                          {sexo.fk_valor}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  {errors.sexo && (
                                    <div className="error-message">{errors.sexo.message}</div>
                                  )}
                                </div>
                              </div>
                              <Label htmlFor="telefone" className="mb-1 text-xs font-semibold text-gray-500">Telefone</Label>
                              <Input 
                                id="telefone" 
                                placeholder="(86) 9 9999-9999" 
                                {...register('telefone')}
                                onChange={handlePhoneChange}
                                className={errors.telefone ? 'border-red-500' : ''}
                              />
                              {errors.telefone && (
                                <div className="error-message">{errors.telefone.message}</div>
                              )}
                              <Label htmlFor="email" className="mb-1 text-xs font-semibold text-gray-500">E-mail</Label>
                              <Input 
                                id="email" 
                                type="email" 
                                placeholder="joaosilva123@gmail.com" 
                                {...register('email')}
                                className={errors.email ? 'border-red-500' : ''}
                              />
                              {errors.email && (
                                <div className="error-message">{errors.email.message}</div>
                              )}
                            </div>
                            <div className="cod-form-col">
                              <Label htmlFor="cpf" className="mb-2 text-xs font-semibold text-gray-500">CPF</Label>
                              <Input 
                                id="cpf" 
                                placeholder="000.000.000-00" 
                                {...register('cpf')}
                                onChange={handleCpfChange}
                                className={errors.cpf ? 'border-red-500' : ''}
                              />
                              {errors.cpf && (
                                <div className="error-message">{errors.cpf.message}</div>
                              )}
                              <Label htmlFor="dataNascimento" className="mb-1 text-xs font-semibold text-gray-500">Data de Nascimento</Label>
                              <Input 
                                id="dataNascimento" 
                                type="date" 
                                {...register('dataNascimento')}
                                className={errors.dataNascimento ? 'border-red-500' : ''}
                              />
                              {errors.dataNascimento && (
                                <div className="error-message">{errors.dataNascimento.message}</div>
                              )}
                              <Label htmlFor="senha" className="mb-1 text-xs font-semibold text-gray-500">Definir Senha</Label>
                              <div className="relative">
                                <Input 
                                  id="senha" 
                                  type={mostrarSenha ? 'text' : 'password'} 
                                  placeholder="********" 
                                  {...register('senha')}
                                  className={`pr-10 ${errors.senha ? 'border-red-500' : ''}`}
                                />
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="icon" 
                                  className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500" 
                                  onClick={() => setMostrarSenha(v => !v)}
                                >
                                  {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                                </Button>
                              </div>
                              {errors.senha && (
                                <div className="error-message">{errors.senha.message}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      {/* Step 2: Endereço */}
                      <TabsContent value="endereco" className="h-full">
                        <div className="cod-form-section">
                          <div className="cod-form-grid">
                            <div className="cod-form-col">
                              <Label htmlFor="cep" className="mb-1 text-xs font-semibold text-gray-500">CEP</Label>
                              <Input 
                                id="cep" 
                                placeholder="64000-000" 
                                {...register('cep')}
                                onChange={(e) => handleCepChange(e.target.value)}
                                disabled={isLoadingCep}
                                className={errors.cep ? 'border-red-500' : ''}
                              />
                              {isLoadingCep && (
                                <div className="text-xs text-blue-500">Consultando CEP...</div>
                              )}
                              {errors.cep && (
                                <div className="error-message">{errors.cep.message}</div>
                              )}

                              <Label htmlFor="logradouro" className="mb-1 text-xs font-semibold text-gray-500">Logradouro</Label>
                              <Input 
                                id="logradouro" 
                                placeholder="Nome da rua" 
                                {...register('logradouro')}
                                className={errors.logradouro ? 'border-red-500' : ''}
                              />
                              {errors.logradouro && (
                                <div className="error-message">{errors.logradouro.message}</div>
                              )}
                              <Label htmlFor="numero" className="mb-1 text-xs font-semibold text-gray-500">Número</Label>
                              <Input 
                                id="numero" 
                                placeholder="123" 
                                {...register('numero')}
                                className={errors.numero ? 'border-red-500' : ''}
                              />
                              {errors.numero && (
                                <div className="error-message">{errors.numero.message}</div>
                              )}
                            </div>
                            <div className="cod-form-col">
                              <Label htmlFor="estado" className="mb-1 text-xs font-semibold text-gray-500">Estado</Label>
                              <Select 
                                value={watchedValues.estado} 
                                onValueChange={handleEstadoChange}
                              >
                                <SelectTrigger id="estado" className={errors.estado ? 'border-red-500' : ''}>
                                  <SelectValue placeholder="Selecione">
                                    {watchedValues.estado ? getStateName(watchedValues.estado) : ''}
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  {estados.map(estado => (
                                    <SelectItem key={estado.sigla} value={estado.sigla}>
                                      {estado.nome}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.estado && (
                                <div className="error-message">{errors.estado.message}</div>
                              )}
                              <Label htmlFor="bairro" className="mb-1 text-xs font-semibold text-gray-500">Bairro</Label>
                              <Input 
                                id="bairro" 
                                placeholder="Centro" 
                                {...register('bairro')}
                                className={errors.bairro ? 'border-red-500' : ''}
                              />
                              {errors.bairro && (
                                <div className="error-message">{errors.bairro.message}</div>
                              )}
                              <Label htmlFor="cidade" className="mb-1 text-xs font-semibold text-gray-500">Cidade</Label>
                              <Select 
                                value={watchedValues.cidade} 
                                onValueChange={(value) => setValue('cidade', value, { shouldValidate: true })}
                                disabled={isLoadingCidades}
                              >
                                <SelectTrigger id="cidade" className={errors.cidade ? 'border-red-500' : ''}>
                                  <SelectValue placeholder={isLoadingCidades ? "Carregando cidades..." : "Selecione a cidade"} />
                                </SelectTrigger>
                                <SelectContent>
                                  {cidades.map(cidade => (
                                    <SelectItem key={cidade.id} value={cidade.nome}>
                                      {cidade.nome}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.cidade && (
                                <div className="error-message">{errors.cidade.message}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      

                    </div>
                  </Tabs>
                  
                  {/* Navigation Buttons */}
                  <div className="cod-form-btn">
                    {activeTab !== 'pessoal' && (
                      <Button type="button" variant="outline" onClick={handleBack}>Voltar</Button>
                    )}
                    {activeTab === 'pessoal' && (
                      <Button type="button" onClick={handleNext}>Próximo</Button>
                    )}
                    {activeTab === 'endereco' && (
                      <Button 
                        type="submit" 
                        className="w-full max-w-80 font-bold text-lg py-3 rounded-xl bg-[#6ee7b7] text-white"
                        disabled={!isValid}
                        onClick={async () => {
                          // Validate address fields before submitting
                          const isAddressValid = await trigger(['cep', 'logradouro', 'numero', 'bairro', 'cidade', 'estado'])
                          if (!isAddressValid) {
                            toast.error('Por favor, preencha todos os campos obrigatórios do endereço')
                          }
                        }}
                      >
                        CADASTRAR
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}

export default CodPage

// Tailwind input style helper
// Add this to your global CSS if you want to reuse: input { @apply border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#2176bf] transition; } 