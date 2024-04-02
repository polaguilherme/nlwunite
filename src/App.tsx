import Header from "./components/header";
import AttendeeList from "./components/attendee-list";

export default function App() {
  return (
    <>
      <main className="max-w-[1216px] m-auto py-5 flex flex-col gap-5">
        <Header />
        <AttendeeList />
      </main>
    </>
  );
}
