import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const planos = [
  { nome: 'CrossFit 3x', detalhe: 'Mensal • Sem fidelidade • Vence 15/05', ativo: true },
  { nome: 'Hyrox 2x', detalhe: 'Semestral • Cartão débito mensal • Vence 12/10', ativo: true },
  { nome: 'LPO', detalhe: 'Plano encerrado em 10/03', ativo: false },
]

const trofeus = [
  { emoji: '🔥', nome: 'Semana Perfeita', ganho: true },
  { emoji: '💯', nome: '100 Treinos', ganho: true },
  { emoji: '🏋️', nome: 'CrossFit PRO', ganho: true },
  { emoji: '⚡', nome: 'Hyrox Finish', ganho: true },
  { emoji: '🌟', nome: '6 Meses', ganho: false },
  { emoji: '👑', nome: 'Team Athena', ganho: false },
  { emoji: '🎯', nome: 'PR Pessoal', ganho: true },
  { emoji: '🏆', nome: 'Top do Mês', ganho: false },
]

const evolucao = [
  { data: 'Jan 2025', evento: 'Primeiro treino no Athena! 🏛️' },
  { data: 'Fev 2025', evento: 'Primeiro pull-up sem elástico 💪' },
  { data: 'Mar 2025', evento: 'PR no Deadlift — 100kg! 🏋️' },
  { data: 'Abr 2025', evento: 'Entrou no Team Athena 🔴' },
]

