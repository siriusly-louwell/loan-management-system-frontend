import { useNavigate } from "react-router-dom";
import CloseBttn from "../buttons/CloseBttn";
import ColorLabel from "../ColorLabel";
import CustomBttn from "../buttons/CustomBttn";
import LargeBadge from "../badges/LargeBadge";
import CustomBadge from "../badges/CustomBadge";
import PopAnimate from "../animations/popAnimate";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../services/redux/slices/uiSlice";
import { LoanEntity } from "../../services/entities/Loan";
import { useEffect } from "react";
import {
  assessDecision,
  assessResult,
  calculateStability,
} from "../../services/redux/slices/applicationSlice";
import Dialog from "./Dialog";
import { CheckCircle2, ClipboardCheck, FileSearch } from "lucide-react";

export default function Eligibility({ url }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth.user);
  const loan = useSelector(LoanEntity);
  const { stability, loanDecision, loanResult } = useSelector(
    (state) => state.application
  );
  const { modals } = useSelector((state) => state.ui);

  useEffect(() => {
    if (loan.id) {
      dispatch(
        calculateStability({ dti: loan.dti, ndi: loan.ndi, emi: loan.emi })
      );
      dispatch(assessDecision());
      dispatch(assessResult());
    }
  }, [modals.eligibility]);

  function decideAction() {
    dispatch(toggleModal({ name: "eligibility", value: modals.eligibility }));

    if (loanDecision === "passed" || loanDecision === "eligible")
      dispatch(toggleModal({ name: "addCI", value: modals.addCI }));
    else dispatch(toggleModal({ name: "declineApp", value: modals.decideApp }));
  }

  function staffAction(string) {
    dispatch(toggleModal({ name: "eligibility", value: modals.eligibility }));
    dispatch(
      toggleModal({ name: "decideAppModal", value: modals.decideAppModal })
    );
    dispatch(toggleModal({ name: string, value: modals[string] }));
  }

  const CategoryCard = ({ title, status, children, result }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-500">
      <div className="flex items-center gap-3 mb-4">
        <ColorLabel style={status || ""} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="space-y-4">
        {children}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Result
          </h4>
          <div
            className={`p-4 rounded-md bg-${status}-50 dark:bg-${status}-600/20`}>
            <h5
              className={`font-semibold text-${status}-700 dark:text-${status}-400 mb-1`}>
              {result.label}
            </h5>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {result.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {result.suggestion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const DataRow = ({ label, value, highlight }) => (
    <div className="flex justify-between py-2">
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <span
        className={
          highlight
            ? "text-rose-600 dark:text-rose-500 font-bold"
            : "text-gray-900 dark:text-white font-semibold"
        }>
        {value}
      </span>
    </div>
  );

  return (
    modals.eligibility && (
      <div className="fixed inset-0 flex justify-center items-center overflow-y-auto bg-gray-900/50 dark:bg-gray-900/80 z-40 flex items-center justify-center p-4">
        <PopAnimate>
          <div className="w-full max-w-5xl mt-20 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-xl">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Loan Eligibility Assessment
              </h2>
              <CloseBttn
                trigger={() =>
                  dispatch(
                    toggleModal({
                      name: "eligibility",
                      value: modals.eligibility,
                    })
                  )
                }
              />
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Employment Stability Card */}
                <CategoryCard
                  title="Employment Stability"
                  status={stability.employment}
                  result={loanResult.employment}>
                  <DataRow label="Monthly Income" value={loan.getRate} />
                  <DataRow
                    label="Years in Service"
                    value={`${loan.yrs_in_service || 0} years`}
                  />
                  <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-500">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-100">
                      Required: Income ≥ ₱15,000 and ≥ 1 year in service
                    </span>
                  </div>
                </CategoryCard>

                {/* Debt Assessment Card */}
                <CategoryCard
                  title="Debt Assessment"
                  status={stability.debt}
                  result={loanResult.debt}>
                  <DataRow label="Monthly Rent" value={loan.getRent} />
                  <DataRow label="Amortization" value={loan.getAmortization} />
                  <DataRow
                    label="Total EMI"
                    value={`₱${loan.emi.toLocaleString()}`}
                  />
                  <DataRow
                    label="DTI Ratio"
                    value={`${loan.dti.toFixed(2)}%`}
                    highlight={true}
                  />
                </CategoryCard>

                {/* NDI Analysis Card */}
                <CategoryCard
                  title="Net Disposable Income"
                  status={stability.ndi}
                  result={loanResult.ndi}>
                  <DataRow label="Net Income" value={loan.getRate} />
                  <DataRow
                    label="NDI"
                    value={`₱${loan.ndi.toLocaleString()}`}
                    highlight={true}
                  />
                  <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-500">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-100">
                      EMI must be ≤ 30% of NDI
                    </span>
                  </div>
                </CategoryCard>
              </div>

              {/* Final Assessment */}
              <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Final Assessment
                </h3>
                <LargeBadge type={loanDecision} />
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1">
                      <ColorLabel size={3} style="green" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Passed
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ColorLabel size={3} style="yellow" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Review
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ColorLabel size={3} style="red" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Failed
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {role === "staff" ? (
                      <>
                        <CustomBttn
                          text="Accept System Verdict"
                          onclick={decideAction}
                          classname="inline-flex items-center gap-2 px-4 py-2 font-medium text-blue-700 bg-blue-50 border border-blue-300 rounded-lg hover:bg-blue-100 hover:border-blue-400 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors duration-200"
                          icon={
                            <CheckCircle2
                              size={18}
                              className="text-blue-500 dark:text-blue-400"
                            />
                          }
                        />
                        <CustomBttn
                          text="Manual Review"
                          onclick={() =>
                            dispatch(
                              toggleModal({
                                name: "decideAppModal",
                                value: modals.decideAppModal,
                              })
                            )
                          }
                          classname="inline-flex items-center gap-2 px-4 py-2 font-medium text-yellow-700 bg-yellow-50 border border-yellow-300 rounded-lg hover:bg-yellow-100 hover:border-yellow-400 dark:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-900/50 transition-colors duration-200"
                          icon={
                            <ClipboardCheck
                              size={18}
                              className="text-yellow-500 dark:text-yellow-400"
                            />
                          }
                        />
                      </>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600 dark:text-gray-400">
                          Staff Decision:
                        </span>
                        <CustomBadge
                          text={loan.statusBadge.label}
                          color={loan.statusBadge.color}
                        />
                      </div>
                    )}
                    <CustomBttn
                      text="View Details"
                      onclick={() =>
                        navigate(`/${role}/application`, {
                          state: { id: loan.id },
                        })
                      }
                      classname="inline-flex items-center gap-2 px-4 py-2 font-medium text-white bg-rose-500 border border-rose-600 rounded-lg hover:bg-rose-600 dark:bg-rose-600 dark:border-rose-500 dark:hover:bg-rose-700 transition-colors duration-200"
                      icon={<FileSearch size={18} className="text-white" />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopAnimate>

        <Dialog text="Choose Decision" modalName="decideAppModal">
          <section className="flex space-x-4 items-center justify-center">
            <CustomBttn
              text="Accept Application"
              onclick={() => staffAction("addCI")}
              classname="flex items-center w-full whitespace-nowrap justify-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:border-blue-500 dark:text-blue-200 dark:hover:text-white dark:hover:bg-blue-800 dark:focus:ring-blue-900"
            />
            <CustomBttn
              text="Deny Application"
              onclick={() => staffAction("declineApp")}
              classname="flex items-center w-full justify-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-red-600 dark:border-red-500 dark:text-red-200 dark:hover:text-white dark:hover:bg-red-800 dark:focus:ring-red-900"
            />
          </section>
        </Dialog>
      </div>
    )
  );

  // return (
  //   modals.eligibility && (
  //     <div className="overflow-y-auto overflow-x-hidden fixed bg-gray-400 dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-70 top-0 right-0 left-0 z-50 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
  //       <PopAnimate>
  //         <div className="relative w-full max-w-6xl h-full md:h-auto">
  //           <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-5 sm:py-8 border border-gray-400">
  //             <div className="flex justify-between items-center pb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
  //               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
  //                 Eligibility Results
  //               </h3>
  //               <CloseBttn
  //                 trigger={() =>
  //                   dispatch(
  //                     toggleModal({
  //                       name: "eligibility",
  //                       value: modals.eligibility,
  //                     })
  //                   )
  //                 }
  //               />
  //             </div>
  //             <section>
  //               <table className="w-full">
  //                 <thead className="border-b border-gray-400">
  //                   <tr>
  //                     <th className="py-2 dark:text-white">Category</th>
  //                     <th className="py-2 dark:text-white">Data</th>
  //                     <th className="py-2 dark:text-white">Threshold</th>
  //                     <th className="py-2 dark:text-white">Results</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   <tr className="border-b border-gray-400">
  //                     <td className="py-4 flex space-x-3 items-center mr-3">
  //                       <ColorLabel style={stability.employment || ""} />
  //                       <h3 className="text-md font-semibold text-gray-900 dark:text-white">
  //                         Employment Stability
  //                       </h3>
  //                     </td>
  //                     <td className="py-4">
  //                       <div className="grid grid-cols-2 gap-x-6">
  //                         <span className="text-sm text-gray-600 dark:text-gray-300">
  //                           Income Source:
  //                         </span>
  //                         <span className="font-semibold text-md text-gray-700 dark:text-white">
  //                           {loan.getIncome}
  //                         </span>
  //                         <span className="text-sm text-gray-600 dark:text-gray-300">
  //                           Years in service:
  //                         </span>
  //                         <span className="font-semibold text-md text-gray-700 dark:text-white">
  //                           {loan.yrs_in_service} years
  //                         </span>
  //                         <span className="text-sm text-gray-600 dark:text-gray-300">
  //                           Monthly Income:
  //                         </span>
  //                         <span className="font-semibold text-md text-rose-700 dark:text-rose-500">
  //                           {loan.getRent}
  //                         </span>
  //                       </div>
  //                     </td>
  //                     <td className="py-4 flex justify-center">
  //                       <div className="flex flex-col space-y-3 mr-4">
  //                         <span className="font-semibold text-rose-700 dark:text-rose-500 whitespace-nowrap">
  //                           Income &ge; ₱15,000.00
  //                         </span>
  //                         <span className="font-semibold text-rose-700 dark:text-rose-500 whitespace-nowrap">
  //                           &ge;1 year in job/business
  //                         </span>
  //                       </div>
  //                     </td>
  //                     <td className="">
  //                       <span
  //                         className={`font-bold text-${stability.employment}-600`}>
  //                         {loanResult.employment.description}
  //                       </span>
  //                     </td>
  //                   </tr>
  //                   <tr className="border-b border-gray-400">
  //                     <td className="py-4 flex space-x-3 items-center mr-3">
  //                       <ColorLabel style={stability.debt || ""} />
  //                       <h3 className="text-md font-semibold text-gray-900 dark:text-white">
  //                         Existing Debts and Loans
  //                       </h3>
  //                     </td>
  //                     <td className="py-4">
  //                       <div className="grid grid-cols-2 gap-x-6">
  //                         <span className="text-sm text-gray-600 whitespace-nowrap dark:text-gray-300">
  //                           Monthly Rent:
  //                         </span>
  //                         <span className="font-semibold text-md text-gray-700 dark:text-white">
  //                           {loan.getRent}
  //                         </span>
  //                         <span className="text-sm text-gray-600 whitespace-nowrap dark:text-gray-300">
  //                           Amortization:
  //                         </span>
  //                         <span className="font-semibold text-md text-gray-700 dark:text-white">
  //                           {loan.getAmortization}
  //                         </span>
  //                         <span className="text-sm text-gray-600 whitespace-nowrap dark:text-gray-300">
  //                           Total EMI:
  //                         </span>
  //                         <span className="font-semibold text-md text-gray-700 dark:text-white">
  //                           ₱{loan.emi.toLocaleString()}
  //                         </span>
  //                         <span className="text-md font-bold mt-2 text-gray-600 dark:text-white">
  //                           DTI Ratio:
  //                         </span>
  //                         <span className="text-rose-700 dark:text-rose-500 font-bold mt-2">
  //                           {loan.dti.toFixed(2)}%
  //                         </span>
  //                       </div>
  //                     </td>
  //                     <td className="py-4 flex justify-center">
  //                       <span className="font-semibold text-rose-700 dark:text-rose-500 whitespace-nowrap">
  //                         DTI &le; 35%
  //                       </span>
  //                     </td>
  //                     <td className="">
  //                       <span
  //                         className={`font-bold text-${stability.debt}-600`}>
  //                         {loanResult.debt.description}
  //                       </span>
  //                     </td>
  //                   </tr>
  //                   <tr className="border-b border-gray-400">
  //                     <td className="py-4 flex space-x-3 items-center mr-3">
  //                       <ColorLabel style={stability.ndi || ""} />
  //                       <h3 className="text-md font-semibold text-gray-900 dark:text-white">
  //                         Net Disposable Income
  //                       </h3>
  //                     </td>
  //                     <td className="py-4">
  //                       <div className="grid grid-cols-2 gap-x-6">
  //                         <span className="text-sm text-gray-600 whitespace-nowrap dark:text-gray-300">
  //                           Net Income:
  //                         </span>
  //                         <span className="font-semibold text-md text-gray-700 dark:text-white">
  //                           {loan.getRate}
  //                         </span>
  //                         <span className="text-md font-bold mt-2 text-gray-600 dark:text-white">
  //                           NDI:
  //                         </span>
  //                         <span className="text-rose-700 dark:text-rose-500 font-bold mt-2">
  //                           ₱{loan.ndi.toLocaleString()}
  //                         </span>
  //                       </div>
  //                     </td>
  //                     <td className="py-4 justify-items-center flex justify-center">
  //                       <span className="font-semibold text-rose-700 dark:text-rose-500 whitespace-nowrap">
  //                         Total EMI &le; 30% of NDI
  //                       </span>
  //                     </td>
  //                     <td className="space-y-1">
  //                       <h3 className={`font-semibold text-${stability.ndi}-600`}>
  //                         {loanResult.ndi.label}
  //                       </h3>
  //                       <p className="text-gray-600">
  //                         {loanResult.ndi.description}
  //                       </p>
  //                       <p className="text-sm text-gray-500">
  //                         {loanResult.ndi.suggestion}
  //                       </p>
  //                       {/* <span className={`font-bold text-${stability.ndi}-600`}>
  //                         {loanResult.ndi.description}
  //                       </span> */}
  //                     </td>
  //                   </tr>
  //                 </tbody>
  //               </table>
  //               <div className="flex sm:space-x-4 mb-4">
  //                 <span className="flex items-center">
  //                   <ColorLabel size={3} style="green" />
  //                   <span className="text-sm text-gray-700 dark:text-gray-300">
  //                     Passed
  //                   </span>
  //                 </span>
  //                 <span className="flex items-center">
  //                   <ColorLabel size={3} style="yellow" />
  //                   <span className="text-sm text-gray-700 dark:text-gray-300">
  //                     Partial
  //                   </span>
  //                 </span>
  //                 <span className="flex items-center">
  //                   <ColorLabel size={3} style="red" />
  //                   <span className="text-sm text-gray-700 dark:text-gray-300">
  //                     Failed
  //                   </span>
  //                 </span>
  //               </div>
  //               <LargeBadge type={loanDecision} />
  //               <div
  //                 className={`grid grid-cols-${
  //                   role === "staff" ? "3" : "2"
  //                 } gap-3`}>
  //                 {role === "staff" ? (
  //                   <>
  //                     <CustomBttn
  //                       text="Accept System Verdict"
  //                       onclick={decideAction}
  //                       classname="flex items-center w-full justify-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:border-blue-500 dark:text-blue-200 dark:hover:text-white dark:hover:bg-blue-800 dark:focus:ring-blue-900"
  //                     />
  //                     <CustomBttn
  //                       text="Decide Verdict"
  //                       onclick={() =>
  //                         dispatch(
  //                           toggleModal({
  //                             name: "decideAppModal",
  //                             value: modals?.decideAppModal,
  //                           })
  //                         )
  //                       }
  //                       classname="flex items-center w-full justify-center text-yellow-600 hover:text-white border border-yellow-600 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-yellow-600 dark:border-yellow-500 dark:text-yellow-200 dark:hover:text-white dark:hover:bg-yellow-800 dark:focus:ring-yellow-900"
  //                     />
  //                   </>
  //                 ) : (
  //                   <div className="flex space-x-5 items-center">
  //                     <h3 className="text-md font-semibold text-gray-900 dark:text-white">
  //                       Staff Verdict:
  //                     </h3>
  //                     <CustomBadge
  //                       text={loan.statusBadge.label}
  //                       color={loan.statusBadge.color}
  //                     />
  //                   </div>
  //                 )}
  //                 <CustomBttn
  //                   text="Review"
  //                   onclick={() =>
  //                     navigate(`/${role}/application`, {
  //                       state: { id: loan.id },
  //                     })
  //                   }
  //                   classname="inline-flex justify-center w-full sm:w-auto items-center text-white bg-rose-600 hover:text-white border border-rose-700 hover:bg-rose-700 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-rose-500 dark:text-white dark:hover:bg-rose-700 dark:focus:ring-rose-600"
  //                 />
  //               </div>
  //             </section>
  //           </div>
  //         </div>
  //       </PopAnimate>

  //       <Dialog text="Choose Decision" modalName="decideAppModal">
  //         <section className="flex space-x-4 items-center justify-center">
  //           <CustomBttn
  //             text="Accept Application"
  //             onclick={() => staffAction("addCI")}
  //             classname="flex items-center w-full whitespace-nowrap justify-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:border-blue-500 dark:text-blue-200 dark:hover:text-white dark:hover:bg-blue-800 dark:focus:ring-blue-900"
  //           />
  //           <CustomBttn
  //             text="Deny Application"
  //             onclick={() => staffAction("declineApp")}
  //             classname="flex items-center w-full justify-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-red-600 dark:border-red-500 dark:text-red-200 dark:hover:text-white dark:hover:bg-red-800 dark:focus:ring-red-900"
  //           />
  //         </section>
  //       </Dialog>
  //     </div>
  //   )
  // );
}
