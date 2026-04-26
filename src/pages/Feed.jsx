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

const postsIniciais = [
  {
    id: 1, autor: 'Coach Ana Lima', initials: 'CA', coach: true,
    tempo: 'Hoje, 08:30', cor: '#CC1A1A',
    texto: '🔥 Galera! O WOD de hoje vai ser épico — preparem os ombros! Quarta 19h tem EMOM especial. Quem tá dentro? 💪',
    imagem: null, curtidas: 24, comentarios: 8, reacao: null
  },
  {
    id: 2, autor: 'Maria Fernanda', initials: 'MF', coach: false,
    tempo: 'Ontem, 19:45', cor: '#1a2a1a',
    texto: 'Primeiro handstand walk da minha vida hoje! 🙌 Obrigada a todo o team! 6 meses de treino valeram cada gota de suor 💪🏛️',
    imagem: '🤸', curtidas: 41, comentarios: 15, reacao: null
  },
  {
    id: 3, autor: 'Coach Marcos Reis', initials: 'CM', coach: true,
    tempo: '23/04, 07:00', cor: '#CC1A1A',
    texto: '📋 Programação da semana disponível! Sábado o AULÃO começa às 09h30 — aula livre pra todo mundo. Venham! 🏋️',
    imagem: null, curtidas: 19, comentarios: 6, reacao: null
  },
  {
    id: 4, autor: 'Pedro Alves', initials: 'PA', coach: false,
    tempo: '22/04, 20:10', cor: '#2a1a00',
    texto: 'PR no deadlift hoje! 120kg! 🏆 Quem diria que 4 meses atrás eu mal agachava com o peso do corpo ahahah',
    imagem: '🏋️', curtidas: 33, comentarios: 11, reacao: null
  },
]

const desafios = [
  {
    id: 1, titulo: '🏆 DESAFIO DA SEMANA', pts: '+50 pontos • válido até domingo',
    cor: '#1a0000', corBtn: '#CC1A1A',
    desc: 'Treine 4x esta semana e poste sua evolução no feed com a hashtag #AthenaSemana. Os 3 melhores posts ganham pontos extras!',
    aceito: false
  },
  {
    id: 2, titulo: '⚡ DESAFIO HYROX', pts: '+80 pontos • válido até 30/04',
    cor: '#001530', corBtn: '#4A90C4',
    desc: 'Complete o simulado Hyrox completo no treino de sábado. Todos que completarem ganham 80 pontos + troféu exclusivo!',
    aceito: false
  },
  {
    id: 3, titulo: '🔥 DESAFIO FORÇA', pts: '+30 pontos • válido essa semana',
    cor: '#1a1000', corBtn: '#D4A017',
    desc: 'Bata seu PR pessoal em qualquer levantamento e poste o vídeo aqui no feed. Vale qualquer modalidade!',
    aceito: false
  },
]

