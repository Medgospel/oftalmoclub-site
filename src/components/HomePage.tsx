import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
  Download,
  Smartphone,
  Users,
  Heart,
  Shield,
  Clock,
  Play,
  Apple,
  FileText,
  Eye,
  UserCheck,
  Calendar,
  Bell,
  History,
  Search,
  Stethoscope,
  MapPin,
  Star,
  CheckCircle
} from 'lucide-react'

function HomePage() {
  const handleDownload = (url: string) => {
    window.open(url, '_blank')
  }

  const features = [
    {
      icon: Search,
      title: 'Busca Inteligente',
      description: 'Encontre oftalmologistas qualificados próximos de você',
      color: 'bg-blue-500'
    },
    {
      icon: Calendar,
      title: 'Agendamento Simplificado',
      description: 'Marque consultas, exames ou procedimentos em poucos cliques',
      color: 'bg-green-500'
    },
    {
      icon: Bell,
      title: 'Notificações e Lembretes',
      description: 'Receba avisos sobre seus atendimentos e nunca mais perca um agendamento',
      color: 'bg-yellow-500'
    },
    {
      icon: History,
      title: 'Histórico Completo',
      description: 'Acompanhe todas as consultas, exames e procedimentos realizados',
      color: 'bg-purple-500'
    }
  ]

  const benefits = [
    'Acesso a profissionais especializados e verificados',
    'Agendamento 24/7 para sua conveniência',
    'Histórico médico completo e seguro',
    'Notificações personalizadas para sua saúde',
    'Interface intuitiva e fácil de usar',
    'Suporte técnico especializado'
  ]

  const stats = [
    { number: '1000+', label: 'Profissionais Verificados' },
    { number: '50.000+', label: 'Pacientes Atendidos' },
    { number: '99.9%', label: 'Satisfação dos Usuários' },
    { number: '24/7', label: 'Disponibilidade' }
  ]

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Eye className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              OFTALMOCLUB
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-6">
              O aplicativo que conecta pacientes e profissionais de oftalmologia em um só lugar
            </p>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto">
              Com ele, você tem acesso a consultas, exames, cirurgias e procedimentos de forma rápida, prática e segura
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-blue-200 text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Funcionalidades Principais
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-2xl bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex p-3 rounded-full ${feature.color} mb-4`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main App Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16"
          >
            <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                {/* App Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex p-4 rounded-full bg-blue-500 mb-6">
                    <Eye className="h-12 w-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Baixe o OFTALMOCLUB
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Transforme sua experiência oftalmológica com tecnologia de ponta e profissionais qualificados
                  </p>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 mr-2 text-green-500" />
                    Por que escolher o OFTALMOCLUB?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Download Buttons */}
                <div className="space-y-4 max-w-md mx-auto">
                  <Button
                    onClick={() => handleDownload('https://play.google.com/store/apps/details?id=com.oftalmoclub')}
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-3 text-lg"
                  >
                    <Play className="h-6 w-6" />
                    Baixar no Google Play
                  </Button>
                  <Button
                    onClick={() => handleDownload('https://apps.apple.com/app/oftalmoclub/id987654321')}
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-3 text-lg"
                  >
                    <Apple className="h-6 w-6" />
                    Baixar na App Store
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mb-16"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-5xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                Como Funciona
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">1. Busque</h4>
                  <p className="text-blue-200">
                    Encontre oftalmologistas qualificados próximos de você
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">2. Agende</h4>
                  <p className="text-blue-200">
                    Marque sua consulta em poucos cliques
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <Stethoscope className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">3. Atenda</h4>
                  <p className="text-blue-200">
                    Receba atendimento de qualidade e acompanhe seu histórico
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-16"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-blue-200 mr-3" />
                <h3 className="text-2xl font-bold text-white">
                  Segurança e Confiança
                </h3>
              </div>
              <p className="text-blue-100 text-lg mb-6">
                Sua saúde ocular e privacidade são nossas prioridades. 
                Utilizamos as mais avançadas tecnologias de segurança para proteger seus dados médicos.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
                <span className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Dados criptografados
                </span>
                <span className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Profissionais verificados
                </span>
                <span className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  LGPD compliant
                </span>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-center mt-12 pt-8 border-t border-blue-400/30"
          >
            <div className="mb-4">
              <Link
                to="/privacy-policy"
                className="inline-flex items-center text-blue-200 hover:text-white transition-colors duration-200 text-sm underline"
              >
                <FileText className="h-4 w-4 mr-2" />
                Política de Privacidade
              </Link>
            </div>
            <p className="text-blue-200 text-sm">
              © 2024 OFTALMOCLUB. Todos os direitos reservados.
            </p>
            <p className="text-blue-300 text-xs mt-2">
              Conectando pacientes e profissionais de oftalmologia para uma saúde ocular melhor
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default HomePage 