import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const postsIniciais = [
  {
    id: 1, autor: 'Coach Ana Lima', initials: 'CA', coach: true,
    tempo: 'Hoje, 08:30', cor: '#CC1A1A',
    texto: '🔥 Galera! O WOD de hoje vai ser épico — preparem os ombros! Quarta 19h tem EMOM especial. Quem tá dentro? 💪',
    imagem: null, curtidas: 24, comentarios: [], reacao: null
  },
  {
    id: 2, autor: 'Maria Fernanda', initials: 'MF', coach: false,
    tempo: 'Ontem, 19:45', cor: '#1a2a1a',
    texto: 'Primeiro handstand walk da minha vida hoje! 🙌 Obrigada a todo o team! 6 meses de treino valeram cada gota de suor 💪🏛️',
    imagem: '🤸', curtidas: 41, comentarios: [], reacao: null
  },
  {
    id: 3, autor: 'Coach Marcos Reis', initials: 'CM', coach: true,
    tempo: '23/04, 07:00', cor: '#CC1A1A',
    texto: '📋 Programação da semana disponível! Sábado o AULÃO começa às 09h30 — aula livre pra todo mundo. Venham! 🏋️',
    imagem: null, curtidas: 19, comentarios: [], reacao: null
  },
]

const desafios = [
  {
    id: 1, titulo: '🏆 DESAFIO DA SEMANA', pts: '+50 pontos • válido até domingo',
    cor: '#1a0000', corBtn: '#CC1A1A',
    desc: 'Treine 4x esta semana e poste sua evolução no feed com a hashtag #AthenaSemana. Os 3 melhores posts ganham pontos extras!',
    aceito: false, participantes: 12
  },
  {
    id: 2, titulo: '⚡ DESAFIO HYROX', pts: '+80 pontos • válido até 30/04',
    cor: '#001530', corBtn: '#4A90C4',
    desc: 'Complete o simulado Hyrox completo no treino de sábado. Todos que completarem ganham 80 pontos + troféu exclusivo!',
    aceito: false, participantes: 8
  },
  {
    id: 3, titulo: '🔥 DESAFIO FORÇA', pts: '+30 pontos • válido essa semana',
    cor: '#1a1000', corBtn: '#D4A017',
    desc: 'Bata seu PR pessoal em qualquer levantamento e poste o vídeo aqui no feed. Vale qualquer modalidade!',
    aceito: false, participantes: 5
  },
]

const emojis = ['❤️', '🔥', '💪', '🏆', '👏', '😮', '🎉', '⚡']

