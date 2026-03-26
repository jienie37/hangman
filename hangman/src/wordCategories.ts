export type CategoryKey = "random" | "animals" | "countries" | "food" | "sports" | "technology"

const animals = [
  "elephant", "giraffe", "penguin", "crocodile", "butterfly",
  "octopus", "cheetah", "gorilla", "dolphin", "platypus",
  "flamingo", "porcupine", "armadillo", "chameleon", "mongoose",
  "jaguar", "hedgehog", "kangaroo", "wolverine", "narwhal",
]

const countries = [
  "australia", "brazil", "canada", "denmark", "egypt",
  "finland", "germany", "hungary", "iceland", "japan",
  "kenya", "luxembourg", "mexico", "nigeria", "portugal",
  "qatar", "sweden", "thailand", "ukraine", "vietnam",
]

const food = [
  "spaghetti", "croissant", "avocado", "hamburger", "sushi",
  "chocolate", "pineapple", "burrito", "ramen", "lasagna",
  "guacamole", "tiramisu", "pretzel", "quesadilla", "pancake",
  "mozzarella", "empanada", "risotto", "dumpling", "bruschetta",
]

const sports = [
  "basketball", "volleyball", "badminton", "swimming", "gymnastics",
  "wrestling", "archery", "snowboard", "cricket", "lacrosse",
  "waterpolo", "triathlon", "curling", "fencing", "kayaking",
  "skateboard", "motocross", "biathlon", "decathlon", "bobsled",
]

const technology = [
  "computer", "keyboard", "algorithm", "javascript", "database",
  "blockchain", "microchip", "software", "browser", "interface",
  "transistor", "compiler", "network", "protocol", "framework",
  "cybersecurity", "raspberry", "javascript", "typescript", "bandwidth",
]

const all = [...animals, ...countries, ...food, ...sports, ...technology]

export const wordCategories: Record<CategoryKey, string[]> = {
  random: all,
  animals,
  countries,
  food,
  sports,
  technology,
}

export const categoryEmoji: Record<CategoryKey, string> = {
  random: "🎲",
  animals: "🦁",
  countries: "🌍",
  food: "🍕",
  sports: "⚽",
  technology: "💻",
}
