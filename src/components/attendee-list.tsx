import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import IconButton from "./icon-button";

export default function AttendeeList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="gap-3 px-3 py-1.5 border border-white/10  rounded-lg w-72 flex items-center">
          <Search size={16} className="text-emerald-300" />
          <input
            type="text"
            placeholder="Buscar participante"
            className="bg-transparent flex-1 outline-none  border-0 p-0 text-sm"
          />
        </div>
      </div>
      <div className="border border-white/10 rounded-lg">
        <table className="w-full ">
          <thead>
            <tr className="border-b border-white/10 ">
              <th className="py-3 px-4 font-semibold text-sm text-left">
                <input
                  type="checkbox"
                  className="size-4 bg-black/20 rounded border-white/10 "
                />
              </th>
              <th className="py-3 px-4 font-semibold text-sm text-left">
                codigo
              </th>
              <th className="py-3 px-4 font-semibold text-sm text-left">
                participante
              </th>
              <th className="py-3 px-4 font-semibold text-sm text-left">
                Data de inscricao
              </th>
              <th className="py-3 px-4 font-semibold text-sm text-left">
                Data do check-in
              </th>
              <th
                style={{ width: 48 }}
                className="py-3 px-4 font-semibold text-sm text-left"
              ></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr className="border-b border-white/10 hover:bg-white/10">
                <td key={i} className="py-3 px-4  text-sm text-zinc-300">
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border-white/10 accent-orange-400"
                  />
                </td>
                <td className="py-3 px-4 text-sm text-zinc-300">304923</td>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-sm text-white">
                    Guilherme Pola
                  </span>
                  <span className="font-semibold text-sm text-white">
                    guilhermepola663@gmail.com
                  </span>
                </div>
                <td className="py-3 px-4  text-sm text-zinc-300">
                  7 dias atras
                </td>
                <td className="py-3 px-4  text-sm text-zinc-300">
                  3 dias atras
                </td>
                <td className="py-3 px-4  text-sm text-zinc-300">
                  <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="py-3 px-4  text-sm text-zinc-300" colSpan={3}>
                Mostrando 10 de 228 itens
              </td>
              <td
                className="py-3 px-4 text-right  text-sm text-zinc-300"
                colSpan={3}
              >
                <div className=" gap-8 items-center inline-flex">
                  <span> Pagina 1 de 23</span>
                  <div className="flex gap-1.5">
                    <IconButton>
                      <ChevronsLeft className="size-4" />
                    </IconButton>
                    <IconButton>
                      <ChevronLeft className="size-4" />
                    </IconButton>
                    <IconButton>
                      <ChevronRight className="size-4" />
                    </IconButton>
                    <IconButton>
                      <ChevronsRight className="size-4" />
                    </IconButton>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
