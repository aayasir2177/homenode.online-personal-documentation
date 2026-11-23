import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE_CONFIG } from '@/data/siteConfig';
import { PROJECTS } from '@/data/projects';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'DevOps Engineer',
    'Kubernetes',
    'GitOps',
    'ArgoCD',
    'Docker',
    'Ansible',
    'Terraform',
    'Linux Systems Administration',
    'Prometheus',
    'Grafana',
    'Cloudflare QUIC Tunnels',
    'Homelab',
    'Python',
    'TypeScript',
    'Portfolio',
    'Yasir',
    'aayasir2177',
    'homenode.online',
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.links.github }],
  creator: SITE_CONFIG.name,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: 'HomeNode | Yasir',
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 460,
        height: 460,
        alt: `${SITE_CONFIG.name} DevOps Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_CONFIG.url}/#person`,
        name: SITE_CONFIG.name,
        alternateName: SITE_CONFIG.handle,
        url: SITE_CONFIG.url,
        image: SITE_CONFIG.ogImage,
        jobTitle: 'DevOps Engineer & Homelab Architect',
        email: `mailto:${SITE_CONFIG.email}`,
        sameAs: [SITE_CONFIG.links.github, SITE_CONFIG.links.linkedin],
        knowsAbout: [
          'DevOps',
          'Kubernetes',
          'GitOps',
          'ArgoCD',
          'Docker',
          'Ansible',
          'Terraform',
          'Prometheus',
          'Grafana',
          'Linux Administration',
          'Bash Scripting',
          'Cloudflare QUIC Tunnels',
          'Python',
          'TypeScript',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: 'HomeNode | Yasir - DevOps Engineer & Homelab Architect',
        description: SITE_CONFIG.description,
        publisher: { '@id': `${SITE_CONFIG.url}/#person` },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_CONFIG.url}/#projects`,
        name: 'Featured Engineering Projects by Yasir',
        description: 'Showcase of DevOps, Kubernetes, Linux Automation, and Cloud Infrastructure repositories by Yasir.',
        itemListElement: PROJECTS.slice(0, 15).map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: p.title,
          description: p.description,
          url: p.html_url,
        })),
      },
    ],
  };

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = saved || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
