import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const modalidadesData = [
  { id: 'crossfit', nome: 'CrossFit', foto: '/foto-crossfit.jpeg', dias: 'Seg a Sex • 06h às 21h', preco: 'A partir de R$ 209/mês' },
  { id: 'hyrox', nome: 'Hyrox', foto: '/foto-hyrox.jpeg', dias: 'Seg 19h • Qui 07h', preco: '1x R$120 • 2x R$160' },
  { id: 'funcional', nome: 'Funcional', foto: '/foto-funcional.jpeg', dias: 'Seg/Qua/Sex • 11h 12h', preco: '1x R$100 • 2x R$120 • 3x R$150' },
  { id: 'kids', nome: 'CrossFit Kids', foto: '/foto-kids.jpeg', dias: 'Seg/Qua/Sex • 09h e 16h', preco: '1x R$120 • 2x R$150' },
  { id: 'lpo', nome: 'LPO', foto: '/foto-lpo.jpeg', dias: 'Quarta • 21h às 22h30', preco: 'Mensal R$130' },
]

const momentosData = [
  { id: 'carnaval', icon: '🎭', nome: 'Carnaval', cor: '#FFB347', anos: ['2023', '2024', '2025'] },
  { id: 'halloween', icon: '🎃', nome: 'Halloween', cor: '#90EE90', anos: ['2023', '2024'] },
  { id: 'mulheres', icon: '💜', nome: 'Dia das Mulheres', cor: '#DDA0DD', anos: ['2024', '2025'] },
  { id: 'bebe', icon: '🍼', nome: 'Chá de Bebê', cor: '#87CEEB', anos: ['2024'] },
]

function ModalContratacao({ mod, onFechar, onConfirmar }) {
  const [plano, setPlano] = useState('')
  const [pagamento, setPagamento] = useState('')

  const planos = mod.id === 'crossfit'
    ? ['2x/semana — R$209/mês', '3x/semana — R$229/mês', '5x/semana — R$279/mês']
    : mod.id === 'hyrox'
    ? ['1x/semana — R$120/mês', '2x/semana — R$160/mês', 'Aluno Athena — R$50/mês']
    : mod.id === 'funcional'
    ? ['1x/semana — R$100/mês', '2x/semana — R$120/mês', '3x/semana — R$150/mês']
    : mod.id === 'kids'
    ? ['1x/semana — R$120/mês', '2x/semana — R$150/mês']
    : ['Mensal — R$130', 'Aluno Athena — R$50/mês']

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.85)', zIndex: 999,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
    }}>
      <div style={{
        background: 'var(--surface)', width: '100%', maxWidth: '500px',
        borderRadius: '16px 16px 0 0', padding: '24px',
        border: '1px solid var(--border)', color: 'var(--text)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontWeight: '900', fontSize: '18px', letterSpacing: '1px' }}>CONTRATAR — {mod.nome.toUpperCase()}</div>
          <button onClick={onFechar} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '22px', cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Escolha o plano</div>
          {planos.map(p => (
            <div key={p} onClick={() => setPlano(p)} style={{
              padding: '12px 14px', background: plano === p ? 'rgba(204,26,26,0.15)' : 'var(--surface2)',
              border: `1px solid ${plano === p ? '#CC1A1A' : 'var(--border)'}`,
              borderRadius: '8px', marginBottom: '6px', cursor: 'pointer',
              color: plano === p ? '#FF6B6B' : 'var(--text)', fontSize: '13px'
            }}>{p}</div>
          ))}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Forma de pagamento</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {['💳 Cartão de Crédito', '📱 PIX'].map(p => (
              <div key={p} onClick={() => setPagamento(p)} style={{
                padding: '12px', background: pagamento === p ? 'rgba(204,26,26,0.15)' : 'var(--surface2)',
                border: `1px solid ${pagamento === p ? '#CC1A1A' : 'var(--border)'}`,
                borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                color: pagamento === p ? '#FF6B6B' : 'var(--text)', fontSize: '13px'
              }}>{p}</div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px', background: 'var(--surface2)', padding: '10px', borderRadius: '8px' }}>
          ℹ️ Taxa de matrícula: R$30,00 • Planos anuais têm desconto progressivo
        </div>
        <button onClick={() => plano && pagamento && onConfirmar(mod.id)} style={{
          width: '100%', padding: '15px', background: plano && pagamento ? '#CC1A1A' : 'var(--surface2)',
          border: 'none', borderRadius: '8px', color: plano && pagamento ? 'white' : 'var(--text-muted)',
          fontWeight: '900', fontSize: '15px', letterSpacing: '2px',
          cursor: plano && pagamento ? 'pointer' : 'default', textTransform: 'uppercase'
        }}>CONFIRMAR CONTRATAÇÃO</button>
      </div>
    </div>
  )
}

function ModalMomento({ momento, onFechar }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'var(--bg)', zIndex: 999, display: 'flex', flexDirection: 'column', color: 'var(--text)'
    }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border)', background: 'var(--header-bg)' }}>
        <button onClick={onFechar} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '22px', cursor: 'pointer' }}>←</button>
        <div style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '1px' }}>{momento.icon} {momento.nome.toUpperCase()}</div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
        {momento.anos.map(ano => (
          <div key={ano} style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', color: momento.cor, fontWeight: '700', letterSpacing: '2px', marginBottom: '10px' }}>📅 {ano}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[1, 2, 3, 4].map(n => (
                <div key={n} style={{
                  height: '110px', background: 'var(--surface)',
                  border: '1px solid var(--border)', borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: '6px', color: 'var(--text-muted)', fontSize: '11px'
                }}>
                  <span style={{ fontSize: '28px' }}>{momento.icon}</span>
                  <span>Foto/Vídeo {n}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '12px' }}>
          📸 As fotos e vídeos reais serão adicionados aqui
        </div>
      </div>
    </div>
  )
}

