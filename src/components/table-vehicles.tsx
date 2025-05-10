import { Vehicle } from "@/models/vehicle"

interface TableProps {
    vehicles: Vehicle[]
}

export default function TableVehicles({ vehicles }: TableProps) {
    return (
        <section className="overflow-auto" role="table">
            <table className="min-w-full border-spacing-y-2">
                <thead className="text-gray-300">
                    <tr className="bg-[#031621]">
                    <th className="py-2 px-4 text-center">Placa</th>
                    <th className="py-2 px-4 text-center">Frota</th>
                    <th className="py-2 px-4 text-center">Tipo</th>
                    <th className="py-2 px-4 text-center">Modelo</th>
                    <th className="py-2 px-4 text-center">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {vehicles.map((v, i) => (
                        <tr key={i} className="bg-[#031621] text-white rounded-lg">
                            <td className="py-2 px-4 text-center">
                                {v.plate}
                            </td>
                            <td className="py-2 px-4 text-center">
                                {v.fleet || 'N/I'}
                            </td>
                            <td className="py-2 px-4 text-center">
                                {v.type === 'vehicle' ? 'Motor' : 'Implemento'}
                            </td>
                            <td className="py-2 px-4 text-center">
                                {v.model}
                            </td>
                            <td className="py-2 px-4 text-center">
                                {v.status === 'active' ? 'Em viagem' : 'Em manutenção'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}