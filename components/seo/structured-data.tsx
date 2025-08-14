export function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ContábilCompare",
    url: "https://contabilcompare.com.br",
    logo: "https://contabilcompare.com.br/logo.png",
    description: "Plataforma de comparação de planos contábeis para MEI, ME e EPP com dados reais e transparentes.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ContábilCompare",
    url: "https://contabilcompare.com.br",
    description:
      "Compare planos contábeis reais para MEI, ME e EPP. Encontre o serviço ideal baseado no seu perfil empresarial.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://contabilcompare.com.br/comparar?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Comparação de Planos Contábeis",
    description: "Serviço gratuito de comparação de planos contábeis para empresas brasileiras (MEI, ME, EPP)",
    provider: {
      "@type": "Organization",
      name: "ContábilCompare",
    },
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "MEI, Microempresa, Empresa de Pequeno Porte",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceData),
        }}
      />
    </>
  )
}
