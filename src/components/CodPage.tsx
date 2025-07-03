import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'

const estados = [
  'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo',
  'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba',
  'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul',
  'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
]

const sexos = ['Masculino', 'Feminino', 'Outro']

function CodPage() {
  const { code } = useParams()
  const [titularidade, setTitularidade] = useState('Titular')
  const [nomeCompleto, setNomeCompleto] = useState('João Silva')
  const [dataNascimento, setDataNascimento] = useState('2024-03-18')
  const [estado, setEstado] = useState('Piauí')
  const [telefone, setTelefone] = useState('(86) 9 9999-9999')
  const [cpf, setCpf] = useState('João Silva')
  const [sexo, setSexo] = useState('Teresina')
  const [cidade, setCidade] = useState('')
  const [pastor, setPastor] = useState('')
  const [email, setEmail] = useState('joaosilva123@gmail.com')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [buscarPor, setBuscarPor] = useState('Pastor')
  const [indicador, setIndicador] = useState('')

  return (
    <div className="min-h-screen bg-[#2176bf] flex flex-col justify-center items-center py-8 px-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-0 md:p-0 flex flex-col items-center"
      >
        {/* Logo and header */}
        <div className="w-full flex flex-col items-center pt-10 pb-2">
          <img src="/vite.svg" alt="medgospel logo" className="h-10 mb-4" />
        </div>
        <div className="w-full max-w-2xl px-6 md:px-16 flex flex-col">
          <button className="mb-2 text-2xl text-gray-500 hover:text-gray-700 w-8" onClick={() => window.history.back()}>&larr;</button>
          <h1 className="text-3xl font-light mb-1 leading-tight">Crie sua conta no</h1>
          <span className="text-4xl font-black text-black mb-2 leading-tight"><span className="text-[#2176bf]">med</span>gospel</span>
          <div className="mb-4 text-gray-500 text-sm">
            Já possui uma conta? <a href="#" className="text-[#2176bf] font-medium hover:underline">Entrar</a>
          </div>
        </div>
        <form className="w-full max-w-2xl px-6 md:px-16 pb-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-2">
          {/* Coluna Esquerda */}
          <div className="flex flex-col gap-3">
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-1">Titularidade</span>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-base font-medium text-gray-700">
                  <input type="radio" name="titularidade" value="Titular" checked={titularidade === 'Titular'} onChange={() => setTitularidade('Titular')} className="accent-[#2176bf] w-4 h-4" /> Titular
                </label>
                <label className="flex items-center gap-2 text-base font-medium text-gray-700">
                  <input type="radio" name="titularidade" value="Dependente" checked={titularidade === 'Dependente'} onChange={() => setTitularidade('Dependente')} className="accent-[#2176bf] w-4 h-4" /> Dependente
                </label>
              </div>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-1">Nome Completo</span>
              <input type="text" className="input" placeholder="João Silva" value={nomeCompleto} onChange={e => setNomeCompleto(e.target.value)} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-1">Data de Nascimento</span>
              <input type="date" className="input" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-1">Estado</span>
              <select className="input" value={estado} onChange={e => setEstado(e.target.value)}>
                <option value="">Selecione</option>
                {estados.map(uf => <option key={uf} value={uf}>{uf}</option>)}
              </select>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-1">Número de Telefone</span>
              <input type="tel" className="input" placeholder="(86) 9 9999-9999" value={telefone} onChange={e => setTelefone(e.target.value)} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-1">CPF</span>
              <input type="text" className="input" placeholder="000.000.000-00" value={cpf} onChange={e => setCpf(e.target.value)} />
            </div>
          </div>
          {/* Coluna Direita */}
          <div className="flex flex-col gap-3">
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-1">Titular</span>
              <input type="text" className="input bg-gray-100" placeholder="João Silva" value={nomeCompleto} readOnly />
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-1">Sexo</span>
              <input type="text" className="input" placeholder="Teresina" value={sexo} onChange={e => setSexo(e.target.value)} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-1">Cidade</span>
              <input type="text" className="input" placeholder="Teresina" value={cidade} onChange={e => setCidade(e.target.value)} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-1">Nome do pastor</span>
              <input type="text" className="input bg-gray-100" placeholder="Nome do pastor" value={pastor} disabled />
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-1">E-mail</span>
              <input type="email" className="input" placeholder="joaosilva123@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-1">Definir Senha</span>
              <div className="relative">
                <input type={mostrarSenha ? 'text' : 'password'} className="input pr-10" placeholder="********" value={senha} onChange={e => setSenha(e.target.value)} />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setMostrarSenha(v => !v)}>
                  {mostrarSenha ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          </div>
          {/* Linha de baixo - Buscar por, Código, Indicação */}
          <div className="md:col-span-2 flex flex-col md:flex-row gap-4 items-end mt-2">
            <div className="flex gap-6 items-center mb-2 md:mb-0">
              <span className="block text-xs font-semibold text-gray-500">Buscar por</span>
              <label className="flex items-center gap-2 text-base font-medium text-gray-700">
                <input type="radio" name="buscarPor" value="Pastor" checked={buscarPor === 'Pastor'} onChange={() => setBuscarPor('Pastor')} className="accent-[#2176bf] w-4 h-4" /> Pastor
              </label>
              <label className="flex items-center gap-2 text-base font-medium text-gray-700">
                <input type="radio" name="buscarPor" value="Igreja" checked={buscarPor === 'Igreja'} onChange={() => setBuscarPor('Igreja')} className="accent-[#2176bf] w-4 h-4" /> Igreja
              </label>
              <label className="flex items-center gap-2 text-base font-medium text-gray-700">
                <input type="radio" name="buscarPor" value="Código" checked={buscarPor === 'Código'} onChange={() => setBuscarPor('Código')} className="accent-[#2176bf] w-4 h-4" /> Código
              </label>
            </div>
            <div className="flex-1 flex gap-4">
              <div className="flex flex-col w-1/2">
                <span className="block text-xs font-semibold text-gray-500 mb-1">Código</span>
                <input type="text" className="input bg-gray-100" value={code || ''} readOnly />
              </div>
              <div className="flex flex-col w-1/2">
                <span className="block text-xs font-semibold text-gray-500 mb-1">Indicador</span>
                <input type="text" className="input bg-gray-100" placeholder="Indicador" value={indicador} disabled />
              </div>
            </div>
          </div>
          {/* Botão Cadastrar */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full md:w-1/2 bg-[#6ee7b7] hover:bg-[#34d399] text-white font-bold py-3 rounded-xl text-lg transition-colors duration-200 shadow-sm"
            >
              CADASTRAR
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default CodPage

// Tailwind input style helper
// Add this to your global CSS if you want to reuse: input { @apply border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#2176bf] transition; } 