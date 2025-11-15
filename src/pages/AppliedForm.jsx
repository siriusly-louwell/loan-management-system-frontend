import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApplicationInfoCard from "../components/cards/ApplicationInfoCard";
import { FORM_LABELS } from "../constants/formFields";
import { ApplicationEntity } from "../services/entities/Application";
import { EmploymentEntity } from "../services/entities/EmploymentInfo";
import { FamilyEntity } from "../services/entities/FamilyInfo";
import ProfileHeader from "../components/cards/ProfileHeader";
import LeafletMap from "../components/maps/LeafletMap";
import FileButton from "../components/buttons/FileButton";
import DeclineApplicant from "../components/DeclineApplicant";
import AssignCI from "../components/AssignCI";
import CustomBttn from "../components/buttons/CustomBttn";
import { ArrowRight, CheckCircle2, ClipboardCheck } from "lucide-react";
import { UserEntity } from "../services/entities/User";
import { toggleModal } from "../services/redux/slices/uiSlice";
import Dialog from "../components/modals/Dialog";
import { Link } from "react-router-dom";
import {
  fetchLoan,
  getLoanId,
} from "../services/redux/slices/applicationSlice";

export default function AppliedForm() {
  const dispatch = useDispatch();
  const { role } = useSelector(UserEntity);
  const { modals } = useSelector((state) => state.ui);
  const application = useSelector(ApplicationEntity);
  const employmentInfo = useSelector(EmploymentEntity);
  const familyInfo = useSelector(FamilyEntity);
  const { loanID, loanLoading, loanDecision } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    dispatch(getLoanId());
  }, []);

  useEffect(() => {
    if (loanID) dispatch(fetchLoan({ id: loanID, by: "id" }));
  }, [loanID, dispatch]);

  function decideAction() {
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

  return (
    <>
      <div className="w-full bg-gray-100 dark:bg-gray-900">
        <section className="max-w-3xl mx-auto p-4">
          <ProfileHeader
            name={application.fullName}
            gender={application.getGender}
            status={application.getStatus}
            email={application.email}
            contact={application.contact_num}
            img={application.imgURL}
            loading={loanLoading}
            address={application.address?.personal_pres}>
            {loanLoading ? (
              <div className="flex space-x-3">
                <div className="w-16 h-5 rounded-md bg-gray-100 dark:bg-gray-600 animate-pulse" />
                <div className="w-16 h-5 rounded-md bg-gray-100 dark:bg-gray-600 animate-pulse" />
                <div className="w-16 h-5 rounded-md bg-gray-100 dark:bg-gray-600 animate-pulse" />
              </div>
            ) : (
              <section className="flex justify-between">
                <div>
                  <FileButton name="Valid ID" link={application.validID} />
                  <FileButton name="ID Picture" link={application.imgURL} />
                  <FileButton
                    name="Proof of Residence"
                    link={application.residenceImg}
                  />
                </div>

                <Link
                  to={`/${role}/comaker`}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-100 hover:bg-rose-600 focus:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200 dark:text-gray-400 dark:hover:text-white dark:focus:text-rose-500 dark:hover:bg-gray-700">
                  <span className="truncate max-w-[200px]">Comaker Form</span>
                  <ArrowRight size={16} />
                </Link>
              </section>
            )}
          </ProfileHeader>

          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Application Information
          </h1>

          <ApplicationInfoCard title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {Object.entries(FORM_LABELS.personal_info).map(
                ([key, label], i) => (
                  <div key={i}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {label}
                    </div>
                    {loanLoading ? (
                      <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                    ) : (
                      <div className="font-medium text-gray-900 dark:text-white">
                        {application[key]}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            {["comm_standing", "home_description"].map((val, i) => (
              <div key={i} className="mb-8">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {FORM_LABELS.other[val]}
                </div>
                {loanLoading ? (
                  <div className="w-80 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                ) : (
                  <div className="font-medium text-gray-900 dark:text-white whitespace-pre-line">
                    {application[val]}
                  </div>
                )}
              </div>
            ))}

            {["personal_pres", "personal_prev"].map((val, i) => (
              <div key={i} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  {FORM_LABELS.address[val]}
                </h3>
                {loanLoading ? (
                  <div className="w-80 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {application.address[val] || ""}
                  </span>
                )}
              </div>
            ))}

            <LeafletMap
              display={true}
              coordinates={{
                lat: application.address.lat,
                lng: application.address.lng,
              }}
            />
          </ApplicationInfoCard>

          <ApplicationInfoCard title="Employment Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {Object.entries(FORM_LABELS.employment_info.A).map(
                ([key, label], i) => (
                  <div key={i}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {label}
                    </div>
                    {loanLoading ? (
                      <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                    ) : (
                      <div className="font-medium text-gray-900 dark:text-white">
                        {employmentInfo[key]}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Income
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(FORM_LABELS.employment_info.B).map(
                  ([key, label], i) => (
                    <div key={i}>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {label}
                      </div>
                      {loanLoading ? (
                        <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                      ) : (
                        <div className="font-medium text-gray-900 dark:text-white">
                          {employmentInfo[key]}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Expenses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(FORM_LABELS.employment_info.C).map(
                  ([key, label], i) => (
                    <div key={i}>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {label}
                      </div>
                      {loanLoading ? (
                        <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                      ) : (
                        <div className="font-medium text-gray-900 dark:text-white">
                          {employmentInfo[key]}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </ApplicationInfoCard>

          <ApplicationInfoCard title="Family Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {Object.entries(FORM_LABELS.family_info).map(
                ([key, label], i) => (
                  <div key={i}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {label}
                    </div>
                    {loanLoading ? (
                      <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                    ) : (
                      <div className="font-medium text-gray-900 dark:text-white">
                        {familyInfo[key]}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Father's Name
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["father_first", "father_middle", "father_last"].map(
                  (val, i) => (
                    <div key={i}>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {FORM_LABELS.other[val]}
                      </div>
                      {loanLoading ? (
                        <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                      ) : (
                        <div className="font-medium text-gray-900 dark:text-white">
                          {familyInfo[val]}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Mother's Name
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["mother_first", "mother_middle", "mother_last"].map(
                  (val, i) => (
                    <div key={i}>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {FORM_LABELS.other[val]}
                      </div>
                      {loanLoading ? (
                        <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                      ) : (
                        <div className="font-medium text-gray-900 dark:text-white">
                          {familyInfo[val]}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            {["parent_pres", "parent_prev", "spouse_pres", "spouse_prev"].map(
              (val, i) => (
                <div key={i} className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {FORM_LABELS.address[val]}
                  </h3>
                  {loanLoading ? (
                    <div className="w-80 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {application.address[val] || ""}
                    </span>
                  )}
                </div>
              )
            )}
            {role === "staff" && (
              <section className="space-x-3 border-t pt-5">
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
              </section>
            )}
          </ApplicationInfoCard>
        </section>
      </div>

      <AssignCI />
      <DeclineApplicant />
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
    </>
  );
}
