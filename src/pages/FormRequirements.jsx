import { useOutletContext } from "react-router-dom";
import FileInput from "../components/inputs/FileInput";
import LeafletMap from "../components/maps/LeafletMap";
import { useSelector } from "react-redux";
import { UserEntity } from "../services/entities/User";
import FormCheck from "../components/checkboxes/FormCheck";
import copy_icon from "../assets/images/copy_icon.png";
import FileButton from "../components/buttons/FileButton";
import twoByTwo from '../assets/images/2x2.webp';
import proofOfResidency from '../assets/images/proofofresidency.webp';
import proofOfIncome from '../assets/images/proofofincome.webp';
import { BadgeInfo } from "lucide-react";

import UploadPhotoInfo from "./PageComponents/UploadPhotoInfoModal";
import AcceptedDocumentsModal from "../components/modals/AcceptedDocumentsModal";
import { useState } from "react";


export default function FormRequirements() {
  const { fileChange, toggleKeep } = useOutletContext();
  const { role } = useSelector(UserEntity);
  const { formData } = useSelector((state) => state.form);
  const coords =
    role === "customer"
      ? { lat: formData.address.lat, lng: formData.address.lng }
      : { lat: 7.3081, lng: 125.6842 };
  const [openInfo, setOpenInfo] = useState(false);
  const [docType, setdocType] = useState("");
  let documents = [];
  let samplePic = [];

  const titles = {
    valid_ids: "Valid ID",
    two_by_two: "2x2 Picture",
    proof_of_residence: "Proof of Residence",
    proof_of_income: "Proof of Income",
  };
  switch (docType) {
    case "valid_ids":
      documents = ["National Id", "Driver's License", "Passport", "Postal ID", "NBI or Police Clearance", "PRC ID", "TIN", "GSIS"];
      samplePic = [];
      break;
    case "two_by_two":
      documents = [twoByTwo];
      samplePic = [];
      break;
    case "proof_of_residence":
      documents = ["Lease Contract/Rental Agreement (if renting)", "Barangay Certificate"];
      samplePic = [proofOfResidency];
      break;
    case "proof_of_income":
      documents = ["COE", "Payslip", "Bank Statement","Financial Statements"];
      samplePic = [proofOfIncome]
      break;
    default:
      break;
  }

  return (
    <>
      <UploadPhotoInfo open={openInfo} onClose={() => setOpenInfo(false)} />

      <div className="flex items-center gap-2 pb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Other Requirements:
        </h3>
        <BadgeInfo className="text-white cursor-pointer" onClick={() => setOpenInfo(true)} />
      </div>
      {role === "customer" && (
        <div className="flex mb-8 items-center">
          <FormCheck
            label="Keep current files"
            type="checkbox"
            name="keep_files"
            id="keep-files"
            value={true}
            icon={copy_icon}
            change={() => toggleKeep("keep_files", "applicant")}
          />
          <FileButton name="ID Picture" link={formData.applicant.idPic} />
          <FileButton name="Valid ID" link={formData.applicant.validId} />
          <FileButton
            name="Proof of Residence"
            link={formData.applicant.residenceImg}
          />
          <FileButton
            name="Proof of Income"
            link={formData.applicant.incomeImg}
          />
        </div>
      )}
      <div className="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
        {!formData.applicant.keep_files && (
          <>
            <FileInput
              label="Valid ID"
              name="valid_id"
              type="img"
              accept=".jpg,.png,.pdf"
              change={fileChange}
              popUpClick={() => setdocType("valid_ids")}
              require={true}
            />
            <FileInput
              label="2x2 Picture"
              name="id_pic"
              type="img"
              accept=".jpg,.png,.pdf"
              change={fileChange}
              popUpClick={() => setdocType("two_by_two")}
              require={true}
            />
            <FileInput
              label="Proof of Residence"
              name="residence_proof"
              type="img"
              accept=".jpg,.png,.pdf"
              change={fileChange}
              popUpClick={() => setdocType("proof_of_residence")}
              require={true}
            />
            <FileInput
              label="Proof of Income"
              name="income_proof"
              type="img"
              accept=".jpg,.png,.pdf"
              change={fileChange}
              popUpClick={() => setdocType("proof_of_income")}
              require={true}
            />
          </>
        )}

        <div className="grid col-span-2 grid-cols-1">
          <label className="text-md font-medium text-gray-900 dark:text-white">
            Address Location
            <strong className="text-rose-500"> *</strong>
          </label>
          <LeafletMap coordinates={coords} />
        </div>
      </div>

      {/* AcceptedDocumentsModal Component */}
      <AcceptedDocumentsModal
        open={docType !== ""}
        onClose={() => setdocType("")}
        title={titles[docType]}
        documents={documents}
        samplePic={samplePic}
      />
    </>
  );
}
