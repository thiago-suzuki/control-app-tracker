'use client'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react';

import Header from "@/components/header";
import MapVehicles from "@/components/map-vehicles";
import TableVehicles from "@/components/table-vehicles";

import { getVehicles, GetVehiclesResponse } from '@/http/get-vehicles';

import { Vehicle } from '@/models/vehicle';
import { LocatedVehicle } from '@/models/located-vehicle';

export default function Home() {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('')
  const [type, setType] = useState<'tracked' | 'others'>('tracked')
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([])
  const [allVehiclesLocated, setAllVehiclesLocated] = useState<LocatedVehicle[]>([])

  const tableRef = useRef<HTMLDivElement>(null)

  const {
    data: vehiclesData,
    refetch: refetchData,
    isRefetching: isRefetching
  } = useQuery<GetVehiclesResponse>({
    queryKey: ["vehicles-filters", page, filter, type],
    queryFn: fetchVehicles,
    refetchInterval: 120000
  });

  async function fetchVehicles() {
    return await getVehicles({ payload: {
      filter: filter || null,
      type: type,
      page: page,
      perPage: 10
    }})
  }

  // Acumula os resultados conforme a paginação
  useEffect(() => {
    if (vehiclesData?.content?.vehicles) {
      setAllVehicles(prev =>
        page === 1 ? vehiclesData.content.vehicles : [...prev, ...vehiclesData.content.vehicles]
      )
    }
  }, [vehiclesData, page])
  useEffect(() => {
    if (vehiclesData?.content?.locationVehicles) {
      setAllVehiclesLocated(prev =>
        page === 1 ? vehiclesData.content.locationVehicles : [...prev, ...vehiclesData.content.locationVehicles]
      )
    }
  }, [vehiclesData, page])

  // Reseta a lista ao mudar o filtro ou tipo
  useEffect(() => {
    setPage(1)
    setAllVehiclesLocated([])
    refetchData()
  }, [filter, type])

  // Reseta a página 
  useEffect(() => {
    setPage(1)
    setAllVehicles(vehiclesData?.content?.vehicles || [])
    setAllVehiclesLocated(vehiclesData?.content?.locationVehicles || [])
  }, [isRefetching === true]);

  // Scroll infinito na div da tabela
  const handleScroll = useCallback(() => {
    if (!tableRef.current || isRefetching || !vehiclesData?.content) return
  
    const { scrollTop, scrollHeight, clientHeight } = tableRef.current
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10
    const totalPages = vehiclesData.content.totalPages
  
    if (isBottom && vehiclesData.content.vehicles.length === 10 && page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }, [isRefetching, vehiclesData, page])

  useEffect(() => {
    const tableDiv = tableRef.current
    if (!tableDiv) return

    tableDiv.addEventListener('scroll', handleScroll)
    return () => tableDiv.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0d1a26] text-white p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-16">
            <span className="text-white font-medium">Lista</span>
            <label className="inline-flex items-center space-x-2">
              <input type="radio" name="status" checked={type === 'tracked'} onChange={() => setType('tracked')} className="form-radio text-[#3597E0]" />
              <span>Rastreados</span>
            </label>
            <label className="inline-flex items-center space-x-2">
              <input type="radio" name="status" checked={type === 'others'} onChange={() => setType('others')} className="form-radio text-[#3597E0]" />
              <span>Outros</span>
            </label>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar por placa ou frota"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
            <button className="w-32 bg-[#3698E0] px-4 py-2 rounded-md text-white font-semibold hover:bg-blue-600">
              Novo
            </button>
          </div>
        </div>

        <MapVehicles vehicles={allVehiclesLocated} />

        <div
          ref={tableRef}
          className="max-h-[400px] overflow-y-auto border border-gray-600 rounded-md"
        >
          <TableVehicles vehicles={allVehicles} />
          {isRefetching && (
            <div className="text-center py-2 text-sm text-gray-400">Carregando mais...</div>
          )}
        </div>
      </main>
    </>
  );
}
