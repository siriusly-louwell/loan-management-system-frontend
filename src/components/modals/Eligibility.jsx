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
import { CheckCircle2, ClipboardCheck, FileSearch } from "lucide-react";
import { UserEntity } from "../../services/entities/User";
import CategoryCard from "../cards/CategoryCard";
import DataRow from "../tables/DataRow";

export default function Eligibility() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelector(UserEntity);
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

  return (
    modals.eligibility && (
      <div className="fixed inset-0 flex justify-center items-center overflow-y-auto bg-gray-900/50 dark:bg-gray-900/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
        <PopAnimate>
          <div className="w-full max-w-5xl mt-20 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-xl">
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

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          classname="inline-flex items-center gap-2 px-4 py-2 font-medium text-blue-700 bg-blue-50 border border-blue-300 rounded-lg hover:bg-blue-100 hover:border-blue-400 dark:bg-blue-600/30 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors duration-200"
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
                        <span className="text-gray-600 dark:text-gray-300">
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
                      classname="inline-flex items-center gap-2 px-4 py-2 font-medium text-white bg-rose-600 border border-rose-600 rounded-lg hover:bg-rose-500 dark:bg-rose-600 dark:border-rose-500 dark:hover:bg-rose-700 transition-colors duration-200"
                      icon={<FileSearch size={18} className="text-white" />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopAnimate>
      </div>
    )
  );
}
