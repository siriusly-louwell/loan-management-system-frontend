import { useSelector } from "react-redux";
import { UnitEntities } from "../services/entities/Unit";
import CardSkeleton from "./loading components/CardSkeleton";
import ProductCard from "./cards/ProductCard";
import EmptySearch from "./empty states/EmptySearch";

export default function UnitRecommendation() {
  const units = useSelector(UnitEntities);
  const { unitsLoading } = useSelector((state) => state.unit);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 px-3 py-1 mx-5 mt-3 rounded-lg">
      <h2 className="mt-5 pl-5 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
        {units.length > 0 ? "Recommendations based on the applicant's eligibility results" : "No Recommendations"}
      </h2>
      {!unitsLoading && units.length > 0 && (
        <section className="my-4 px-5 mx-3 bg-green-300 rounded-md text-lg py-2">
          {" "}
          {units.length > 0
            ? "Based on your submitted documents, this is the motorcycle you are eligible to apply for"
            : "No Recommendations"}
        </section>
      )}

      <section className="my-4 px-5 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-4 xl:grid-cols-4">
        {unitsLoading ? (
          <CardSkeleton />
        ) : (
          units.map((motor) => <ProductCard key={motor.id} unit={motor} />)
        )}
      </section>
      {!unitsLoading && units.length === 0 && (
        <EmptySearch
          label="No affordable units"
          context="Applicant is not eligible to take any loan"
        />
      )}
    </div>
  );
}
