import Link from 'next/link'
import './styles.css'

export default function HomePage() {
  return (
    <main className="home2">
      <section className="home-hero2">
        <div className="home-hero2__inner">
          <p className="home-hero2__eyebrow">NTT DATA · Design System</p>

          <h1 className="home-hero2__title">Aletheia Components</h1>

          <p className="home-hero2__subtitle">
            Biblioteca de componentes reutilizables para construir productos de forma consistente,
            rápida y con buena experiencia de usuario.
          </p>

          <div className="home-hero2__actions">
            {/* Cambia la ruta del href a la página principal de tu doc (slug) */}
            <Link href="/introduccion" className="home-btn home-btn--primary">
              Entrar a la documentación
            </Link>

            <Link href="/home" className="home-btn2 home-btn2--ghost">
              Ver todos los componentes
            </Link>
          </div>

          <p className="home-hero2__hint">
            También puedes navegar directamente desde el menú lateral de la documentación.
          </p>
        </div>
      </section>
    </main>
  )
}