function Home() {
  const navigate = useNavigate()
  const [contratados, setContratados] = useState(['crossfit'])
  const [modalAberto, setModalAberto] = useState(null)
  const [momentoAberto, setMomentoAberto] = useState(null)

  const confirmarContratacao = (id) => {
    setContratados(prev => [...prev, id])
    setModalAberto(null)
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'sans-serif', color: 'var(--text)', position: 'relative' }}>

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

      {modalAberto && (
        <ModalContratacao
          mod={modalidadesData.find(m => m.id === modalAberto)}
          onFechar={() => setModalAberto(null)}
          onConfirmar={confirmarContratacao}
        />
      )}

      {momentoAberto && (
        <ModalMomento
          momento={momentosData.find(m => m.id === momentoAberto)}
          onFechar={() => setMomentoAberto(null)}
        />
      )}

      <div style={{ zIndex: 1, position: 'relative', paddingBottom: '80px' }}>

        {/* HEADER */}
        <div style={{
          padding: '28px 20px 20px',
          borderBottom: '1px solid var(--border)',
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, #0d0d0d 0%, #1a0000 50%, #0d0d0d 100%)',
          minHeight: '120px'
        }}>
          <img src="/logo.jpeg" alt="" style={{
            position: 'absolute', right: '-30px', top: '50%',
            transform: 'translateY(-50%)', width: '160px', height: '160px',
            objectFit: 'cover', borderRadius: '50%',
            opacity: 0.15, filter: 'blur(2px)', pointerEvents: 'none'
          }} />
          <img src="/logo.jpeg" alt="" style={{
            position: 'absolute', left: '-20px', top: '50%',
            transform: 'translateY(-50%)', width: '100px', height: '100px',
            objectFit: 'cover', borderRadius: '50%',
            opacity: 0.10, filter: 'blur(3px)', pointerEvents: 'none'
          }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, #CC1A1A, transparent)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', letterSpacing: '1px' }}>Bom dia,</div>
            <div style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '3px', marginTop: '2px', color: 'white', textShadow: '0 2px 10px rgba(204,26,26,0.3)' }}>FRANCHESCO</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '4px 12px', borderRadius: '20px', fontSize: '11px',
              marginTop: '10px', background: 'rgba(204,26,26,0.2)',
              color: '#FF6B6B', border: '1px solid rgba(204,26,26,0.4)'
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#CC1A1A', display: 'inline-block', boxShadow: '0 0 6px #CC1A1A' }}></span>
              Team Athena
            </div>
          </div>
        </div>

        {/* PONTOS */}
        <div style={{ padding: '14px 20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pontos acumulados</span>
            <span style={{ fontWeight: '900', fontSize: '18px', color: '#CC1A1A' }}>🏆 643 pts</span>
          </div>
          <div style={{ height: '6px', background: 'var(--surface2)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '82%', background: 'linear-gradient(90deg, #CC1A1A, #FF4444)', borderRadius: '3px' }}></div>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>Team Athena — 501+ pontos</div>
        </div>

        {/* MODALIDADES */}
        <div style={{ padding: '16px 20px 8px', fontSize: '10px', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Modalidades e Horários
        </div>

        <style>{`
          .modalidades-wrap {
            display: flex;
            gap: 10px;
            padding: 0 20px 4px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          .modal-card { min-width: 145px; max-width: 145px; flex-shrink: 0; }
          .modal-foto { height: 85px; }
          @media (min-width: 768px) {
            .modalidades-wrap {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              overflow-x: visible;
            }
            .modal-card { min-width: unset; max-width: unset; }
            .modal-foto { height: 130px; }
          }
        `}</style>

        <div className="modalidades-wrap">
          {modalidadesData.map(mod => {
            const contratado = contratados.includes(mod.id)
            return (
              <div key={mod.id} className="modal-card" style={{
                background: 'var(--surface)', borderRadius: '12px',
                overflow: 'hidden', border: `1px solid ${contratado ? '#4CAF50' : 'var(--border)'}`,
                transition: 'border-color 0.3s'
              }}>
                <div className="modal-foto" style={{ overflow: 'hidden', position: 'relative' }}>
                  <img src={mod.foto} alt={mod.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {contratado && (
                    <div style={{
                      position: 'absolute', top: '8px', right: '8px',
                      background: '#4CAF50', borderRadius: '12px', padding: '2px 8px',
                      fontSize: '10px', fontWeight: '700', color: 'white'
                    }}>✓ ATIVO</div>
                  )}
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontWeight: '800', fontSize: '13px', letterSpacing: '1px', color: 'var(--text)' }}>{mod.nome}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '3px' }}>{mod.dias}</div>
                  <div style={{ fontSize: '11px', color: '#D4A017', fontWeight: '600', marginTop: '6px' }}>{mod.preco}</div>
                  <button onClick={() => !contratado && setModalAberto(mod.id)} style={{
                    width: '100%', marginTop: '8px', padding: '9px',
                    background: contratado ? '#4CAF50' : '#CC1A1A',
                    border: 'none', borderRadius: '6px', color: 'white',
                    fontSize: '11px', fontWeight: '800', letterSpacing: '1px',
                    cursor: contratado ? 'default' : 'pointer', textTransform: 'uppercase',
                    transition: 'background 0.3s'
                  }}>{contratado ? '✓ CONTRATADO' : 'CONTRATAR'}</button>
                </div>
              </div>
            )
          })}
        </div>

        {/* ACESSO RÁPIDO */}
        <div style={{ padding: '16px 20px 8px', fontSize: '10px', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Acesso Rápido
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '0 20px' }}>
          {[
            { icon: '📅', titulo: 'Agendar aulas', sub: 'Próxima: Hoje 19h', path: '/agenda' },
            { icon: '👥', titulo: 'Comunidade', sub: '3 novas postagens', path: '/feed' },
            { icon: '💬', titulo: 'Mensagens', sub: '2 não lidas', vermelho: true, path: '/mensagens' },
            { icon: '🏆', titulo: 'Meus troféus', sub: '7 conquistados', path: '/perfil' },
          ].map(item => (
            <div key={item.titulo} onClick={() => navigate(item.path)} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '12px', padding: '14px 12px', cursor: 'pointer'
            }}>
              <div style={{ fontSize: '22px', marginBottom: '6px' }}>{item.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text)' }}>{item.titulo}</div>
              <div style={{ fontSize: '10px', color: item.vermelho ? '#CC1A1A' : 'var(--text-muted)', marginTop: '2px' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {/* MOMENTOS ESPECIAIS */}
        <div style={{ padding: '16px 20px 8px', fontSize: '10px', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Momentos Especiais
        </div>
        <div style={{ display: 'flex', gap: '10px', padding: '0 20px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {momentosData.map(m => (
            <div key={m.id} onClick={() => setMomentoAberto(m.id)} style={{
              minWidth: '140px', height: '90px', borderRadius: '10px',
              background: 'var(--surface)', border: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: '6px', flexShrink: 0, cursor: 'pointer'
            }}>
              <span style={{ fontSize: '28px' }}>{m.icon}</span>
              <span style={{ fontSize: '10px', color: m.cor, fontWeight: '600' }}>{m.nome}</span>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{m.anos.join(' • ')}</span>
            </div>
          ))}
        </div>

      </div>

      {/* BOTTOM NAV */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, width: '100%',
        background: 'var(--nav-bg)', borderTop: '1px solid var(--border)',
        display: 'flex', zIndex: 100
      }}>
        {[
          { id: 'home', icon: '🏠', label: 'Início', path: '/home' },
          { id: 'agenda', icon: '📅', label: 'Agenda', path: '/agenda' },
          { id: 'feed', icon: '👥', label: 'Feed', path: '/feed' },
          { id: 'mensagens', icon: '💬', label: 'Msgs', path: '/mensagens' },
          { id: 'perfil', icon: '🏆', label: 'Perfil', path: '/perfil' },
        ].map(item => (
          <button key={item.id} onClick={() => navigate(item.path)} style={{
            flex: 1, padding: '10px 4px 12px', background: 'none', border: 'none',
            color: item.id === 'home' ? '#CC1A1A' : 'var(--text-muted)',
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

export default Home