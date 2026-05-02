import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const diasSemana = [
  { nome: 'Seg', num: 21, treinou: true },
  { nome: 'Ter', num: 22, treinou: true },
  { nome: 'Qua', num: 23, hoje: true },
  { nome: 'Qui', num: 24, treinou: false },
  { nome: 'Sex', num: 25, treinou: false },
  { nome: 'Sáb', num: 26, treinou: false },
  { nome: 'Dom', num: 27, treinou: false },
]

const aulasPorDia = {
  // SEGUNDA
  21: [
    { hora: '06:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '07:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '08:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '09:00', nome: 'CrossFit Kids G1', coach: 'Coach Athena', vagas: 10, agendado: false },
    { hora: '11:00', nome: 'Funcional', coach: 'Coach Athena', vagas: 12, agendado: false },
    { hora: '12:00', nome: 'Funcional', coach: 'Coach Athena', vagas: 12, agendado: false },
    { hora: '16:00', nome: 'CrossFit Kids G2', coach: 'Coach Athena', vagas: 10, agendado: false },
    { hora: '17:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '18:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '19:00', nome: 'HYROX', coach: 'Coach Athena', vagas: 12, agendado: false },
    { hora: '20:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
  ],
  // TERÇA
  22: [
    { hora: '06:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '07:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '08:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '17:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '18:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '19:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '20:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
  ],
  // QUARTA
  23: [
    { hora: '06:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: true },
    { hora: '07:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '08:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '09:00', nome: 'CrossFit Kids G2', coach: 'Coach Athena', vagas: 10, agendado: false },
    { hora: '11:00', nome: 'Funcional', coach: 'Coach Athena', vagas: 12, agendado: false },
    { hora: '12:00', nome: 'Funcional', coach: 'Coach Athena', vagas: 12, agendado: false },
    { hora: '16:00', nome: 'CrossFit Kids G1', coach: 'Coach Athena', vagas: 10, agendado: false },
    { hora: '17:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '18:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '19:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '20:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '21:00', nome: 'LPO', coach: 'Coach Athena', vagas: 8, agendado: false },
  ],
  // QUINTA
  24: [
    { hora: '06:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '07:00', nome: 'HYROX', coach: 'Coach Athena', vagas: 12, agendado: false },
    { hora: '08:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '17:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '18:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '19:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '20:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
  ],
  // SEXTA
  25: [
    { hora: '06:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '07:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '08:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '09:00', nome: 'CrossFit Kids G1', coach: 'Coach Athena', vagas: 10, agendado: false },
    { hora: '11:00', nome: 'Funcional', coach: 'Coach Athena', vagas: 12, agendado: false },
    { hora: '12:00', nome: 'Funcional', coach: 'Coach Athena', vagas: 12, agendado: false },
    { hora: '16:00', nome: 'CrossFit Kids G2', coach: 'Coach Athena', vagas: 10, agendado: false },
    { hora: '17:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '18:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '19:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
    { hora: '20:00', nome: 'CrossFit WOD', coach: 'Coach Athena', vagas: 15, agendado: false },
  ],
  // SÁBADO
  26: [
    { hora: '09:30', nome: 'AULÃO — Aula Livre', coach: 'Coach Athena', vagas: 30, agendado: false },
  ],
}

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

function Agenda() {
  const navigate = useNavigate()
  const [diaSelecionado, setDiaSelecionado] = useState(23)
  const [aulas, setAulas] = useState(aulasPorDia)

  const abaAtiva = 'agenda'

  const navItems = [
    { id: 'home', icon: '🏠', label: 'Início', path: '/home' },
    { id: 'agenda', icon: '📅', label: 'Agenda', path: '/agenda' },
    { id: 'feed', icon: '👥', label: 'Feed', path: '/feed' },
    { id: 'mensagens', icon: '💬', label: 'Msgs', path: '/mensagens' },
    { id: 'perfil', icon: '🏆', label: 'Perfil', path: '/perfil' },
  ]

  const toggleAgendar = (diaNum, index) => {
    setAulas(prev => {
      const novas = { ...prev }
      novas[diaNum] = novas[diaNum].map((a, i) =>
        i === index ? { ...a, agendado: !a.agendado } : a
      )
      return novas
    })
  }

  const aulasHoje = aulas[diaSelecionado] || []
  const totalTreinos = 18
  const totalFaltas = 3
  const semanas = 5

  return (
    <div style={{ background: tema.bg, minHeight: '100vh', fontFamily: 'sans-serif', color: tema.text, position: 'relative' }}>
      <Watermark />

      <div style={{ zIndex: 1, position: 'relative', paddingBottom: '80px' }}>

        {/* HEADER */}
        <div style={{ background: tema.headerBg, padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.jpeg" alt="Athena" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid #CC1A1A', objectFit: 'cover' }} />
          <div style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '2px' }}>AGENDAR AULAS</div>
        </div>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', padding: '16px' }}>
          {[
            { num: totalTreinos, label: 'Treinos', cor: '#4CAF50' },
            { num: totalFaltas, label: 'Faltas', cor: '#CC1A1A' },
            { num: `🏆 ${semanas}`, label: 'Semanas', cor: '#D4A017' },
          ].map(s => (
            <div key={s.label} style={{
              background: tema.surface, border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px', padding: '12px', textAlign: 'center'
            }}>
              <div style={{ fontWeight: '900', fontSize: '22px', color: s.cor }}>{s.num}</div>
              <div style={{ fontSize: '9px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* DIAS DA SEMANA */}
        <div style={{ display: 'flex', gap: '8px', padding: '0 16px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {diasSemana.map(dia => (
            <div
              key={dia.num}
              onClick={() => aulasPorDia[dia.num] && setDiaSelecionado(dia.num)}
              style={{
                minWidth: '46px', padding: '8px 4px',
                background: diaSelecionado === dia.num ? '#CC1A1A' : tema.surface,
                border: `1px solid ${diaSelecionado === dia.num ? '#CC1A1A' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '10px', textAlign: 'center', cursor: 'pointer',
                flexShrink: 0, transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '9px', color: diaSelecionado === dia.num ? 'rgba(255,255,255,0.7)' : tema.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{dia.nome}</div>
              <div style={{ fontWeight: '900', fontSize: '18px', marginTop: '2px' }}>{dia.num}</div>
              <div style={{ fontSize: '10px', color: dia.treinou ? '#4CAF50' : dia.hoje ? tema.text : 'transparent' }}>
                {dia.treinou ? '✓' : dia.hoje ? 'hoje' : '·'}
              </div>
            </div>
          ))}
        </div>

        {/* AULAS DO DIA */}
        <div style={{ padding: '0 16px' }}>
          {aulasHoje.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: tema.textMuted }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>😴</div>
              <div>Sem aulas neste dia</div>
            </div>
          ) : (
            aulasHoje.map((aula, index) => (
              <div key={index} style={{
                background: aula.agendado ? 'rgba(76,175,80,0.05)' : tema.surface,
                border: `1px solid ${aula.agendado ? '#4CAF50' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '10px', padding: '14px', marginBottom: '10px',
                display: 'flex', alignItems: 'center', gap: '12px'
              }}>
                <div style={{ fontWeight: '900', fontSize: '20px', color: '#CC1A1A', minWidth: '52px' }}>{aula.hora}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>{aula.nome}</div>
                  <div style={{ fontSize: '11px', color: tema.textMuted, marginTop: '2px' }}>{aula.coach}</div>
                  <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                    {aula.agendado ? 'Agendado ✓' : `${aula.vagas} vagas restantes`}
                  </div>
                </div>
                {aula.agendado ? (
                  <div style={{ fontSize: '12px', color: '#4CAF50', fontWeight: '600' }}>✓ OK</div>
                ) : (
                  <button
                    onClick={() => toggleAgendar(diaSelecionado, index)}
                    style={{
                      padding: '8px 14px', background: '#CC1A1A', border: 'none',
                      borderRadius: '6px', color: 'white', fontSize: '11px',
                      fontWeight: '800', letterSpacing: '1px', cursor: 'pointer',
                      textTransform: 'uppercase'
                    }}
                  >
                    AGENDAR
                  </button>
                )}
              </div>
            ))
          )}
        </div>

      </div>

      {/* BOTTOM NAV */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, width: '100%',
        background: tema.navBg, borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', zIndex: 100
      }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => navigate(item.path)} style={{
            flex: 1, padding: '10px 4px 12px', background: 'none', border: 'none',
            color: abaAtiva === item.id ? '#CC1A1A' : tema.textMuted,
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

export default Agenda