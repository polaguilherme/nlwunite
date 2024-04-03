import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import IconButton from "./icon-button";
import Table from "./table/table";
import TableHeader from "./table/table-header";
import TableCell from "./table/table-cell";
import TableRow from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface Attendee {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

export default function AttendeeList() {
  const [searchInput, setSearchInput] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }

    return "";
  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / 10);

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
    );

    url.searchParams.set("pageIndex", String(page - 1));
    if (searchInput.length > 0) {
      url.searchParams.set("query", searchInput);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAttendees(data.attendees);
        setTotal(data.total);
      });
  }, [page, searchInput]);

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", search);

    window.history.pushState({}, "", url);

    setSearchInput(search);
  }

  function onSearchInputChanged(e: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(e.target.value);
    setCurrentPage(1);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);

    setPage(page);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="gap-3 px-3 py-1.5 border border-white/10  rounded-lg w-72 flex items-center">
          <Search size={16} className="text-emerald-300" />
          <input
            type="text"
            placeholder="Buscar participante"
            className="bg-transparent flex-1 outline-none  border-0 p-0 text-sm focus:ring-0"
            value={searchInput}
            onChange={onSearchInputChanged}
          />
        </div>
      </div>
      <Table>
        <thead>
          <TableRow className="border-b border-white/10 ">
            <TableHeader>
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border-white/10 "
              />
            </TableHeader>
            <TableHeader>codigo</TableHeader>
            <TableHeader>participante</TableHeader>
            <TableHeader>Data de inscricao</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 48 }}></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {attendees.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-3 px-4 text-center text-sm text-zinc-300"
              >
                Nenhum participante encontrado :(
              </TableCell>
            </TableRow>
          ) : (
            attendees.map((attendee) => (
              <TableRow className="border-b border-white/10 hover:bg-white/10">
                <TableCell key={attendee.id}>
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border-white/10 accent-orange-400"
                  />
                </TableCell>
                <TableCell>{attendee.id}</TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-sm text-white">
                    {attendee.name}
                  </span>
                  <span className="font-semibold text-sm text-zinc-500">
                    {attendee.email}
                  </span>
                </div>
                <TableCell className="py-3 px-4  text-sm text-zinc-300">
                  {dayjs().to(attendee.createdAt)}
                </TableCell>
                <TableCell className="py-3 px-4  text-sm text-zinc-300">
                  {attendee.checkedInAt === null ? (
                    <span className="text-zinc-500">Nao fez check-in</span>
                  ) : (
                    dayjs().to(attendee.checkedInAt)
                  )}
                </TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </tbody>

        <tfoot>
          <TableRow>
            <TableCell className="py-3 px-4  text-sm text-zinc-300" colSpan={3}>
              Mostrando {attendees.length} de {total} itens
            </TableCell>
            <TableCell
              className="py-3 px-4 text-right  text-sm text-zinc-300"
              colSpan={3}
            >
              <div className=" gap-8 items-center inline-flex">
                <span>
                  {" "}
                  Pagina {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  );
}
