export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Dados coletados de fontes públicas • Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>
          <p className="text-xs text-gray-500 mt-2">&copy; 2024 PlanContábil • Ferramenta de comparação independente</p>
        </div>
      </div>
    </footer>
  )
}
