'use client';

import { useMemo, useState } from "react";
import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import dayjs from 'dayjs'

import { LocatedVehicle } from "@/models/located-vehicle"

import { env } from "@/env";

interface TableProps {
    vehicles: LocatedVehicle[]
}
export default function MapVehicles({ vehicles }: TableProps) {
    const [selectedVehicle, setSelectedVehicle] = useState<LocatedVehicle | null>(null);
    
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    })

    const center = useMemo(() => {
        if (!vehicles.length) {
          return { lat: -23.6239854, lng: -46.6986186 }; // fallback
        }
        const latSum = vehicles.reduce((sum, v) => sum + v.lat, 0);
        const lngSum = vehicles.reduce((sum, v) => sum + v.lng, 0);
        return {
          lat: latSum / vehicles.length,
          lng: lngSum / vehicles.length,
        };
    }, [vehicles]);

    return (
        <section className="bg-[#031621] p-4 rounded-lg h-[400px] sm:h-[500px]">
          <h2 className="mb-4 text-base sm:text-lg font-medium">Mapa rastreador</h2>
          {
            !isLoaded ? (
              <h1 className="text-white text-center">Carregando mapa...</h1>
            ) : (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "90%" }}
                center={{ lat: -14.2350, lng: -51.9253 }}
                zoom={4}
              >
                {vehicles.map((v, index) => (
                  <Marker
                    key={v.id + index}
                    position={{ lat: v.lat, lng: v.lng }}
                    icon={{
                      url: "https://maps.google.com/mapfiles/kml/shapes/cabs.png",
                      scaledSize: new window.google.maps.Size(32, 32),
                    }}
                    onClick={() => setSelectedVehicle(v)}
                  />
                ))}
      
                {selectedVehicle && (
                  <InfoWindow
                    position={{ lat: selectedVehicle.lat, lng: selectedVehicle.lng }}
                    onCloseClick={() => setSelectedVehicle(null)}
                  >
                    <div className="bg-[#001722] rounded-md shadow-lg px-2 sm:px-4 py-2 text-white text-xs sm:text-sm text-center min-w-[160px]">
                      <p><strong>Placa {selectedVehicle.plate}</strong></p>
                      <p><strong>Frota {selectedVehicle.fleet}</strong></p>
                      <p><strong>{dayjs(selectedVehicle.createdAt).format('DD/MM/YYYY - HH:mm')}</strong></p>
                      <p>
                        <strong>
                          <a
                            href={`https://www.google.com/maps?q=${selectedVehicle.lat},${selectedVehicle.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline break-words"
                          >
                            {selectedVehicle.lat.toFixed(6) + '\u00A0\u00A0' + selectedVehicle.lng.toFixed(6)}
                          </a>
                        </strong>
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            )
          }
        </section>
    );
}