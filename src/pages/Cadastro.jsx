import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const modalidades = [
  { id: 'crossfit', icon: '🏋️', nome: 'CrossFit' },
  { id: 'hyrox', icon: '🏃', nome: 'Hyrox' },
  { id: 'funcional', icon: '💪', nome: 'Funcional' },
  { id: 'kids', icon: '👶', nome: 'CrossFit Kids' },
  { id: 'lpo', icon: '🥇', nome: 'LPO' },
]

function Cadastro() {
  const navigate = useNavigate()
  const [selecionadas, setSelecionadas] = useState([])

  const toggleMod = (id) => {
    setSelecionadas(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    )
  }

  const inputStyle = {
    width: '100%', padding: '14px', background: '#1a1a1a',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px',
    color: 'white', fontSize: '14px', outline: 'none',
    fontFamily: 'sans-serif', boxSizing: 'border-box'
  }

  const labelStyle = {
    fontSize: '11px', letterSpacing: '1px', color: '#888',
    textTransform: 'uppercase', marginBottom: '6px', display: 'block'
  }

  return (
    <div style={{
      background: '#0d0d0d', minHeight: '100vh',
      fontFamily: 'sans-serif', color: 'white', position: 'relative'
    }}>

      {/* WATERMARK */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', flexWrap: 'wrap', gap: '24px', padding: '16px',
        opacity: 0.04, pointerEvents: 'none', zIndex: 0,
        overflow: 'hidden', alignContent: 'flex-start'
      }}>
        {Array.from({length: 40}).map((_, i) => (
          <span key={i} style={{ color: 'white', fontSize: '13px', whiteSpace: 'nowrap', fontWeight: 'bold', letterSpacing: '2px' }}>
            {['ATHENA', '⚡', 'CROSS TRAINING', 'Λ'][i % 4]}
          </span>
        ))}
      </div>

      <div style={{ padding: '24px', maxWidth: '400px', margin: '0 auto', zIndex: 1, position: 'relative', paddingBottom: '40px' }}>

        {/* VOLTAR */}
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', color: '#888',
          fontSize: '22px', cursor: 'pointer', padding: '4px 0', marginBottom: '20px'
        }}>←</button>

        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <img src="/logo.jpeg" alt="Athena" style={{
            width: '48px', height: '48px', borderRadius: '50%',
            border: '1.5px solid #CC1A1A', objectFit: 'cover'
          }} />
          <div>
            <div style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '3px' }}>NOVO GUERREIRO</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>Crie sua conta no Athena</div>
          </div>
        </div>

        {/* CAMPOS */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Nome completo</label>
          <input style={inputStyle} type="text" placeholder="Seu nome completo" />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Telefone</label>
          <input style={inputStyle} type="tel" placeholder="(11) 99999-9999" />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>E-mail</label>
          <input style={inputStyle} type="email" placeholder="seu@email.com" />
        </div>

        {/* MODALIDADES */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ ...labelStyle, marginBottom: '12px' }}>
            Modalidades de interesse — escolha uma ou mais
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {modalidades.map(mod => (
              <div
                key={mod.id}
                onClick={() => toggleMod(mod.id)}
                style={{
                  padding: '12px 8px',
                  background: selecionadas.includes(mod.id) ? 'rgba(204,26,26,0.15)' : '#1a1a1a',
                  border: `1.5px solid ${selecionadas.includes(mod.id) ? '#CC1A1A' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '8px',
                  color: selecionadas.includes(mod.id) ? '#CC1A1A' : '#888',
                  fontSize: '13px', textAlign: 'center', cursor: 'pointer',
                  transition: 'all 0.2s',
                  gridColumn: mod.id === 'lpo' ? '1 / -1' : 'auto'
                }}
              >
                <div style={{ fontSize: '22px', marginBottom: '4px' }}>{mod.icon}</div>
                {mod.nome}
              </div>
            ))}
          </div>
        </div>

        {/* SENHA */}
        <div style={{ marginBottom: '28px' }}>
          <label style={labelStyle}>Senha (4 dígitos — números ou letras)</label>
          <input style={inputStyle} type="password" maxLength={4} placeholder="••••" />
          <div style={{ fontSize: '11px', color: '#666', marginTop: '6px' }}>
            Ex: 1234 ou AB12 — simples e fácil de lembrar
          </div>
        </div>

        {/* BOTÃO */}
        <button
          onClick={() => navigate('/home')}
          style={{
            width: '100%', padding: '15px', background: '#CC1A1A',
            border: 'none', borderRadius: '8px', color: 'white',
            fontSize: '16px', fontWeight: '800', letterSpacing: '3px',
            cursor: 'pointer', textTransform: 'uppercase'
          }}
        >
          CRIAR CONTA
        </button>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <span style={{ fontSize: '13px', color: '#888' }}>Já tem conta? </span>
          <span onClick={() => navigate('/login')}
            style={{ fontSize: '13px', color: '#CC1A1A', cursor: 'pointer', fontWeight: '600' }}>
            Entrar
          </span>
        </div>

      </div>
    </div>
  )
}

export default Cadastro