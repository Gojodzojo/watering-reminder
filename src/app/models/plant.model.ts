export interface Plant {
    id: string
    name: string
    description: string
    timezone: string
    waterTime: string
    imageUrl: string
}

export type PlantWithoutImage = Omit<Plant, 'imageUrl'>