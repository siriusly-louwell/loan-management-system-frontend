import { useState } from "react";
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
import { CheckCircle2, ClipboardCheck } from "lucide-react";
import { UserEntity } from "../../services/entities/User";
import CategoryCard from "../cards/CategoryCard";
import DataRow from "../tables/DataRow";
import AppliedFormMini from "../AppliedFormMini";
import { fetchCredits } from "../../services/redux/slices/creditSlice";
import CreditHistorySkeleton from "../loading components/CreditHistorySkeleton";
import EmptySearch from "../empty states/EmptySearch";
import CreditsRow from "../tables/CreditsRow";

export default function Eligibility() {
  const dispatch = useDispatch();
  const { role } = useSelector(UserEntity);
  const loan = useSelector(LoanEntity);
  const { credits, creditsLoading } = useSelector((state) => state.credit);
  const [isVisible, setIsVisible] = useState(false);
  const { stability, loanDecision, loanResult } = useSelector(
    (state) => state.application
  );
  const { modals } = useSelector((state) => state.ui);

  useEffect(() => {
    if (loan.id) {
      if (loan.user_id)
        dispatch(fetchCredits({ mode: "page", customer: loan.user_id }));
      dispatch(
        calculateStability({ dti: loan.dti, ndi: loan.ndi, emi: loan.emi })
      );
      dispatch(assessDecision());
      dispatch(assessResult());
    }
  }, [modals.eligibility, loan.id]);

  const fullName = (first, last) => {
    return first ? `${first} ${last}` : "";
  };

  function decideAction() {
    dispatch(toggleModal({ name: "eligibility", value: modals.eligibility }));

    if (loanDecision === "passed" || loanDecision === "eligible")
      dispatch(toggleModal({ name: "addCI", value: modals.addCI }));
    else dispatch(toggleModal({ name: "declineApp", value: modals.decideApp }));
  }

  return (
    <PopAnimate
      modalName={modals.eligibility}
      classStyle="w-full max-w-5xl mt-4 max-h-[90vh] overflow-y-auto bg-gray-50 dark:bg-gray-800 border border-gray-500 rounded-xl shadow-xl">
      <div className="sticky top-0 z-20 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
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

      {modals.eligibility && (
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
              title="Existing Loans/Debts (based on Credit History)"
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

          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Credit History
          </h2>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 mb-5">
            {creditsLoading ? (
              <CreditHistorySkeleton num={5} />
            ) : credits.length === 0 ? (
              <EmptySearch
                label="No such data has been found"
                context="It's quite empty in here"
              />
            ) : (
              credits.map((credit, i) => (
                <CreditsRow
                  key={i}
                  data={{
                    date: credit.due_date,
                    id: credit.application.record_id,
                    name: fullName(
                      credit.user?.first_name,
                      credit.user?.last_name
                    ),
                    amount: credit.amount,
                    status: credit.status,
                    paid_date: credit.paid_date,
                  }}
                />
              ))
            )}
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Final Assessment
            </h3>
            <LargeBadge
              type={loanDecision}
              loadId={loan.id}
              role={role}
              onViewDetails={() => {
                setIsVisible(!isVisible);
              }}
            />
            <div
              className={`transition-all duration-300 ${
                isVisible
                  ? "opacity-100 max-h-[1000px]"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}>
              <AppliedFormMini />
            </div>
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
                      text="Manual Reviews"
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
                {/* <CustomBttn
                  text="View Details"
                  onclick={() =>
                    navigate(`/${role}/application`, {
                      state: { id: loan.id },
                    })
                  }
                  classname="inline-flex items-center gap-2 px-4 py-2 font-medium text-white bg-rose-600 border border-rose-600 rounded-lg hover:bg-rose-500 dark:bg-rose-600 dark:border-rose-500 dark:hover:bg-rose-700 transition-colors duration-200"
                  icon={<FileSearch size={18} className="text-white" />}
                /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </PopAnimate>
  );
}
