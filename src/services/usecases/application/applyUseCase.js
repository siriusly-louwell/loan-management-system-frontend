import { addressRepository } from "../../repositories/addressRepository";
import { applyRepository } from "../../repositories/applyRepository";
import { EquationRepository } from "../../repositories/EquationRepository";

export async function applyUseCase(data) {
  if (data.files.length === 0)
    return {
      message: "Please upload a file in the requirement section.",
      type: "warn",
    };

  const address = data.formData.address;
  const fullAddress = await addressRepository.constructAddress(address);

  const applicant = {
    ...data.formData.applicant,
    personal_pres: fullAddress.personal_pres,
    personal_prev: fullAddress.personal_prev,
    parent_pres: fullAddress.parent_pres,
    parent_prev: fullAddress.parent_prev,
    spouse_pres: fullAddress.spouse_pres,
    spouse_prev: fullAddress.spouse_prev,
    employer_address: address.employer_address,
    lat: address.lat,
    lng: address.lng,
  };

  const response = await applyRepository.apply({
    applicant: applicant,
    unit: data.formData.unit,
    files: data.files,
  });

  return response;
}
