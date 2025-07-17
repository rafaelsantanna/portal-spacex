import { gql } from '@apollo/client'

export const GET_LAUNCHES = gql`
  query GetLaunches($limit: Int, $offset: Int) {
    launches(limit: $limit, offset: $offset) {
      id
      mission_name
      launch_date_utc
      launch_success
      details
      rocket {
        rocket_name
        rocket_type
      }
      links {
        mission_patch
        mission_patch_small
        article_link
        wikipedia
        video_link
        flickr_images
      }
      launch_site {
        site_name_long
      }
    }
  }
`

export const GET_LAUNCH_BY_ID = gql`
  query GetLaunchById($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      launch_date_utc
      launch_success
      details
      rocket {
        rocket_name
        rocket_type
      }
      links {
        mission_patch
        mission_patch_small
        article_link
        wikipedia
        video_link
        flickr_images
      }
      launch_site {
        site_name_long
      }
      payloads {
        payload_id
        payload_type
        payload_mass_kg
        orbit
      }
    }
  }
`

export const GET_ROCKETS = gql`
  query GetRockets {
    rockets {
      id
      rocket_name
      rocket_type
      description
      height {
        meters
        feet
      }
      diameter {
        meters
        feet
      }
      mass {
        kg
        lb
      }
      first_stage {
        reusable
        engines
        fuel_amount_tons
        burn_time_sec
      }
      second_stage {
        engines
        fuel_amount_tons
        burn_time_sec
      }
      engines {
        number
        type
        version
        layout
        engine_loss_max
        propellant_1
        propellant_2
        thrust_sea_level {
          kN
          lbf
        }
        thrust_vacuum {
          kN
          lbf
        }
      }
      landing_legs {
        number
        material
      }
      payload_weights {
        id
        name
        kg
        lb
      }
      flickr_images
    }
  }
`