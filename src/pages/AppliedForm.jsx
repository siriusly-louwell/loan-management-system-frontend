import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Button from "../components/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../services/redux/slices/uiSlice";

export default function AppliedForm({ url }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const location = useLocation();
  const id = state?.id;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { pageRoute, pageNum } = useSelector((state) => state.ui);
  const routerPaths = useMemo(
    () => [
      `${url}/apply`,
      `${url}/apply/employinfo`,
      `${url}/apply/familyinfo`,
      `${url}/apply/requirements`,
    ],
    []
  );
  const [applicant, setApplicant] = useState({ view: true });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/application/${id}?by=id`)
      .then((response) => response.json())
      .then((data) => {
        setApplicant({ ...applicant, ...data });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    navigate(pageRoute);

    window.scrollTo(0, 0);
  }, [pageRoute, navigate]);

  const address = applicant.address;
  const disable = true;

  return (
    <div className="overflow-y-auto overflow-x-hidden sm:flex justify-center fixed bg-gray-400 p-4 dark:bg-gray-700 top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
      <div className="relative p-4 w-full max-w-5xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
          <div className="flex justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              APPLICATION FORM
            </h3>
          </div>
          <form>
            {address && <Outlet context={{ applicant, address, disable }} />}

            <div className="space-y-4 sm:flex sm:w-1/3 sm:space-y-0 sm:space-x-4">
              {pageNum > 0 && (
                <Button
                  text="Back"
                  bttnType="button"
                  onclick={() => dispatch(prevPage("admin"))}
                />
              )}
              {pageNum < routerPaths.length - 1 ? (
                <Button
                  text="Next"
                  bttnType="button"
                  onclick={() => dispatch(nextPage("admin"))}
                />
              ) : (
                <Button
                  text="Done"
                  bttnType="button"
                  onclick={() =>
                    navigate(`${url}/loan`, { state: { id: applicant.id } })
                  }
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
