import { useSelector } from "react-redux";
import CustomerLoansTable from "../components/tables/CustomerLoansTable";
import InvoiceTable from "../components/tables/InvoiceTable";
import { ApplicationEntity } from "../services/entities/Application";
import StatusLegend from "../components/modals/StatusLegend";

export default function InvoiceList({
  headText,
  path,
  type = "all",
  bttnText = "View Details",
}) {
  const { user_id } = useSelector(ApplicationEntity);

  return (
    <section className="bg-gray-200 py-8 w-full antialiased dark:bg-gray-800 md:py-10">
      {type === "all" ? (
        <InvoiceTable headText={headText} path={path} bttnText={bttnText} />
      ) : (
        <CustomerLoansTable
          id={user_id}
          path={path}
          headText={headText}
          bttnText={bttnText}
        />
      )}
      <StatusLegend />
    </section>
  );
}
