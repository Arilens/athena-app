import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Watermark = () => (
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
)

const conversasIniciais = [
  {
    id: 1, nome: 'Coach Ana Lima', initials: 'CA', cor: '#CC1A1A',
    ultima: '⏰ Lembrete: sua aula CrossFit é hoje às 19h!',
    hora: '09:15', naoLidas: 1, coach: true,
    msgs: [
      { de: 'eles', texto: 'Oi Franchesco! Tudo bem? 💪', hora: '08:00' },
      { de: 'eles', texto: '⏰ Lembrete: sua aula de CrossFit é hoje às 19h! Não esquece! 🔴', hora: '09:15' },
    ]
  },
  {
    id: 2, nome: 'Grupo Athena 🏛️', initials: '🏛️', cor: '#D4A017',
    ultima: 'Coach Marcos: Programação da semana disponível!',
    hora: '08:30', naoLidas: 2, coach: false,
    msgs: [
      { de: 'eles', texto: '📋 Galera, programação da semana já disponível no feed!', hora: '08:30' },
      { de: 'eles', texto: 'Sábado tem AULÃO às 09h30 — aula livre pra todo mundo! 🏋️', hora: '08:31' },
    ]
  },
  {
    id: 3, nome: 'Sistema de Pontos 🏆', initials: '🏆', cor: '#4CAF50',
    ultima: 'Você ganhou 10 pontos pelo treino de terça!',
    hora: 'Ontem', naoLidas: 0, coach: false,
    msgs: [
      { de: 'eles', texto: '🏆 Parabéns! Você ganhou 10 pontos pelo treino de terça-feira!', hora: 'Ontem' },
      { de: 'eles', texto: 'Você está com 643 pontos — continue assim para manter o Team Athena! 🔴', hora: 'Ontem' },
    ]
  },
  {
    id: 4, nome: 'Coach Marcos Reis', initials: 'CM', cor: '#1a1a2a',
    ultima: 'Ótimo treino hoje! Continue assim 💪',
    hora: '22/04', naoLidas: 0, coach: true,
    msgs: [
      { de: 'eles', texto: 'Franchesco, ótimo treino hoje! Sua técnica no snatch melhorou muito 🎯', hora: '22/04' },
      { de: 'eles', texto: 'Continue assim! 💪🔴', hora: '22/04' },
    ]
  },
]

