import type { Person, Film, Planet, Starship } from './types'

// ─── People ───────────────────────────────────────────────────────────────────

export const people: Person[] = [
  {
    id: 1, name: 'Luke Skywalker', height: '172', mass: '77',
    hair_color: 'blond', skin_color: 'fair', eye_color: 'blue',
    birth_year: '19BBY', gender: 'male', homeworld_id: 1,
    film_ids: [1, 2, 3, 6], species_ids: [], vehicle_ids: [14, 30], starship_ids: [12, 22],
    created: '2014-12-09T13:50:51.644Z', edited: '2014-12-20T21:17:56.891Z',
  },
  {
    id: 2, name: 'C-3PO', height: '167', mass: '75',
    hair_color: 'n/a', skin_color: 'gold', eye_color: 'yellow',
    birth_year: '112BBY', gender: 'n/a', homeworld_id: 1,
    film_ids: [1, 2, 3, 4, 5, 6], species_ids: [2], vehicle_ids: [], starship_ids: [],
    created: '2014-12-10T15:10:51.357Z', edited: '2014-12-20T21:17:50.309Z',
  },
  {
    id: 3, name: 'R2-D2', height: '96', mass: '32',
    hair_color: 'n/a', skin_color: 'white, blue', eye_color: 'red',
    birth_year: '33BBY', gender: 'n/a', homeworld_id: 8,
    film_ids: [1, 2, 3, 4, 5, 6], species_ids: [2], vehicle_ids: [], starship_ids: [],
    created: '2014-12-10T15:11:50.376Z', edited: '2014-12-20T21:17:50.311Z',
  },
  {
    id: 4, name: 'Darth Vader', height: '202', mass: '136',
    hair_color: 'none', skin_color: 'white', eye_color: 'yellow',
    birth_year: '41.9BBY', gender: 'male', homeworld_id: 1,
    film_ids: [1, 2, 3, 6], species_ids: [], vehicle_ids: [], starship_ids: [13],
    created: '2014-12-10T15:18:20.704Z', edited: '2014-12-20T21:17:50.313Z',
  },
  {
    id: 5, name: 'Leia Organa', height: '150', mass: '49',
    hair_color: 'brown', skin_color: 'light', eye_color: 'brown',
    birth_year: '19BBY', gender: 'female', homeworld_id: 2,
    film_ids: [1, 2, 3, 6], species_ids: [], vehicle_ids: [30], starship_ids: [],
    created: '2014-12-10T15:20:09.791Z', edited: '2014-12-20T21:17:50.315Z',
  },
  {
    id: 6, name: 'Owen Lars', height: '178', mass: '120',
    hair_color: 'brown, grey', skin_color: 'light', eye_color: 'blue',
    birth_year: '52BBY', gender: 'male', homeworld_id: 1,
    film_ids: [1, 5, 6], species_ids: [], vehicle_ids: [], starship_ids: [],
    created: '2014-12-10T15:52:14.024Z', edited: '2014-12-20T21:17:50.317Z',
  },
  {
    id: 7, name: 'Han Solo', height: '180', mass: '80',
    hair_color: 'brown', skin_color: 'fair', eye_color: 'brown',
    birth_year: '29BBY', gender: 'male', homeworld_id: 22,
    film_ids: [1, 2, 3], species_ids: [], vehicle_ids: [], starship_ids: [10, 22],
    created: '2014-12-10T16:49:14.216Z', edited: '2014-12-20T21:17:50.323Z',
  },
  {
    id: 8, name: 'Chewbacca', height: '228', mass: '112',
    hair_color: 'brown', skin_color: 'unknown', eye_color: 'blue',
    birth_year: '200BBY', gender: 'male', homeworld_id: 14,
    film_ids: [1, 2, 3, 6], species_ids: [3], vehicle_ids: [], starship_ids: [10],
    created: '2014-12-10T16:42:45.066Z', edited: '2014-12-20T21:17:50.321Z',
  },
  {
    id: 9, name: 'Obi-Wan Kenobi', height: '182', mass: '77',
    hair_color: 'auburn, white', skin_color: 'fair', eye_color: 'blue-gray',
    birth_year: '57BBY', gender: 'male', homeworld_id: 20,
    film_ids: [1, 2, 3, 4, 5, 6], species_ids: [], vehicle_ids: [38], starship_ids: [48, 59, 64, 65, 74],
    created: '2014-12-10T16:16:29.192Z', edited: '2014-12-20T21:17:50.325Z',
  },
  {
    id: 10, name: 'Yoda', height: '66', mass: '17',
    hair_color: 'white', skin_color: 'green', eye_color: 'brown',
    birth_year: '896BBY', gender: 'male', homeworld_id: 28,
    film_ids: [2, 3, 4, 5, 6], species_ids: [6], vehicle_ids: [], starship_ids: [],
    created: '2014-12-15T12:26:01.042Z', edited: '2014-12-20T21:17:50.345Z',
  },
]

