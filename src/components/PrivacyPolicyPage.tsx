import { motion } from 'framer-motion'
import { Shield, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

function PrivacyPolicyPage() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <div className="bg-gradient-to-br from-primary to-primary-dark min-h-screen">
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
              Seu compromisso com a proteção dos seus dados pessoais
            </p>
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
                A MedGospel está comprometida em proteger a privacidade e a segurança dos dados pessoais 
                de nossos usuários. Esta Política de Privacidade descreve como coletamos, usamos, 
                armazenamos e protegemos suas informações pessoais quando você utiliza nossos aplicativos 
                e serviços.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Ao utilizar nossos serviços, você concorda com as práticas descritas nesta política. 
                Recomendamos que você leia este documento atentamente.
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
                    <li>Nome completo</li>
                    <li>Endereço de e-mail</li>
                    <li>Número de telefone</li>
                    <li>Informações de perfil religioso</li>
                    <li>Dados médicos e de saúde (quando aplicável)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2.2 Informações de Uso</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Coletamos automaticamente informações sobre como você usa nossos aplicativos, 
                    incluindo dados de navegação, preferências e interações com o aplicativo.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Como Usamos suas Informações</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Utilizamos suas informações pessoais para:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Facilitar a comunicação entre pastores e fiéis</li>
                <li>Agendar e gerenciar consultas</li>
                <li>Enviar notificações importantes</li>
                <li>Garantir a segurança da plataforma</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Compartilhamento de Informações</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
                exceto nas seguintes situações:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Com seu consentimento explícito</li>
                <li>Para cumprir obrigações legais</li>
                <li>Para proteger nossos direitos e segurança</li>
                <li>Com prestadores de serviços que nos auxiliam (sob acordos de confidencialidade)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Segurança dos Dados</h2>
              <p className="text-gray-700 leading-relaxed">
                Implementamos medidas técnicas e organizacionais apropriadas para proteger suas 
                informações pessoais contra acesso não autorizado, alteração, divulgação ou 
                destruição. Utilizamos criptografia, controles de acesso e outras tecnologias 
                de segurança para proteger seus dados.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Seus Direitos</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incorretos ou incompletos</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Portar seus dados para outro serviço</li>
                <li>Revogar seu consentimento a qualquer momento</li>
                <li>Ser informado sobre o compartilhamento de dados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Retenção de Dados</h2>
              <p className="text-gray-700 leading-relaxed">
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir 
                os propósitos descritos nesta política, exceto quando um período de retenção 
                mais longo for exigido por lei.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Alterações nesta Política</h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos 
                você sobre mudanças significativas através do aplicativo ou por e-mail. 
                Recomendamos que você revise esta política regularmente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Contato</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento 
                de seus dados pessoais, entre em contato conosco:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>E-mail:</strong> privacidade@medgospel.com</p>
                <p className="text-gray-700"><strong>Responsável:</strong> Encarregado de Proteção de Dados</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
