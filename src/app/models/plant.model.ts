export interface Plant {
    id: string
    name: string
    description: string
    timezone: string
    waterTime: string
    imageDataUrl: string
}

export type PlantWithoutImage = Omit<Plant, 'imageDataUrl'>