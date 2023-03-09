export enum Dishes {
  starter = 'starter',
  main = 'main',
  dessert = 'dessert',
  drink = 'drink'
}

export const DishesTitle: Record<Dishes, string> = {
  [Dishes.starter]: 'Entrée',
  [Dishes.main]: 'Plats',
  [Dishes.dessert]: 'Désserts',
  [Dishes.drink]: 'Boissons'
}
