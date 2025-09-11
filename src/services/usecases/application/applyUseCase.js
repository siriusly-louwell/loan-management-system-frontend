import { applyRepository } from "../../repositories/applyRepository";

export async function applyUseCase(data) {
  if (data.files.length === 0)
    return {
      message: "Please upload a file in the requirement section.",
      type: "warn",
    };

  const address = data.formData.address;

  const applicant = {
    ...data.formData.applicant,
    personal_pres: `${address.lot_num}, ${address.purok} ${address.brgy},  ${address.city} ${address.province}, ${address.region}`,
    personal_prev: `${address.prev_lot_num}, ${address.prev_purok} ${address.prev_brgy},  ${address.prev_city} ${address.prev_province}, ${address.prev_region}`,
    parent_pres: `${address.p_lot_num}, ${address.p_purok} ${address.p_brgy},  ${address.p_city} ${address.p_province}, ${address.p_region}`,
    parent_prev: `${address.p_prev_lot_num}, ${address.p_prev_purok} ${address.p_prev_brgy},  ${address.p_prev_city} ${address.p_prev_province}, ${address.p_prev_region}`,
    spouse_pres: `${address.sp_lot_num}, ${address.sp_purok} ${address.sp_brgy},  ${address.sp_city} ${address.sp_province}, ${address.sp_region}`,
    spouse_prev: `${address.sp_prev_lot_num}, ${address.sp_prev_purok} ${address.sp_prev_brgy},  ${address.sp_prev_city} ${address.sp_prev_province}, ${address.sp_prev_region}`,
  };

  const response = await applyRepository.apply({
    applicant: applicant,
    unit: data.formData.unit,
    files: data.files,
  });

  return response;
}
