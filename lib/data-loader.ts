import { promises as fs } from "fs"
import path from "path"
import { type Provider, ProviderSchema } from "./schemas"

const DATA_DIR = path.join(process.cwd(), "data", "providers")

export async function loadProviders(): Promise<Provider[]> {
  try {
    const files = await fs.readdir(DATA_DIR)
    const jsonFiles = files.filter((file) => file.endsWith(".json"))

    const providers: Provider[] = []

    for (const file of jsonFiles) {
      const filePath = path.join(DATA_DIR, file)
      const fileContent = await fs.readFile(filePath, "utf-8")
      const rawData = JSON.parse(fileContent)

      // Validate data with Zod schema
      const validatedProvider = ProviderSchema.parse(rawData)
      providers.push(validatedProvider)
    }

    return providers
  } catch (error) {
    console.error("Error loading providers:", error)
    return []
  }
}

export async function loadProviderById(id: string): Promise<Provider | null> {
  try {
    const filePath = path.join(DATA_DIR, `${id}.json`)
    const fileContent = await fs.readFile(filePath, "utf-8")
    const rawData = JSON.parse(fileContent)

    return ProviderSchema.parse(rawData)
  } catch (error) {
    console.error(`Error loading provider ${id}:`, error)
    return null
  }
}

export async function loadProvidersByCategory(category: string): Promise<Provider[]> {
  const allProviders = await loadProviders()
  return allProviders.filter((provider) => provider.category === category)
}

export function validateProviderData(data: unknown): Provider {
  return ProviderSchema.parse(data)
}
