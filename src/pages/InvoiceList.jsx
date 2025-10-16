import InvoiceTable from "../components/tables/InvoiceTable";

export default function InvoiceList({
  headText,
  path,
  bttnText = "View Details",
}) {
  return (
    <section className="bg-gray-200 py-8 w-full antialiased dark:bg-gray-800 md:py-10">
      <InvoiceTable headText={headText} path={path} bttnText={bttnText} />
    </section>
  );
}