function Feed() {
  const navigate = useNavigate()
  const [aba, setAba] = useState('feed')
  const [posts, setPosts] = useState(postsIniciais)
  const [desafiosList, setDesafios] = useState(desafios)
  const [novoPost, setNovoPost] = useState('')
  const [mostrarInput, setMostrarInput] = useState(false)

  const navItems = [
    { id: 'home', icon: '🏠', label: 'Início', path: '/home' },
    { id: 'agenda', icon: '📅', label: 'Agenda', path: '/agenda' },
    { id: 'feed', icon: '👥', label: 'Feed', path: '/feed' },
    { id: 'mensagens', icon: '💬', label: 'Msgs', path: '/mensagens' },
    { id: 'perfil', icon: '🏆', label: 'Perfil', path: '/perfil' },
  ]

  const curtir = (id) => {
    setPosts(prev => prev.map(p =>
      p.id === id
        ? { ...p, curtidas: p.reacao === '❤️' ? p.curtidas - 1 : p.curtidas + 1, reacao: p.reacao === '❤️' ? null : '❤️' }
        : p
    ))
  }

  const publicar = () => {
    if (!novoPost.trim()) return
    setPosts(prev => [{
      id: Date.now(), autor: 'Franchesco', initials: 'FR', coach: false,
      tempo: 'Agora', cor: '#1a1a2a',
      texto: novoPost, imagem: null, curtidas: 0, comentarios: 0, reacao: null
    }, ...prev])
    setNovoPost('')
    setMostrarInput(false)
  }

  const aceitarDesafio = (id) => {
    setDesafios(prev => prev.map(d => d.id === id ? { ...d, aceito: true } : d))
  }

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white', position: 'relative' }}>
      <Watermark />
      <div style={{ zIndex: 1, position: 'relative', paddingBottom: '80px' }}>

        {/* HEADER */}
        <div style={{ background: '#111', padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.jpeg" alt="Athena" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid #CC1A1A', objectFit: 'cover' }} />
          <div style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '2px' }}>COMUNIDADE</div>
        </div>

        {/* ABAS */}
        <div style={{ display: 'flex', background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { id: 'feed', label: 'Feed' },
            { id: 'desafios', label: 'Desafios 🏆' },
            { id: 'times', label: 'Times' },
          ].map(a => (
            <button key={a.id} onClick={() => setAba(a.id)} style={{
              flex: 1, padding: '13px', background: 'none', border: 'none',
              color: aba === a.id ? '#CC1A1A' : '#888',
              borderBottom: `2px solid ${aba === a.id ? '#CC1A1A' : 'transparent'}`,
              fontSize: '13px', cursor: 'pointer', fontFamily: 'sans-serif',
              transition: 'all 0.2s'
            }}>{a.label}</button>
          ))}
        </div>

        {/* FEED */}
        {aba === 'feed' && (
          <div>
            {/* NOVO POST */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {!mostrarInput ? (
                <div
                  onClick={() => setMostrarInput(true)}
                  style={{
                    background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '24px', padding: '12px 16px',
                    color: '#888', cursor: 'pointer', fontSize: '13px'
                  }}
                >
                  💪 Compartilhe sua evolução, Franchesco...
                </div>
              ) : (
                <div>
                  <textarea
                    value={novoPost}
                    onChange={e => setNovoPost(e.target.value)}
                    placeholder="O que você quer compartilhar?"
                    style={{
                      width: '100%', background: '#1a1a1a', border: '1px solid #CC1A1A',
                      borderRadius: '8px', padding: '12px', color: 'white',
                      fontSize: '13px', fontFamily: 'sans-serif', resize: 'none',
                      boxSizing: 'border-box', minHeight: '80px', outline: 'none'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button onClick={publicar} style={{
                      flex: 1, padding: '10px', background: '#CC1A1A', border: 'none',
                      borderRadius: '6px', color: 'white', fontWeight: '800',
                      fontSize: '13px', cursor: 'pointer', letterSpacing: '1px'
                    }}>PUBLICAR</button>
                    <button onClick={() => setMostrarInput(false)} style={{
                      padding: '10px 16px', background: '#242424', border: 'none',
                      borderRadius: '6px', color: '#888', fontSize: '13px', cursor: 'pointer'
                    }}>Cancelar</button>
                  </div>
                </div>
              )}
            </div>

            {/* POSTS */}
            {posts.map(post => (
              <div key={post.id} style={{ background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    background: post.cor, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '13px', fontWeight: '700',
                    border: post.coach ? '1.5px solid #CC1A1A' : '1px solid rgba(255,255,255,0.1)',
                    flexShrink: 0, color: 'white'
                  }}>{post.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>
                      {post.autor}
                      {post.coach && <span style={{ fontSize: '9px', background: 'rgba(204,26,26,0.2)', color: '#FF6B6B', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px' }}>COACH</span>}
                    </div>
                    <div style={{ fontSize: '10px', color: '#888', marginTop: '1px' }}>{post.tempo}</div>
                  </div>
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '10px' }}>{post.texto}</div>
                {post.imagem && (
                  <div style={{
                    height: '120px', background: '#242424', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '40px', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.08)'
                  }}>{post.imagem}</div>
                )}
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button onClick={() => curtir(post.id)} style={{
                    background: 'none', border: 'none',
                    color: post.reacao === '❤️' ? '#CC1A1A' : '#888',
                    fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                    fontFamily: 'sans-serif'
                  }}>❤️ {post.curtidas}</button>
                  <button style={{ background: 'none', border: 'none', color: '#888', fontSize: '12px', cursor: 'pointer', fontFamily: 'sans-serif' }}>💬 {post.comentarios}</button>
                  <button style={{ background: 'none', border: 'none', color: '#888', fontSize: '12px', cursor: 'pointer', fontFamily: 'sans-serif' }}>🎉</button>
                  <button style={{ background: 'none', border: 'none', color: '#888', fontSize: '12px', cursor: 'pointer', fontFamily: 'sans-serif' }}>🔥</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DESAFIOS */}
        {aba === 'desafios' && (
          <div style={{ padding: '12px 16px' }}>
            {desafiosList.map(d => (
              <div key={d.id} style={{
                background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px', overflow: 'hidden', marginBottom: '12px'
              }}>
                <div style={{ background: d.cor, padding: '14px 16px' }}>
                  <div style={{ fontWeight: '900', fontSize: '16px', letterSpacing: '1px' }}>{d.titulo}</div>
                  <div style={{ fontSize: '11px', color: '#D4A017', marginTop: '3px' }}>{d.pts}</div>
                </div>
                <div style={{ padding: '12px 16px' }}>
                  <div style={{ fontSize: '12px', color: '#888', lineHeight: '1.5', marginBottom: '10px' }}>{d.desc}</div>
                  <button
                    onClick={() => aceitarDesafio(d.id)}
                    style={{
                      width: '100%', padding: '10px', background: d.aceito ? '#333' : d.corBtn,
                      border: 'none', borderRadius: '6px', color: d.aceito ? '#888' : 'white',
                      fontWeight: '800', fontSize: '13px', cursor: d.aceito ? 'default' : 'pointer',
                      letterSpacing: '1px', textTransform: 'uppercase'
                    }}
                  >{d.aceito ? '✓ DESAFIO ACEITO' : 'ACEITAR DESAFIO'}</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TIMES */}
        {aba === 'times' && (
          <div style={{ padding: '16px' }}>
            {/* TEAM ATHENA */}
            <div style={{
              background: 'linear-gradient(135deg, #1a0000, #2d0000)',
              borderRadius: '12px', padding: '16px', marginBottom: '12px',
              border: '1px solid rgba(204,26,26,0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '32px' }}>🔴</div>
                <div>
                  <div style={{ fontWeight: '900', fontSize: '20px', letterSpacing: '2px', color: '#FF6B6B' }}>TEAM ATHENA</div>
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>501+ pontos • Guerreiros veteranos</div>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#aaa', lineHeight: '1.6', marginBottom: '12px' }}>
                Os mais antigos, dedicados e pontuados do box. São a referência e inspiração para todos os novos guerreiros. Cores: vermelho e preto 🔴⚫
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '10px 14px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: '900', fontSize: '20px', color: '#FF6B6B' }}>23</div>
                  <div style={{ fontSize: '9px', color: '#888' }}>MEMBROS</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: '900', fontSize: '20px', color: '#D4A017' }}>501+</div>
                  <div style={{ fontSize: '9px', color: '#888' }}>PONTOS MÍN.</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: '900', fontSize: '20px', color: '#4CAF50' }}>🏆</div>
                  <div style={{ fontSize: '9px', color: '#888' }}>TROFÉU</div>
                </div>
              </div>
            </div>

            {/* TEAM APOLLO */}
            <div style={{
              background: 'linear-gradient(135deg, #001530, #00264d)',
              borderRadius: '12px', padding: '16px',
              border: '1px solid rgba(74,144,196,0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '32px' }}>🔵</div>
                <div>
                  <div style={{ fontWeight: '900', fontSize: '20px', letterSpacing: '2px', color: '#7BB8E8' }}>TEAM APOLLO</div>
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>0–500 pontos • Em ascensão</div>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#aaa', lineHeight: '1.6', marginBottom: '12px' }}>
                Novos guerreiros que estão se superando a cada treino para conquistar seu lugar no Team Athena. Cores: azul bebê e preto 🔵⚫
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '10px 14px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: '900', fontSize: '20px', color: '#7BB8E8' }}>31</div>
                  <div style={{ fontSize: '9px', color: '#888' }}>MEMBROS</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: '900', fontSize: '20px', color: '#7BB8E8' }}>0–500</div>
                  <div style={{ fontSize: '9px', color: '#888' }}>PONTOS</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: '900', fontSize: '20px' }}>⚡</div>
                  <div style={{ fontSize: '9px', color: '#888' }}>ENERGIA</div>
                </div>
              </div>
            </div>

            {/* VOCÊ ESTÁ EM */}
            <div style={{
              marginTop: '16px', background: 'rgba(204,26,26,0.1)',
              border: '1px solid rgba(204,26,26,0.3)', borderRadius: '10px', padding: '14px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>VOCÊ ESTÁ NO</div>
              <div style={{ fontWeight: '900', fontSize: '18px', color: '#FF6B6B', letterSpacing: '2px' }}>🔴 TEAM ATHENA</div>
              <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>643 pontos • Continue treinando! 💪</div>
            </div>
          </div>
        )}

      </div>

      {/* BOTTOM NAV */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, width: '100%',
        background: '#161616', borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', zIndex: 100
      }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => navigate(item.path)} style={{
            flex: 1, padding: '10px 4px 12px', background: 'none', border: 'none',
            color: item.id === 'feed' ? '#CC1A1A' : '#888',
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