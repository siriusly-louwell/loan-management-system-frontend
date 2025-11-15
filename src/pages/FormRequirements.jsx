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
import { useState } from "react";


export default function FormRequirements() {
  const { fileChange, toggleKeep } = useOutletContext();
  const { role } = useSelector(UserEntity);
  const { formData } = useSelector((state) => state.form);
  const coords =
    role === "customer"
      ? { lat: formData.address.lat, lng: formData.address.lng }
      : { lat: 7.3081, lng: 125.6842 };

  if (!formData?.applicant) {
    return <div className="text-gray-500">Loading requirements...</div>;
  }
  const [openInfo, setOpenInfo] = useState(false);
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
        {!formData.applicant?.keep_files && (
          <>
            <FileInput
              label="Valid ID"
              name="valid_id"
              type="img"
              accept=".jpg,.png,.pdf"
              documents={[
                "Student ID",
                "Passport",
                "Driver's License",
                "National ID",
                "Voter's id"
              ]}
              change={fileChange}
              require={true}
            />
            <FileInput
              label="2x2 Picture"
              name="id_pic"
              type="img"
              documents={[
                twoByTwo
              ]}
              accept=".jpg,.png,.pdf"
              change={fileChange}
              require={true}
            />
            <FileInput
              label="Proof of Residence"
              name="residence_proof"
              type="img"
              documents={[
                proofOfResidency
              ]}
              accept=".jpg,.png,.pdf"
              change={fileChange}
              require={true}
            />
            <FileInput
              label="Proof of Income"
              name="income_proof"
              type="img"
              documents={[
                proofOfIncome
              ]}
              accept=".jpg,.png,.pdf"
              change={fileChange}
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
    </>
  );
}
