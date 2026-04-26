import { useNavigate } from 'react-router-dom'

function Splash() {
  const navigate = useNavigate()

  return (
    <div style={{
      background: '#0d0d0d',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* WATERMARK de fundo */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', flexWrap: 'wrap', gap: '24px', padding: '16px',
        opacity: 0.04, pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
        alignContent: 'flex-start'
      }}>
        {Array.from({length: 40}).map((_, i) => (
          <span key={i} style={{
            color: 'white', fontSize: '13px', whiteSpace: 'nowrap',
            fontWeight: 'bold', letterSpacing: '2px'
          }}>
            {['ATHENA', '⚡', 'CROSS TRAINING', 'Λ'][i % 4]}
          </span>
        ))}
      </div>

      {/* CONTEÚDO CENTRAL */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '24px', zIndex: 1, padding: '40px 20px', maxWidth: '320px', width: '100%'
      }}>

        {/* LOGO */}
        <div style={{
          width: '160px', height: '160px', borderRadius: '50%',
          overflow: 'hidden', border: '2px solid #CC1A1A',
          boxShadow: '0 0 30px rgba(204,26,26,0.3)'
        }}>
          <img
            src="/logo.jpeg"
            alt="Athena Cross Training"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* NOME */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            color: 'white', fontSize: '36px', fontWeight: '900',
            letterSpacing: '4px', lineHeight: 1,
            textTransform: 'uppercase'
          }}>ATHENA</div>
          <div style={{
            color: '#CC1A1A', fontSize: '11px', letterSpacing: '6px',
            textTransform: 'uppercase', marginTop: '4px'
          }}>CROSS TRAINING</div>
          <div style={{
            color: '#666', fontSize: '12px', marginTop: '8px',
            fontStyle: 'italic'
          }}>Esforço Merece Respeito</div>
        </div>

        {/* BOTÕES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '16px', background: '#CC1A1A', border: 'none',
              borderRadius: '8px', color: 'white', fontSize: '16px',
              fontWeight: '800', letterSpacing: '3px', cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            ENTRAR
          </button>
          <button
            onClick={() => navigate('/cadastro')}
            style={{
              padding: '16px', background: 'transparent',
              border: '1.5px solid rgba(255,255,255,0.2)',
              borderRadius: '8px', color: 'white', fontSize: '16px',
              fontWeight: '800', letterSpacing: '2px', cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            QUERO ME INSCREVER
          </button>
        </div>

      </div>
    </div>
  )
}

export default Splash