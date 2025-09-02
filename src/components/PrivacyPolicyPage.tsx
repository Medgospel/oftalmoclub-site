import { motion } from 'framer-motion'
import { Shield, ArrowLeft, Eye, UserCheck, Calendar, Bell, History, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

function PrivacyPolicyPage() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            onClick={handleGoBack}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao início
          </Button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Política de Privacidade
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              OFTALMOCLUB - Protegendo seus dados e sua saúde ocular
            </p>
          </div>
        </motion.div>

        {/* App Overview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto mb-8"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Sobre o OFTALMOCLUB</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              O OFTALMOCLUB é o aplicativo que conecta pacientes e profissionais de oftalmologia em um só lugar. 
              Com ele, você tem acesso a consultas, exames, cirurgias e procedimentos de forma rápida, prática e segura.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <UserCheck className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Busca Inteligente</h3>
                  <p className="text-sm text-gray-600">Encontre oftalmologistas qualificados próximos de você</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Agendamento Simplificado</h3>
                  <p className="text-sm text-gray-600">Marque consultas, exames ou procedimentos em poucos cliques</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Bell className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Notificações e Lembretes</h3>
                  <p className="text-sm text-gray-600">Receba avisos sobre seus atendimentos</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <History className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Histórico Completo</h3>
                  <p className="text-sm text-gray-600">Acompanhe todas as consultas e procedimentos</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Policy Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto"
        >
          <div className="prose prose-lg max-w-none">
            <div className="text-sm text-gray-500 mb-6">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introdução</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                O OFTALMOCLUB está comprometido em proteger a privacidade e a segurança dos dados pessoais 
                e médicos de nossos usuários. Esta Política de Privacidade descreve como coletamos, usamos, 
                armazenamos e protegemos suas informações pessoais e de saúde ocular quando você utiliza 
                nosso aplicativo e serviços.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Ao utilizar nossos serviços, você concorda com as práticas descritas nesta política. 
                Recomendamos que você leia este documento atentamente, especialmente as seções relacionadas 
                ao tratamento de dados médicos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Informações que Coletamos</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2.1 Informações Pessoais</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Coletamos informações que você nos fornece diretamente, incluindo:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    <li>Nome completo e documentos de identificação</li>
                    <li>Endereço de e-mail e número de telefone</li>
                    <li>Data de nascimento e endereço residencial</li>
                    <li>Informações de contato de emergência</li>
                    <li>Dados de convênio médico (quando aplicável)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2.2 Dados Médicos e de Saúde Ocular</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Coletamos informações médicas relevantes para o atendimento oftalmológico:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    <li>Histórico médico oftalmológico</li>
                    <li>Resultados de exames oftalmológicos</li>
                    <li>Prescrições médicas e tratamentos</li>
                    <li>Alergias e contraindicações</li>
                    <li>Medicamentos em uso</li>
                    <li>Agendamentos e procedimentos realizados</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2.3 Informações de Uso</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Coletamos automaticamente informações sobre como você usa nosso aplicativo, 
                    incluindo dados de navegação, preferências de busca médica e interações com 
                    profissionais de saúde.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Como Usamos suas Informações</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Utilizamos suas informações pessoais e médicas para:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Conectar você com oftalmologistas qualificados e verificados</li>
                <li>Facilitar o agendamento de consultas, exames e procedimentos</li>
                <li>Gerenciar seu histórico médico oftalmológico</li>
                <li>Enviar notificações sobre agendamentos e lembretes médicos</li>
                <li>Melhorar a qualidade dos nossos serviços de saúde</li>
                <li>Garantir a segurança da plataforma e dos dados médicos</li>
                <li>Cumprir obrigações legais e regulamentares da área da saúde</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Compartilhamento de Informações</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Não vendemos, alugamos ou compartilhamos suas informações pessoais e médicas com terceiros, 
                exceto nas seguintes situações:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Com seu consentimento explícito para fins médicos</li>
                <li>Com profissionais de saúde autorizados para seu atendimento</li>
                <li>Para cumprir obrigações legais e regulamentares da área da saúde</li>
                <li>Para proteger seus direitos, segurança e bem-estar</li>
                <li>Com prestadores de serviços médicos que nos auxiliam (sob acordos de confidencialidade)</li>
                <li>Em situações de emergência médica, quando necessário para salvar vidas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Segurança dos Dados Médicos</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Implementamos medidas técnicas e organizacionais rigorosas para proteger suas 
                informações pessoais e médicas, incluindo:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Criptografia de ponta a ponta para todos os dados médicos</li>
                <li>Controles de acesso baseados em funções e permissões</li>
                <li>Auditoria completa de todas as atividades de acesso aos dados</li>
                <li>Conformidade com padrões internacionais de segurança da informação</li>
                <li>Treinamento regular da equipe sobre proteção de dados médicos</li>
                <li>Backup seguro e recuperação de dados em caso de emergência</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Seus Direitos</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                De acordo com a Lei Geral de Proteção de Dados (LGPD) e regulamentações médicas, você tem direito a:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Acessar seus dados pessoais e médicos</li>
                <li>Corrigir dados incorretos ou incompletos</li>
                <li>Solicitar a exclusão de seus dados (exceto quando exigido por lei médica)</li>
                <li>Portar seus dados médicos para outro serviço de saúde</li>
                <li>Revogar seu consentimento a qualquer momento</li>
                <li>Ser informado sobre o compartilhamento de dados médicos</li>
                <li>Solicitar anonimização de dados para fins de pesquisa médica</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Retenção de Dados Médicos</h2>
              <p className="text-gray-700 leading-relaxed">
                Mantemos suas informações médicas pelo tempo necessário para cumprir os propósitos 
                descritos nesta política e conforme exigido pela legislação médica brasileira. 
                Dados médicos podem ser retidos por períodos mais longos para fins de histórico 
                clínico e segurança do paciente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Conformidade Médica</h2>
              <p className="text-gray-700 leading-relaxed">
                O OFTALMOCLUB está em conformidade com as regulamentações médicas brasileiras, 
                incluindo o Conselho Federal de Medicina (CFM), a Agência Nacional de Vigilância 
                Sanitária (ANVISA) e demais órgãos reguladores da área da saúde.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Alterações nesta Política</h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos 
                você sobre mudanças significativas através do aplicativo ou por e-mail. 
                Recomendamos que você revise esta política regularmente, especialmente 
                as seções relacionadas ao tratamento de dados médicos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contato</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento 
                de seus dados pessoais e médicos, entre em contato conosco:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-gray-700"><strong>E-mail:</strong> privacidade@oftalmoclub.com</p>
                <p className="text-gray-700"><strong>Telefone:</strong> (11) 99999-9999</p>
                <p className="text-gray-700"><strong>Responsável:</strong> Encarregado de Proteção de Dados</p>
                <p className="text-gray-700"><strong>Endereço:</strong> Rua das Oftalmologias, 123 - São Paulo/SP</p>
              </div>
            </section>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Lock className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">Compromisso com a Segurança</h3>
              </div>
              <p className="text-blue-700 text-sm">
                Sua saúde ocular e privacidade são nossas prioridades. O OFTALMOCLUB utiliza 
                as mais avançadas tecnologias de segurança para proteger seus dados médicos 
                e garantir que você tenha acesso a profissionais de oftalmologia qualificados 
                de forma segura e confiável.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