function Feed() {
  const navigate = useNavigate()
  const [aba, setAba] = useState('feed')
  const [posts, setPosts] = useState(postsIniciais)
  const [desafiosList, setDesafios] = useState(desafios)
  const [novoPost, setNovoPost] = useState('')
  const [mostrarInput, setMostrarInput] = useState(false)
  const [postAberto, setPostAberto] = useState(null)
  const [novoComentario, setNovoComentario] = useState('')

  const navItems = [
    { id: 'home', icon: '🏠', label: 'Início', path: '/home' },
    { id: 'agenda', icon: '📅', label: 'Agenda', path: '/agenda' },
    { id: 'feed', icon: '👥', label: 'Feed', path: '/feed' },
    { id: 'mensagens', icon: '💬', label: 'Msgs', path: '/mensagens' },
    { id: 'perfil', icon: '🏆', label: 'Perfil', path: '/perfil' },
  ]

  const curtir = (id, emoji) => {
    setPosts(prev => prev.map(p =>
      p.id === id
        ? { ...p, curtidas: p.reacao === emoji ? p.curtidas - 1 : p.curtidas + 1, reacao: p.reacao === emoji ? null : emoji }
        : p
    ))
  }

  const comentar = (postId) => {
    if (!novoComentario.trim()) return
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, comentarios: [...p.comentarios, { autor: 'Franchesco', texto: novoComentario, hora: 'Agora' }] }
        : p
    ))
    setNovoComentario('')
  }

  const publicar = () => {
    if (!novoPost.trim()) return
    setPosts(prev => [{
      id: Date.now(), autor: 'Franchesco', initials: 'FR', coach: false,
      tempo: 'Agora', cor: '#1a1a2a',
      texto: novoPost, imagem: null, curtidas: 0, comentarios: [], reacao: null
    }, ...prev])
    setNovoPost('')
    setMostrarInput(false)
  }

  const aceitarDesafio = (id) => {
    setDesafios(prev => prev.map(d =>
      d.id === id ? { ...d, aceito: true, participantes: d.participantes + 1 } : d
    ))
  }

  // TELA DE COMENTÁRIOS
  if (postAberto !== null) {
    const post = posts.find(p => p.id === postAberto)
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'sans-serif', color: 'var(--text)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'var(--header-bg)', padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => setPostAberto(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '22px', cursor: 'pointer' }}>←</button>
          <div style={{ fontSize: '16px', fontWeight: '700' }}>Comentários</div>
        </div>

        {/* POST */}
        <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: post.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: 'white', border: post.coach ? '1.5px solid #CC1A1A' : 'none', flexShrink: 0 }}>{post.initials}</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>{post.autor} {post.coach && <span style={{ fontSize: '9px', background: 'rgba(204,26,26,0.2)', color: '#FF6B6B', padding: '1px 6px', borderRadius: '4px', marginLeft: '4px' }}>COACH</span>}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{post.tempo}</div>
            </div>
          </div>
          <div style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '10px' }}>{post.texto}</div>

          {/* EMOJIS */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {emojis.map(e => (
              <button key={e} onClick={() => curtir(post.id, e)} style={{
                background: post.reacao === e ? 'rgba(204,26,26,0.15)' : 'var(--surface2)',
                border: `1px solid ${post.reacao === e ? '#CC1A1A' : 'var(--border)'}`,
                borderRadius: '20px', padding: '4px 10px', cursor: 'pointer',
                fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px'
              }}>
                {e} {post.reacao === e && <span style={{ fontSize: '11px', color: '#CC1A1A' }}>{post.curtidas}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* COMENTÁRIOS */}
        <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px', paddingBottom: '80px' }}>
          {post.comentarios.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontSize: '13px' }}>
              Seja o primeiro a comentar! 💬
            </div>
          ) : (
            post.comentarios.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#CC1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: 'white', flexShrink: 0 }}>FR</div>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '8px 12px', flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '3px' }}>{c.autor}</div>
                  <div style={{ fontSize: '13px' }}>{c.texto}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>{c.hora}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* INPUT COMENTÁRIO */}
        <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', background: 'var(--nav-bg)', borderTop: '1px solid var(--border)', padding: '10px 16px', display: 'flex', gap: '8px', boxSizing: 'border-box' }}>
          <input
            value={novoComentario}
            onChange={e => setNovoComentario(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && comentar(post.id)}
            placeholder="Escreva um comentário..."
            style={{ flex: 1, padding: '12px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', color: 'var(--text)', fontSize: '13px', outline: 'none', fontFamily: 'sans-serif' }}
          />
          <button onClick={() => comentar(post.id)} style={{ width: '44px', height: '44px', background: '#CC1A1A', border: 'none', borderRadius: '50%', color: 'white', fontSize: '18px', cursor: 'pointer' }}>➤</button>
        </div>
      </div>
    )
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

      <div style={{ zIndex: 1, position: 'relative', paddingBottom: '80px' }}>

        {/* HEADER */}
        <div style={{ background: 'var(--header-bg)', padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.jpeg" alt="Athena" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid #CC1A1A', objectFit: 'cover' }} />
          <div style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '2px' }}>COMUNIDADE</div>
        </div>

        {/* ABAS */}
        <div style={{ display: 'flex', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          {[{ id: 'feed', label: 'Feed' }, { id: 'desafios', label: 'Desafios 🏆' }, { id: 'times', label: 'Times' }].map(a => (
            <button key={a.id} onClick={() => setAba(a.id)} style={{
              flex: 1, padding: '13px', background: 'none', border: 'none',
              color: aba === a.id ? '#CC1A1A' : 'var(--text-muted)',
              borderBottom: `2px solid ${aba === a.id ? '#CC1A1A' : 'transparent'}`,
              fontSize: '13px', cursor: 'pointer', fontFamily: 'sans-serif', transition: 'all 0.2s'
            }}>{a.label}</button>
          ))}
        </div>

        {/* FEED */}
        {aba === 'feed' && (
          <div>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
              {!mostrarInput ? (
                <div onClick={() => setMostrarInput(true)} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: '24px', padding: '12px 16px',
                  color: 'var(--text-muted)', cursor: 'pointer', fontSize: '13px'
                }}>
                  💪 Compartilhe sua evolução, Franchesco...
                </div>
              ) : (
                <div>
                  <textarea value={novoPost} onChange={e => setNovoPost(e.target.value)} placeholder="O que você quer compartilhar?" style={{
                    width: '100%', background: 'var(--surface)', border: '1px solid #CC1A1A',
                    borderRadius: '8px', padding: '12px', color: 'var(--text)',
                    fontSize: '13px', fontFamily: 'sans-serif', resize: 'none',
                    boxSizing: 'border-box', minHeight: '80px', outline: 'none'
                  }} />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button onClick={publicar} style={{ flex: 1, padding: '10px', background: '#CC1A1A', border: 'none', borderRadius: '6px', color: 'white', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}>PUBLICAR</button>
                    <button onClick={() => setMostrarInput(false)} style={{ padding: '10px 16px', background: 'var(--surface2)', border: 'none', borderRadius: '6px', color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer' }}>Cancelar</button>
                  </div>
                </div>
              )}
            </div>

            {posts.map(post => (
              <div key={post.id} style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: post.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: 'white', border: post.coach ? '1.5px solid #CC1A1A' : '1px solid var(--border)', flexShrink: 0 }}>{post.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>
                      {post.autor}
                      {post.coach && <span style={{ fontSize: '9px', background: 'rgba(204,26,26,0.2)', color: '#FF6B6B', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px' }}>COACH</span>}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '1px' }}>{post.tempo}</div>
                  </div>
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '10px' }}>{post.texto}</div>
                {post.imagem && (
                  <div style={{ height: '120px', background: 'var(--surface2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', marginBottom: '10px', border: '1px solid var(--border)' }}>{post.imagem}</div>
                )}

                {/* EMOJIS REAÇÃO */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  {emojis.map(e => (
                    <button key={e} onClick={() => curtir(post.id, e)} style={{
                      background: post.reacao === e ? 'rgba(204,26,26,0.15)' : 'var(--surface2)',
                      border: `1px solid ${post.reacao === e ? '#CC1A1A' : 'var(--border)'}`,
                      borderRadius: '20px', padding: '3px 8px', cursor: 'pointer', fontSize: '13px'
                    }}>{e}{post.reacao === e ? ` ${post.curtidas}` : ''}</button>
                  ))}
                </div>

                <button onClick={() => setPostAberto(post.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '12px', cursor: 'pointer', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  💬 {post.comentarios.length} comentário{post.comentarios.length !== 1 ? 's' : ''}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* DESAFIOS */}
        {aba === 'desafios' && (
          <div style={{ padding: '12px 16px' }}>
            {desafiosList.map(d => (
              <div key={d.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ background: d.cor, padding: '14px 16px' }}>
                  <div style={{ fontWeight: '900', fontSize: '16px', letterSpacing: '1px', color: 'white' }}>{d.titulo}</div>
                  <div style={{ fontSize: '11px', color: '#D4A017', marginTop: '3px' }}>{d.pts}</div>
                </div>
                <div style={{ padding: '12px 16px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '10px' }}>{d.desc}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    👥 {d.participantes} participantes aceitaram este desafio
                  </div>
                  <button onClick={() => aceitarDesafio(d.id)} style={{
                    width: '100%', padding: '10px', background: d.aceito ? '#4CAF50' : d.corBtn,
                    border: 'none', borderRadius: '6px', color: 'white',
                    fontWeight: '800', fontSize: '13px', cursor: d.aceito ? 'default' : 'pointer',
                    letterSpacing: '1px', textTransform: 'uppercase'
                  }}>{d.aceito ? '✓ DESAFIO ACEITO' : 'ACEITAR DESAFIO'}</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TIMES */}
        {aba === 'times' && (
          <div style={{ padding: '16px' }}>
            <div style={{ background: 'linear-gradient(135deg, #1a0000, #2d0000)', borderRadius: '12px', padding: '16px', marginBottom: '12px', border: '1px solid rgba(204,26,26,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '32px' }}>🔴</div>
                <div>
                  <div style={{ fontWeight: '900', fontSize: '20px', letterSpacing: '2px', color: '#FF6B6B' }}>TEAM ATHENA</div>
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>501+ pontos • Guerreiros veteranos</div>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#aaa', lineHeight: '1.6', marginBottom: '12px' }}>Os mais antigos, dedicados e pontuados do box. São a referência para todos. Cores: vermelho e preto 🔴⚫</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '10px 14px' }}>
                <div style={{ textAlign: 'center' }}><div style={{ fontWeight: '900', fontSize: '20px', color: '#FF6B6B' }}>23</div><div style={{ fontSize: '9px', color: '#888' }}>MEMBROS</div></div>
                <div style={{ textAlign: 'center' }}><div style={{ fontWeight: '900', fontSize: '20px', color: '#D4A017' }}>501+</div><div style={{ fontSize: '9px', color: '#888' }}>PONTOS MÍN.</div></div>
                <div style={{ textAlign: 'center' }}><div style={{ fontWeight: '900', fontSize: '20px' }}>🏆</div><div style={{ fontSize: '9px', color: '#888' }}>TROFÉU</div></div>
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #001530, #00264d)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(74,144,196,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '32px' }}>🔵</div>
                <div>
                  <div style={{ fontWeight: '900', fontSize: '20px', letterSpacing: '2px', color: '#7BB8E8' }}>TEAM APOLLO</div>
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>0–500 pontos • Em ascensão</div>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#aaa', lineHeight: '1.6', marginBottom: '12px' }}>Novos guerreiros se superando a cada treino para conquistar seu lugar no Team Athena. Cores: azul bebê e preto 🔵⚫</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '10px 14px' }}>
                <div style={{ textAlign: 'center' }}><div style={{ fontWeight: '900', fontSize: '20px', color: '#7BB8E8' }}>31</div><div style={{ fontSize: '9px', color: '#888' }}>MEMBROS</div></div>
                <div style={{ textAlign: 'center' }}><div style={{ fontWeight: '900', fontSize: '20px', color: '#7BB8E8' }}>0–500</div><div style={{ fontSize: '9px', color: '#888' }}>PONTOS</div></div>
                <div style={{ textAlign: 'center' }}><div style={{ fontWeight: '900', fontSize: '20px' }}>⚡</div><div style={{ fontSize: '9px', color: '#888' }}>ENERGIA</div></div>
              </div>
            </div>

            <div style={{ marginTop: '16px', background: 'rgba(204,26,26,0.1)', border: '1px solid rgba(204,26,26,0.3)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>VOCÊ ESTÁ NO</div>
              <div style={{ fontWeight: '900', fontSize: '18px', color: '#FF6B6B', letterSpacing: '2px' }}>🔴 TEAM ATHENA</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>643 pontos • Continue treinando! 💪</div>
            </div>
          </div>
        )}

      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', background: 'var(--nav-bg)', borderTop: '1px solid var(--border)', display: 'flex', zIndex: 100 }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => navigate(item.path)} style={{
            flex: 1, padding: '10px 4px 12px', background: 'none', border: 'none',
            color: item.id === 'feed' ? '#CC1A1A' : 'var(--text-muted)',
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

export default Feed