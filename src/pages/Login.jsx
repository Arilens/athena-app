import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

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
      background: '#0d0d0d', minHeight: '100vh', display: 'flex',
      flexDirection: 'column', fontFamily: 'sans-serif', color: 'white'
    }}>

      {/* WATERMARK */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', flexWrap: 'wrap', gap: '24px', padding: '16px',
        opacity: 0.04, pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
        alignContent: 'flex-start'
      }}>
        {Array.from({length: 40}).map((_, i) => (
          <span key={i} style={{ color: 'white', fontSize: '13px', whiteSpace: 'nowrap', fontWeight: 'bold', letterSpacing: '2px' }}>
            {['ATHENA', '⚡', 'CROSS TRAINING', 'Λ'][i % 4]}
          </span>
        ))}
      </div>

      <div style={{ padding: '24px', flex: 1, zIndex: 1, maxWidth: '400px', width: '100%', margin: '0 auto' }}>

        {/* VOLTAR */}
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', color: '#888',
          fontSize: '22px', cursor: 'pointer', padding: '4px 0', marginBottom: '20px'
        }}>←</button>

        {/* LOGO PEQUENO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <img src="/logo.jpeg" alt="Athena" style={{
            width: '48px', height: '48px', borderRadius: '50%',
            border: '1.5px solid #CC1A1A', objectFit: 'cover'
          }} />
          <div>
            <div style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '3px' }}>BEM-VINDO</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>Entre com sua conta</div>
          </div>
        </div>

        {/* FORMULÁRIO */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>E-mail ou Telefone</label>
          <input style={inputStyle} type="text" placeholder="seu@email.com ou (11) 99999-9999" />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Senha</label>
          <input style={inputStyle} type="password" placeholder="••••" />
        </div>

        {/* BOTÃO ENTRAR */}
        <button
          onClick={() => navigate('/home')}
          style={{
            width: '100%', padding: '15px', background: '#CC1A1A',
            border: 'none', borderRadius: '8px', color: 'white',
            fontSize: '16px', fontWeight: '800', letterSpacing: '3px',
            cursor: 'pointer', textTransform: 'uppercase'
          }}
        >
          ENTRAR NO TEMPLO
        </button>

        {/* LINK CADASTRO */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ fontSize: '13px', color: '#888' }}>Não tem conta? </span>
          <span
            onClick={() => navigate('/cadastro')}
            style={{ fontSize: '13px', color: '#CC1A1A', cursor: 'pointer', fontWeight: '600' }}
          >
            Inscreva-se
          </span>
        </div>

      </div>
    </div>
  )
}

export default Login