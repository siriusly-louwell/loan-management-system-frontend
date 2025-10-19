export const EquationRepository = {
  emi(amount, interest, tenure) {
    const rate = this.monthlyRate(interest);

    return amount === 0 || interest === 0
      ? amount / tenure
      : (amount * rate * Math.pow(1 + rate, tenure)) /
          (Math.pow(1 + rate, tenure) - 1);
  },

  monthlyRate(interest) {
    return interest / 12 / 100;
  },

  ndi(data) {
    return (
      parseFloat(data.rate) -
      (parseFloat(data.rent) +
        parseFloat(data.amortization) +
        parseFloat(data.bills) +
        parseFloat(data.living_exp) +
        parseFloat(data.education_exp) +
        parseFloat(data.transportation))
    );
  },

  dti(data) {
    return (
      ((parseFloat(data.rent) + parseFloat(data.amortization) + data.emi) /
        parseFloat(data.rate)) *
      100
    );
  },
};
