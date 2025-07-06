import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, Smartphone } from 'lucide-react'

function WelcomePage() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '5586999999999' // Replace with actual call center number
    const message = 'Olá! Gostaria de mais informações sobre o MedGospel.'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      <div className="flex flex-col items-center bg-[#2176bf] pt-10 pb-2">
        <img src="/logo_branca.png" alt="medgospel logo" className="h-15 mb-0" />
      </div>
      <div className="min-h-screen bg-[#2176bf] py-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-8 max-w-2xl px-4"
        >
          <Card className="text-center">
            <CardContent className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
              >
                <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-4 text-3xl font-bold text-gray-800"
              >
                Parabéns! 🎉
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6 text-lg text-gray-600"
              >
                Você foi cadastrado com sucesso no MedGospel!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8 space-y-4"
              >
                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 font-semibold text-blue-800">Entre em contato com nosso call center</h3>
                  <p className="text-sm text-blue-600">
                    Nossa equipe está pronta para te ajudar com qualquer dúvida ou informação adicional.
                  </p>
                </div>

                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Falar no WhatsApp
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-lg bg-purple-50 p-6 border border-purple-200"
              >
                <div className="flex items-center justify-center mb-3">
                  <Smartphone className="h-8 w-8 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-purple-800">Em breve!</h3>
                </div>
                <p className="text-purple-700 font-medium">
                  Teremos nosso aplicativo para fiel disponível em breve!
                </p>
                <p className="text-sm text-purple-600 mt-2">
                  Fique atento às novidades e seja um dos primeiros a experimentar.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 pt-6 border-t border-gray-200"
              >
                <p className="text-sm text-gray-500">
                  Obrigado por escolher o MedGospel. Estamos aqui para cuidar de você! 🙏
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}

export default WelcomePage 