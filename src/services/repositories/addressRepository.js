import { ADDRESS_NAMES, FIELD_NAMES } from "../../constants/formFields";
import AddressAPI from "./../api/AddressAPI";

export const addressRepository = {
  async constructAddress(address) {
    const personalPres = address.keep_personal
      ? address.personal_pres
      : await this.fullAddress(
          address.region,
          address.province,
          address.city,
          address.brgy,
          address.purok,
          address.lot_num
        );
    const personalPrev = address.keep_personal
      ? address.personal_prev
      : await this.fullAddress(
          address.prev_region,
          address.prev_province,
          address.prev_city,
          address.prev_brgy,
          address.prev_purok,
          address.prev_lot_num
        );

    // ? Parent address
    const parentPres = address.keep_parent
      ? address.parent_pres
      : await this.fullAddress(
          address.p_region,
          address.p_province,
          address.p_city,
          address.p_brgy,
          address.p_purok,
          address.p_lot_num
        );
    const parentPrev = address.keep_parent
      ? address.parent_prev
      : await this.fullAddress(
          address.p_prev_region,
          address.p_prev_province,
          address.p_prev_city,
          address.p_prev_brgy,
          address.p_prev_purok,
          address.p_prev_lot_num
        );

    // ? Spouse address
    const spousePres = address.keep_spouse
      ? address.spouse_pres
      : await this.fullAddress(
          address.sp_region,
          address.sp_province,
          address.sp_city,
          address.sp_brgy,
          address.sp_purok,
          address.sp_lot_num
        );
    const spousePrev = address.keep_spouse
      ? address.spouse_prev
      : await this.fullAddress(
          address.sp_prev_region,
          address.sp_prev_province,
          address.sp_prev_city,
          address.sp_prev_brgy,
          address.sp_prev_purok,
          address.sp_prev_lot_num
        );

    // ? Comaker address
    const comakerPres = address.keep_spouse
      ? address.spouse_pres
      : await this.fullAddress(
          address.sp_region,
          address.sp_province,
          address.sp_city,
          address.sp_brgy,
          address.sp_purok,
          address.sp_lot_num
        );
    const comakerPerm = address.keep_spouse
      ? address.spouse_prev
      : await this.fullAddress(
          address.sp_prev_region,
          address.sp_prev_province,
          address.sp_prev_city,
          address.sp_prev_brgy,
          address.sp_prev_purok,
          address.sp_prev_lot_num
        );

    // ? Comaker's spouse's parent address
    const coSpouse = address.keep_spouse
      ? address.spouse_pres
      : await this.fullAddress(
          address.sp_region,
          address.sp_province,
          address.sp_city,
          address.sp_brgy,
          address.sp_purok,
          address.sp_lot_num
        );

    return {
      personal_pres: personalPres,
      personal_prev: personalPrev,
      parent_pres: parentPres,
      parent_prev: parentPrev,
      spouse_pres: spousePres,
      spouse_prev: spousePrev,
      comaker_pres: comakerPres,
      comaker_perm: comakerPerm,
      co_spouse: coSpouse,
    };
  },

  async fullAddress(region, province, city, barangay, purok, lot_num) {
    const reg = region ? await AddressAPI.region(region) : "";
    const prov = province ? await AddressAPI.province(province) : "";
    const cit = city ? await AddressAPI.city(city) : "";
    const brgy = barangay ? await AddressAPI.barangay(barangay) : "";

    return `${lot_num}, ${purok} ${brgy.name}, ${cit.name} ${prov.name}, ${reg.name}`;
  },

  getFields(pageNum, type, keepFlags) {
    const fields =
      type === "applicant" ? FIELD_NAMES[pageNum] : ADDRESS_NAMES[pageNum];

    if (type !== "address") return fields;
    if (keepFlags.keep_personal && pageNum === 1)
      return fields.filter((field) => !ADDRESS_NAMES[1].includes(field));
    if (keepFlags.keep_parent && pageNum === 3)
      return fields.filter((field) => !ADDRESS_NAMES[3].includes(field));

    return fields;
  },

  filterFields(pageNum, form) {
    const updatedForm = { ...form };

    if (form.keep_personal && pageNum === 1)
      return Object.fromEntries(
        Object.entries(updatedForm).filter(
          ([key]) => !ADDRESS_NAMES[1].includes(key)
        )
      );
    if (form.keep_parent && pageNum === 3)
      return Object.fromEntries(
        Object.entries(updatedForm).filter(
          ([key]) => !ADDRESS_NAMES[3].includes(key)
        )
      );

    return updatedForm;
  },
};
