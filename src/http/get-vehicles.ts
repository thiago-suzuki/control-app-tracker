import { api } from '@/http/api-client'
import { LocatedVehicle } from '@/models/located-vehicle'
import { Vehicle } from '@/models/vehicle'

export interface GetVehiclesResponse {
    content: {
        vehicles: Vehicle[]
        locationVehicles: LocatedVehicle[]
        totalPages: number
    }
}

export interface GetVehiclesQuery {
    payload: {
        filter: string | null
        type: string
        page: number
        perPage: number
    }
}

export async function getVehicles({ payload }: GetVehiclesQuery) {
  const response =
    await api.rota.get<GetVehiclesResponse>(
        '/vehicles/list-with-paginate',
        {
            params: payload
        }
    )

  return response.data
}
