export interface Launch {
  id: string
  mission_name: string
  launch_date_utc: string
  launch_success: boolean | null
  details: string | null
  rocket: {
    rocket_name: string
    rocket_type: string
  }
  links: {
    mission_patch: string | null
    mission_patch_small: string | null
    article_link: string | null
    wikipedia: string | null
    video_link: string | null
    flickr_images: string[]
  }
  launch_site: {
    site_name_long: string
  }
  payloads?: {
    payload_id: string
    payload_type: string
    payload_mass_kg: number | null
    orbit: string
  }[]
}

export interface Rocket {
  id: string
  rocket_name: string
  rocket_type: string
  description: string
  height: {
    meters: number
    feet: number
  }
  diameter: {
    meters: number
    feet: number
  }
  mass: {
    kg: number
    lb: number
  }
  first_stage: {
    reusable: boolean
    engines: number
    fuel_amount_tons: number
    burn_time_sec: number
  }
  second_stage: {
    engines: number
    fuel_amount_tons: number
    burn_time_sec: number
  }
  engines: {
    number: number
    type: string
    version: string
    layout: string
    engine_loss_max: number
    propellant_1: string
    propellant_2: string
    thrust_sea_level: {
      kN: number
      lbf: number
    }
    thrust_vacuum: {
      kN: number
      lbf: number
    }
  }
  landing_legs: {
    number: number
    material: string
  }
  payload_weights: {
    id: string
    name: string
    kg: number
    lb: number
  }[]
  flickr_images: string[]
}

export interface LaunchesData {
  launches: Launch[]
}

export interface LaunchData {
  launch: Launch
}

export interface RocketsData {
  rockets: Rocket[]
}