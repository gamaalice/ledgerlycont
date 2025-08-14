import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { StructuredData } from "@/components/seo/structured-data"
import { Analytics } from "@/components/analytics/analytics"
import { InstallPrompt } from "@/components/pwa/install-prompt"
import Script from "next/script"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Ledgerly - Comparador de Planos Contábeis",
    template: "%s | Ledgerly",
  },
  description:
    "Compare planos contábeis reais para MEI, ME e EPP. Encontre o serviço ideal baseado no seu perfil empresarial com dados atualizados e transparentes.",
  keywords: [
    "contabilidade",
    "MEI",
    "ME",
    "EPP",
    "planos contábeis",
    "comparador",
    "serviços contábeis",
    "microempreendedor",
    "microempresa",
    "empresa pequeno porte",
  ],
  authors: [{ name: "Ledgerly" }],
  creator: "Ledgerly",
  publisher: "Ledgerly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ledgerly.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://ledgerly.com.br",
    title: "Ledgerly - Comparador de Planos Contábeis",
    description:
      "Compare planos contábeis reais para MEI, ME e EPP. Encontre o serviço ideal baseado no seu perfil empresarial.",
    siteName: "Ledgerly",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ledgerly - Comparador de Planos Contábeis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ledgerly - Comparador de Planos Contábeis",
    description:
      "Compare planos contábeis reais para MEI, ME e EPP. Encontre o serviço ideal baseado no seu perfil empresarial.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${robotoMono.variable} antialiased`}>
      <head>
        <StructuredData />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0D3B66" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                  })
                  .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `}
        </Script>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <Script id="google-analytics">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
            <Toaster />
            <InstallPrompt />
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
