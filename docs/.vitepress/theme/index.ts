import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    if (typeof window !== 'undefined') {
      import('mermaid').then((m) => {
        m.default.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose'
        })
        const renderDiagrams = () => {
          setTimeout(() => {
            const elements = document.querySelectorAll('.mermaid')
            if (elements.length > 0) {
              m.default.run({ querySelector: '.mermaid' }).catch(() => {})
            }
          }, 150)
        }
        router.onAfterRouteChanged = renderDiagrams
        renderDiagrams()
      })
    }
  }
}
