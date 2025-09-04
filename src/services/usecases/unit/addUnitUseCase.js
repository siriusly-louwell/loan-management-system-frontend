import { unitRepository } from "../../repositories/unitRepository";

export async function addUnitUseCase(data) {
  // const submitData = new FormData();

  if (data.files.length === 0)
    return {
      message: "Please select images for the unit.",
      type: "warn",
    };

  const totalQuantity = data.formData.quantity.reduce(
    (sum, num) => sum + num,
    0
  );
  // const form = unitRepository.appendData(submitData, {
  //   ...data,
  //   totalQuantity,
  // });
  // const response = await unitRepository.add(form);
  const response = await unitRepository.add({ ...data, totalQuantity });

  return response;
}