function Perfil() {
  const navigate = useNavigate()
  const [modoEscuro, setModoEscuro] = useState(true)

  const toggleModo = () => {
    if (modoEscuro) {
      document.body.classList.add('claro')
      setModoEscuro(false)
    } else {
      document.body.classList.remove('claro')
      setModoEscuro(true)
    }
  }

  const navItems = [
    { id: 'home', icon: '🏠', label: 'Início', path: '/home' },
    { id: 'agenda', icon: '📅', label: 'Agenda', path: '/agenda' },
    { id: 'feed', icon: '👥', label: 'Feed', path: '/feed' },
    { id: 'mensagens', icon: '💬', label: 'Msgs', path: '/mensagens' },
    { id: 'perfil', icon: '🏆', label: 'Perfil', path: '/perfil' },
  ]

  const s = {
    bg: { background: 'var(--bg)', minHeight: '100vh', fontFamily: 'sans-serif', color: 'var(--text)', position: 'relative' },
    surface: { background: 'var(--surface)', border: '1px solid var(--border)' },
    textMuted: { color: 'var(--text-muted)' },
    navBg: { background: 'var(--nav-bg)', borderTop: '1px solid var(--border)' },
    headerBg: { background: 'var(--header-bg)', borderBottom: '1px solid var(--border)' },
  }

  return (
    <div style={s.bg}>

      {/* WATERMARK */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', flexWrap: 'wrap', gap: '24px', padding: '16px',
        opacity: 0.04, pointerEvents: 'none', zIndex: 0,
        overflow: 'hidden', alignContent: 'flex-start'
      }}>
        {Array.from({length: 40}).map((_, i) => (
          <span key={i} style={{ color: 'var(--text)', fontSize: '13px', whiteSpace: 'nowrap', fontWeight: 'bold', letterSpacing: '2px' }}>
            {['ATHENA', '⚡', 'CROSS TRAINING', 'Λ'][i % 4]}
          </span>
        ))}
      </div>

      <div style={{ zIndex: 1, position: 'relative', paddingBottom: '80px' }}>

        {/* HERO */}
        <div style={{ ...s.headerBg, padding: '28px 20px 20px', textAlign: 'center' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: '#CC1A1A', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '26px', fontWeight: '700',
            margin: '0 auto 12px', border: '3px solid #991212',
            boxShadow: '0 0 20px rgba(204,26,26,0.3)', color: 'white'
          }}>FR</div>

          <div style={{ fontWeight: '900', fontSize: '22px', letterSpacing: '2px' }}>FRANCHESCO</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Membro desde Jan 2025</div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px', borderRadius: '20px', fontSize: '11px',
            marginTop: '10px', background: 'rgba(204,26,26,0.2)',
            color: '#FF6B6B', border: '1px solid rgba(204,26,26,0.4)'
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#CC1A1A', display: 'inline-block' }}></span>
            Team Athena
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginTop: '16px' }}>
            {[
              { num: '643', label: 'Pontos', cor: '#CC1A1A' },
              { num: '87', label: 'Treinos', cor: '#4CAF50' },
              { num: '7', label: 'Troféus', cor: '#D4A017' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: '900', fontSize: '22px', color: s.cor }}>{s.num}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Team Athena — 501+ pts</span>
              <span style={{ fontSize: '10px', color: '#CC1A1A', fontWeight: '700' }}>643 pts</span>
            </div>
            <div style={{ height: '6px', background: 'var(--surface2)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '82%', background: 'linear-gradient(90deg, #CC1A1A, #FF4444)', borderRadius: '3px' }}></div>
            </div>
          </div>
        </div>

        {/* PLANOS */}
        <div style={{ padding: '16px 20px 4px', fontSize: '10px', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Meus Planos</div>
        <div style={{ padding: '0 16px' }}>
          {planos.map((p, i) => (
            <div key={i} style={{
              ...s.surface, borderRadius: '10px', padding: '14px',
              marginBottom: '8px', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center',
              opacity: p.ativo ? 1 : 0.5
            }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{p.nome}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px' }}>{p.detalhe}</div>
              </div>
              <div style={{
                fontSize: '11px', padding: '4px 10px', borderRadius: '6px',
                background: p.ativo ? 'rgba(76,175,80,0.15)' : 'rgba(204,26,26,0.15)',
                color: p.ativo ? '#6FCF74' : '#FF6B6B'
              }}>{p.ativo ? 'Ativo' : 'Inativo'}</div>
            </div>
          ))}
          <button onClick={() => navigate('/home')} style={{
            width: '100%', padding: '12px', background: 'transparent',
            border: '1.5px dashed rgba(204,26,26,0.4)', borderRadius: '10px',
            color: '#CC1A1A', fontSize: '13px', cursor: 'pointer',
            marginBottom: '8px', fontFamily: 'sans-serif'
          }}>+ Contratar nova modalidade</button>
        </div>

        {/* TROFÉUS */}
        <div style={{ padding: '16px 20px 8px', fontSize: '10px', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Conquistas e Troféus</div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '0 16px 4px', scrollbarWidth: 'none' }}>
          {trofeus.map((t, i) => (
            <div key={i} style={{
              minWidth: '68px',
              background: t.ganho ? 'rgba(212,160,23,0.08)' : 'var(--surface)',
              border: `1px solid ${t.ganho ? '#D4A017' : 'var(--border)'}`,
              borderRadius: '10px', padding: '10px 8px', textAlign: 'center',
              flexShrink: 0, opacity: t.ganho ? 1 : 0.4
            }}>
              <div style={{ fontSize: '24px' }}>{t.emoji}</div>
              <div style={{ fontSize: '9px', color: t.ganho ? '#D4A017' : 'var(--text-muted)', marginTop: '4px', lineHeight: '1.3' }}>{t.nome}</div>
            </div>
          ))}
        </div>

        {/* EVOLUÇÃO */}
        <div style={{ padding: '16px 20px 8px', fontSize: '10px', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Minha Evolução</div>
        <div style={{ padding: '0 16px' }}>
          {evolucao.map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#CC1A1A', flexShrink: 0, marginTop: '3px' }}></div>
                {i < evolucao.length - 1 && <div style={{ width: '2px', flex: 1, background: 'rgba(204,26,26,0.2)', marginTop: '4px' }}></div>}
              </div>
              <div style={{ paddingBottom: '8px' }}>
                <div style={{ fontSize: '10px', color: '#CC1A1A', fontWeight: '700' }}>{e.data}</div>
                <div style={{ fontSize: '13px', marginTop: '2px' }}>{e.evento}</div>
              </div>
            </div>
          ))}
        </div>

        {/* MODO CLARO/ESCURO */}
        <div style={{ padding: '8px 16px 4px' }}>
          <div style={{
            ...s.surface, borderRadius: '10px', padding: '14px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>
                {modoEscuro ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Aparência do app</div>
            </div>
            <div onClick={toggleModo} style={{
              width: '48px', height: '26px',
              background: modoEscuro ? '#CC1A1A' : '#ccc',
              borderRadius: '13px', position: 'relative', cursor: 'pointer',
              transition: 'background 0.3s'
            }}>
              <div style={{
                position: 'absolute', top: '3px',
                left: modoEscuro ? '25px' : '3px',
                width: '20px', height: '20px',
                background: 'white', borderRadius: '50%',
                transition: 'left 0.3s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
              }} />
            </div>
          </div>
        </div>

        {/* SAIR */}
        <div style={{ padding: '8px 16px 16px' }}>
          <button onClick={() => { window.location.href = '/' }} style={{
            width: '100%', padding: '13px', background: 'transparent',
            border: '1px solid var(--border)', borderRadius: '8px',
            color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer', fontFamily: 'sans-serif'
          }}>🚪 Sair da conta</button>
        </div>

      </div>

      {/* BOTTOM NAV */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, width: '100%',
        ...s.navBg, display: 'flex', zIndex: 100
      }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => navigate(item.path)} style={{
            flex: 1, padding: '10px 4px 12px', background: 'none', border: 'none',
            color: item.id === 'perfil' ? '#CC1A1A' : 'var(--text-muted)',
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

export default Perfil