// ─── Films ────────────────────────────────────────────────────────────────────

export const films: Film[] = [
  {
    id: 1, title: 'A New Hope', episode_id: 4,
    opening_crawl: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.",
    director: 'George Lucas', producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    character_ids: [1, 2, 3, 4, 5, 6, 7, 8, 9], planet_ids: [1, 2, 3],
    starship_ids: [2, 3, 5, 9, 10, 11, 12, 13], vehicle_ids: [4, 6, 7, 8], species_ids: [1, 2, 3, 4, 5],
    created: '2014-12-10T14:23:31.880Z', edited: '2014-12-20T19:49:45.256Z',
  },
  {
    id: 2, title: 'The Empire Strikes Back', episode_id: 5,
    opening_crawl: "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase.",
    director: 'Irvin Kershner', producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1980-05-17',
    character_ids: [1, 2, 3, 4, 5, 7, 8, 9, 10], planet_ids: [4, 5, 6, 27],
    starship_ids: [3, 10, 11, 12, 15, 17, 21, 22, 23], vehicle_ids: [8, 14, 16, 18, 19, 20], species_ids: [1, 2, 3, 6, 7],
    created: '2014-12-12T11:26:24.656Z', edited: '2014-12-15T13:07:53.386Z',
  },
  {
    id: 3, title: 'Return of the Jedi', episode_id: 6,
    opening_crawl: "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.",
    director: 'Richard Marquand', producer: 'Howard Kazanjian, George Lucas, Rick McCallum',
    release_date: '1983-05-25',
    character_ids: [1, 2, 3, 4, 5, 7, 8, 9, 10], planet_ids: [1, 5, 7, 8, 9],
    starship_ids: [2, 3, 10, 11, 12, 13, 22, 23, 27, 28, 29], vehicle_ids: [8, 16, 18, 19, 24, 25, 26, 30], species_ids: [1, 2, 3, 5, 6, 8, 9, 10, 15],
    created: '2014-12-18T10:39:33.255Z', edited: '2014-12-20T09:48:37.462Z',
  },
  {
    id: 4, title: 'The Phantom Menace', episode_id: 1,
    opening_crawl: "Turmoil has engulfed the\r\nGalactic Republic. The taxation\r\nof trade routes to outlying star\r\nsystems is in dispute.",
    director: 'George Lucas', producer: 'Rick McCallum',
    release_date: '1999-05-19',
    character_ids: [2, 3, 10], planet_ids: [1, 8, 9],
    starship_ids: [31, 32, 39, 40, 41], vehicle_ids: [33, 34, 35, 36, 37, 38], species_ids: [1, 2, 6, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
    created: '2014-12-19T16:52:55.740Z', edited: '2014-12-20T10:54:07.216Z',
  },
  {
    id: 5, title: 'Attack of the Clones', episode_id: 2,
    opening_crawl: "There is unrest in the Galactic\r\nSenate. Several thousand solar\r\nsystems have declared their\r\nintentions to leave the Republic.",
    director: 'George Lucas', producer: 'Rick McCallum',
    release_date: '2002-05-16',
    character_ids: [2, 3, 6, 7, 10], planet_ids: [1, 8, 9],
    starship_ids: [21, 32, 39, 43, 47, 48, 52, 58, 59, 61, 63, 64, 65, 66, 68, 74, 75], vehicle_ids: [4, 44, 45, 46, 51, 53, 54, 55, 56, 57], species_ids: [1, 2, 6, 12, 13, 15, 28, 29, 30],
    created: '2014-12-20T10:57:57.886Z', edited: '2014-12-20T20:18:48.516Z',
  },
  {
    id: 6, title: 'Revenge of the Sith', episode_id: 3,
    opening_crawl: "War! The Republic is crumbling\r\nunder attacks by the ruthless\r\nSith Lord, Count Dooku.\r\nThere are heroes on both sides.\r\nEvil is everywhere.",
    director: 'George Lucas', producer: 'Rick McCallum',
    release_date: '2005-05-19',
    character_ids: [1, 2, 3, 4, 5, 8, 9, 10], planet_ids: [1, 2, 5, 8, 9, 12, 13, 14, 15, 16, 17, 18, 19],
    starship_ids: [2, 32, 48, 59, 61, 63, 64, 65, 66, 68, 74, 75], vehicle_ids: [33, 50, 53, 56, 60, 62, 67, 69, 70, 71, 72, 73, 76], species_ids: [1, 2, 3, 6, 15, 19, 20, 23, 24, 27, 28, 29, 30, 33, 34, 35, 36, 37],
    created: '2014-12-20T18:02:65.130Z', edited: '2014-12-20T20:18:48.516Z',
  },
]

// ─── Planets ──────────────────────────────────────────────────────────────────

export const planets: Planet[] = [
  {
    id: 1, name: 'Tatooine', rotation_period: '23', orbital_period: '304',
    diameter: '10465', climate: 'arid', gravity: '1 standard',
    terrain: 'desert', surface_water: '1', population: '200000',
    resident_ids: [1, 2, 4, 6], film_ids: [1, 3, 4, 5, 6],
    created: '2014-12-09T13:50:49.641Z', edited: '2014-12-20T20:58:18.420Z',
  },
  {
    id: 2, name: 'Alderaan', rotation_period: '24', orbital_period: '364',
    diameter: '12500', climate: 'temperate', gravity: '1 standard',
    terrain: 'grasslands, mountains', surface_water: '40', population: '2000000000',
    resident_ids: [5], film_ids: [1, 6],
    created: '2014-12-10T11:35:48.479Z', edited: '2014-12-20T20:58:18.420Z',
  },
  {
    id: 3, name: 'Yavin IV', rotation_period: '24', orbital_period: '4818',
    diameter: '10200', climate: 'temperate, tropical', gravity: '1 standard',
    terrain: 'jungle, rainforests', surface_water: '8', population: '1000',
    resident_ids: [], film_ids: [1],
    created: '2014-12-10T11:37:19.144Z', edited: '2014-12-20T20:58:18.420Z',
  },
  {
    id: 4, name: 'Hoth', rotation_period: '23', orbital_period: '549',
    diameter: '7200', climate: 'frozen', gravity: '1.1 standard',
    terrain: 'tundra, ice caves, mountain ranges', surface_water: '100', population: 'unknown',
    resident_ids: [], film_ids: [2],
    created: '2014-12-10T11:39:13.934Z', edited: '2014-12-20T20:58:18.420Z',
  },
  {
    id: 5, name: 'Dagobah', rotation_period: '23', orbital_period: '341',
    diameter: '8900', climate: 'murky', gravity: 'N/A',
    terrain: 'swamp, jungles', surface_water: '8', population: 'unknown',
    resident_ids: [10], film_ids: [2, 3, 6],
    created: '2014-12-10T11:42:22.590Z', edited: '2014-12-20T20:58:18.420Z',
  },
  {
    id: 6, name: 'Bespin', rotation_period: '12', orbital_period: '5110',
    diameter: '118000', climate: 'temperate', gravity: '1.5 (surface), 1 standard (Cloud City)',
    terrain: 'gas giant', surface_water: '0', population: '6000000',
    resident_ids: [], film_ids: [2],
    created: '2014-12-10T11:43:55.240Z', edited: '2014-12-20T20:58:18.420Z',
  },
  {
    id: 7, name: 'Endor', rotation_period: '18', orbital_period: '402',
    diameter: '4900', climate: 'temperate', gravity: '0.85 standard',
    terrain: 'forests, mountains, lakes', surface_water: '8', population: '30000000',
    resident_ids: [], film_ids: [3],
    created: '2014-12-10T11:50:29.349Z', edited: '2014-12-20T20:58:18.420Z',
  },
  {
    id: 8, name: 'Naboo', rotation_period: '26', orbital_period: '312',
    diameter: '12120', climate: 'temperate', gravity: '1 standard',
    terrain: 'grassy hills, swamps, forests, mountains', surface_water: '12', population: '4500000000',
    resident_ids: [], film_ids: [1, 4, 5, 6],
    created: '2014-12-10T11:52:31.066Z', edited: '2014-12-20T20:58:18.420Z',
  },
  {
    id: 9, name: 'Coruscant', rotation_period: '24', orbital_period: '368',
    diameter: '12240', climate: 'temperate', gravity: '1 standard',
    terrain: 'cityscape, mountains', surface_water: 'unknown', population: '1000000000000',
    resident_ids: [10], film_ids: [1, 3, 4, 5, 6],
    created: '2014-12-10T11:54:13.921Z', edited: '2014-12-20T20:58:18.420Z',
  },
  {
    id: 10, name: 'Kamino', rotation_period: '27', orbital_period: '463',
    diameter: '19720', climate: 'temperate', gravity: '1 standard',
    terrain: 'ocean', surface_water: '100', population: '1000000000',
    resident_ids: [], film_ids: [5],
    created: '2014-12-10T12:45:06.577Z', edited: '2014-12-20T20:58:18.420Z',
  },
]

// ─── Starships ────────────────────────────────────────────────────────────────

export const starships: Starship[] = [
  {
    id: 2, name: 'CR90 corvette', model: 'CR90 corvette',
    manufacturer: 'Corellian Engineering Corporation',
    cost_in_credits: '3500000', length: '150',
    max_atmosphering_speed: '950', crew: '30-165', passengers: '600',
    cargo_capacity: '3000000', consumables: '1 year',
    hyperdrive_rating: '2.0', MGLT: '60', starship_class: 'corvette',
    pilot_ids: [], film_ids: [1, 3, 6],
    created: '2014-12-10T14:20:33.369Z', edited: '2014-12-20T21:23:49.867Z',
  },
  {
    id: 3, name: 'Star Destroyer', model: 'Imperial I-class Star Destroyer',
    manufacturer: 'Kuat Drive Yards',
    cost_in_credits: '150000000', length: '1,600',
    max_atmosphering_speed: '975', crew: '47060', passengers: '0',
    cargo_capacity: '36000000', consumables: '2 years',
    hyperdrive_rating: '2.0', MGLT: '60', starship_class: 'Star Destroyer',
    pilot_ids: [], film_ids: [1, 2, 3],
    created: '2014-12-10T15:08:19.848Z', edited: '2014-12-20T21:23:49.870Z',
  },
  {
    id: 5, name: 'Sentinel-class landing craft', model: 'Sentinel-class landing craft',
    manufacturer: 'Sienar Fleet Systems, Cyngus Spaceworks',
    cost_in_credits: '240000', length: '38',
    max_atmosphering_speed: '1000', crew: '5', passengers: '75',
    cargo_capacity: '180000', consumables: '1 month',
    hyperdrive_rating: '1.0', MGLT: '70', starship_class: 'landing craft',
    pilot_ids: [], film_ids: [1],
    created: '2014-12-10T15:48:00.586Z', edited: '2014-12-20T21:23:49.873Z',
  },
  {
    id: 9, name: 'Death Star', model: 'DS-1 Orbital Battle Station',
    manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
    cost_in_credits: '1000000000000', length: '120000',
    max_atmosphering_speed: 'n/a', crew: '342953', passengers: '843342',
    cargo_capacity: '1000000000000', consumables: '3 years',
    hyperdrive_rating: '4.0', MGLT: '10', starship_class: 'Deep Space Mobile Battlestation',
    pilot_ids: [], film_ids: [1],
    created: '2014-12-10T16:36:50.509Z', edited: '2014-12-20T21:26:24.783Z',
  },
  {
    id: 10, name: 'Millennium Falcon', model: 'YT-1300 light freighter',
    manufacturer: 'Corellian Engineering Corporation',
    cost_in_credits: '100000', length: '34.37',
    max_atmosphering_speed: '1050', crew: '4', passengers: '6',
    cargo_capacity: '100000', consumables: '2 months',
    hyperdrive_rating: '0.5', MGLT: '75', starship_class: 'Light freighter',
    pilot_ids: [7, 8, 1, 2], film_ids: [1, 2, 3],
    created: '2014-12-10T16:59:45.094Z', edited: '2014-12-20T21:23:49.880Z',
  },
  {
    id: 11, name: 'Y-wing', model: 'BTL Y-wing', manufacturer: 'Koensayr Manufacturing',
    cost_in_credits: '134999', length: '14', max_atmosphering_speed: '1000km',
    crew: '2', passengers: '0', cargo_capacity: '110', consumables: '1 week',
    hyperdrive_rating: '1.0', MGLT: '80', starship_class: 'assault starfighter',
    pilot_ids: [], film_ids: [1, 2, 3],
    created: '2014-12-12T11:00:39.817Z', edited: '2014-12-20T21:23:49.883Z',
  },
  {
    id: 12, name: 'X-wing', model: 'T-65 X-wing', manufacturer: 'Incom Corporation',
    cost_in_credits: '149999', length: '12.5', max_atmosphering_speed: '1050',
    crew: '1', passengers: '0', cargo_capacity: '110', consumables: '1 week',
    hyperdrive_rating: '1.0', MGLT: '100', starship_class: 'Starfighter',
    pilot_ids: [1, 9, 18, 19], film_ids: [1, 2, 3],
    created: '2014-12-12T11:19:05.340Z', edited: '2014-12-20T21:23:49.886Z',
  },
  {
    id: 13, name: 'TIE Advanced x1', model: 'Twin Ion Engine Advanced x1',
    manufacturer: 'Sienar Fleet Systems',
    cost_in_credits: 'unknown', length: '9.2', max_atmosphering_speed: '1200',
    crew: '1', passengers: '0', cargo_capacity: '150', consumables: '5 days',
    hyperdrive_rating: '1.0', MGLT: '105', starship_class: 'Starfighter',
    pilot_ids: [4], film_ids: [1],
    created: '2014-12-12T11:21:32.991Z', edited: '2014-12-20T21:23:49.889Z',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Pricing for shop endpoints (credits per unit)
export const itemPricing: Record<string, number> = {
  starship_2: 3500000,
  starship_3: 150000000,
  starship_5: 240000,
  starship_9: 1000000000000,
  starship_10: 100000,
  starship_11: 134999,
  starship_12: 149999,
  starship_13: 999999,
}

export function getStarshipPrice(id: number): number {
  return itemPricing[`starship_${id}`] ?? 50000
}

export function getPlanetName(id: number): string {
  return planets.find((p) => p.id === id)?.name ?? 'Unknown'
}