function Mensagens() {
  const navigate = useNavigate()
  const [conversas, setConversas] = useState(conversasIniciais)
  const [conversa, setConversa] = useState(null)
  const [texto, setTexto] = useState('')

  const navItems = [
    { id: 'home', icon: '🏠', label: 'Início', path: '/home' },
    { id: 'agenda', icon: '📅', label: 'Agenda', path: '/agenda' },
    { id: 'feed', icon: '👥', label: 'Feed', path: '/feed' },
    { id: 'mensagens', icon: '💬', label: 'Msgs', path: '/mensagens' },
    { id: 'perfil', icon: '🏆', label: 'Perfil', path: '/perfil' },
  ]

  const abrirConversa = (conv) => {
    setConversas(prev => prev.map(c => c.id === conv.id ? { ...c, naoLidas: 0 } : c))
    setConversa(conv)
  }

  const enviar = () => {
    if (!texto.trim()) return
    setConversa(prev => ({
      ...prev,
      msgs: [...prev.msgs, { de: 'eu', texto, hora: 'Agora' }]
    }))
    setTexto('')
  }

  // TELA DE CONVERSA ABERTA
  if (conversa) {
    return (
      <div style={{ background: tema.bg, minHeight: '100vh', fontFamily: 'sans-serif', color: tema.text, display: 'flex', flexDirection: 'column' }}>
        {/* HEADER CONVERSA */}
        <div style={{ background: tema.headerBg, padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => setConversa(null)} style={{ background: 'none', border: 'none', color: tema.textMuted, fontSize: '22px', cursor: 'pointer' }}>←</button>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: conversa.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', border: conversa.coach ? '1.5px solid #CC1A1A' : 'none', color: 'white' }}>{conversa.initials}</div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{conversa.nome}</div>
            {conversa.coach && <div style={{ fontSize: '10px', color: '#CC1A1A' }}>Coach • Online</div>}
          </div>
        </div>

        {/* MENSAGENS */}
        <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '80px' }}>
          {conversa.msgs.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.de === 'eu' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%', padding: '10px 14px',
                background: msg.de === 'eu' ? '#CC1A1A' : tema.surface,
                borderRadius: msg.de === 'eu' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                border: msg.de === 'eu' ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ fontSize: '13px', lineHeight: '1.5' }}>{msg.texto}</div>
                <div style={{ fontSize: '10px', color: msg.de === 'eu' ? 'rgba(255,255,255,0.6)' : '#666', marginTop: '4px', textAlign: 'right' }}>{msg.hora}</div>
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', background: tema.navBg, borderTop: '1px solid rgba(255,255,255,0.08)', padding: '10px 16px', display: 'flex', gap: '8px', boxSizing: 'border-box' }}>
          <input
            value={texto}
            onChange={e => setTexto(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && enviar()}
            placeholder="Digite uma mensagem..."
            style={{ flex: 1, padding: '12px 14px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', color: 'white', fontSize: '13px', outline: 'none', fontFamily: 'sans-serif' }}
          />
          <button onClick={enviar} style={{ width: '44px', height: '44px', background: '#CC1A1A', border: 'none', borderRadius: '50%', color: tema.text, fontSize: '18px', cursor: 'pointer' }}>➤</button>
        </div>
      </div>
    )
  }

  // LISTA DE CONVERSAS
  return (
    <div style={{ background: tema.bg, minHeight: '100vh', fontFamily: 'sans-serif', color: tema.text, position: 'relative' }}>
      <Watermark />
      <div style={{ zIndex: 1, position: 'relative', paddingBottom: '80px' }}>

        {/* HEADER */}
        <div style={{ background: tema.headerBg, padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.jpeg" alt="Athena" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid #CC1A1A', objectFit: 'cover' }} />
          <div style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '2px' }}>MENSAGENS</div>
        </div>

        {/* LEMBRETE AUTOMÁTICO */}
        <div style={{ margin: '12px 16px', background: 'rgba(204,26,26,0.08)', border: '1px solid rgba(204,26,26,0.2)', borderRadius: '10px', padding: '12px 14px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '20px' }}>⏰</span>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#FF6B6B' }}>Lembrete automático</div>
            <div style={{ fontSize: '11px', color: tema.textMuted, marginTop: '2px' }}>Sua aula CrossFit começa em 2 horas — hoje às 19h!</div>
          </div>
        </div>

        {/* CONVERSAS */}
        {conversas.map(conv => (
          <div key={conv.id} onClick={() => abrirConversa(conv)} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)',
            cursor: 'pointer', background: conv.naoLidas > 0 ? 'rgba(204,26,26,0.03)' : 'transparent'
          }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: conv.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: '700', border: conv.coach ? '1.5px solid #CC1A1A' : 'none', color: tema.text, flexShrink: 0 }}>{conv.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: conv.naoLidas > 0 ? '700' : '500' }}>{conv.nome}</div>
                <div style={{ fontSize: '10px', color: tema.textMuted }}>{conv.hora}</div>
              </div>
              <div style={{ fontSize: '12px', color: tema.textMuted, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{conv.ultima}</div>
            </div>
            {conv.naoLidas > 0 && (
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#CC1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', flexShrink: 0 }}>{conv.naoLidas}</div>
            )}
          </div>
        ))}

      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', background: tema.navBg, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', zIndex: 100 }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => navigate(item.path)} style={{
            flex: 1, padding: '10px 4px 12px', background: 'none', border: 'none',
            color: item.id === 'mensagens' ? '#CC1A1A' : tema.textMuted,
            fontSize: '9px', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px'
          }}>
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Mensagens