import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Download, 
  Smartphone, 
  Users, 
  Heart, 
  Shield, 
  Clock,
  Play,
  Apple
} from 'lucide-react'

function HomePage() {
  const handleDownload = (url: string) => {
    window.open(url, '_blank')
  }

  const apps = [
    {
      id: 'pastor',
      title: 'MedGospel Pastor',
      description: 'Aplicativo exclusivo para pastores e líderes religiosos',
      features: [
        'Gestão de membros da igreja',
        'Agendamento de consultas',
        'Relatórios e estatísticas',
        'Comunicação com fiéis'
      ],
      icon: Users,
      color: 'bg-blue-500',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.medgospel.pastor',
      appStoreUrl: 'https://apps.apple.com/app/medgospel-pastor/id123456789'
    },
    {
      id: 'fiel',
      title: 'MedGospel Fiel',
      description: 'Aplicativo para fiéis e membros da comunidade',
      features: [
        'Agendamento de consultas',
        'Histórico médico',
        'Comunicação com pastor',
        'Lembretes e notificações'
      ],
      icon: Heart,
      color: 'bg-green-500',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.medgospel.fiel',
      appStoreUrl: 'https://apps.apple.com/app/medgospel-fiel/id987654321'
    }
  ]

  return (
    <>
      {/* Header */}
      <div className="bg-[#2176bf] min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <img 
              src="/logo_branca.png" 
              alt="MedGospel Logo" 
              className="h-20 mx-auto mb-6"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Bem vindo
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Conectando pastores e fiéis através da tecnologia para um cuidado espiritual mais próximo
            </p>
          </motion.div>

          {/* Apps Section */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-8">
                    {/* App Header */}
                    <div className="text-center mb-6">
                      <div className={`inline-flex p-4 rounded-full ${app.color} mb-4`}>
                        <app.icon className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {app.title}
                      </h2>
                      <p className="text-gray-600">
                        {app.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-blue-500" />
                        Principais Funcionalidades
                      </h3>
                      <ul className="space-y-2">
                        {app.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + featureIndex * 0.1 }}
                            className="flex items-center text-gray-700"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Download Buttons */}
                    <div className="space-y-3">
                      <Button
                        onClick={() => handleDownload(app.playStoreUrl)}
                        className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                      >
                        <Play className="h-5 w-5" />
                        Baixar no Google Play
                      </Button>
                      <Button
                        onClick={() => handleDownload(app.appStoreUrl)}
                        className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                      >
                        <Apple className="h-5 w-5" />
                        Baixar na App Store
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-blue-200 mr-3" />
                <h3 className="text-2xl font-bold text-white">
                  Próximas Atualizações
                </h3>
              </div>
              <p className="text-blue-100 text-lg mb-6">
                Estamos constantemente trabalhando para melhorar sua experiência. 
                Fique atento às novas funcionalidades!
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200">
                <span className="flex items-center">
                  <Smartphone className="h-4 w-4 mr-1" />
                  Versão Web em breve
                </span>
                <span className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  Mais recursos de comunicação
                </span>
                <span className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  Segurança aprimorada
                </span>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-12 pt-8 border-t border-blue-400/30"
          >
            <p className="text-blue-200 text-sm">
              © 2024 MedGospel. Todos os direitos reservados.
            </p>
            <p className="text-blue-300 text-xs mt-2">
              Conectando fé e tecnologia para um cuidado espiritual mais próximo
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default HomePage 