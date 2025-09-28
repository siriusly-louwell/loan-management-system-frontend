export const CATEGORY_RESULTS = {
  employment: {
    green: {
      label: "Employment Status",
      description: "Client has stable income and tenure",
      suggestion: "Proceed with the loan application",
    },
    yellow: {
      label: "Employment Status",
      description: "Client meets minimum requirements",
      suggestion: "Review employment history and income stability",
    },
    red: {
      label: "Employment Status",
      description: "Client does not meet minimum requirements",
      suggestion: "Cannot proceed with the application",
    },
  },
  debt: {
    green: {
      label: "Debt-to-Income Ratio",
      description: "Client has good debt management",
      suggestion: "Debt ratio is within acceptable range",
    },
    yellow: {
      label: "Debt-to-Income Ratio",
      description: "Client's debt ratio needs attention",
      suggestion: "Consider debt consolidation options",
    },
    red: {
      label: "Debt-to-Income Ratio",
      description: "Client has high debt exposure",
      suggestion: "Debt ratio exceeds acceptable range",
    },
  },
  ndi: {
    green: {
      label: "Net Disposable Income",
      description: "Client has sufficient disposable income",
      suggestion: "Can comfortably handle loan payments",
    },
    yellow: {
      label: "Net Disposable Income",
      description: "Limited disposable income",
      suggestion: "Review and adjust loan terms",
    },
    red: {
      label: "Net Disposable Income",
      description: "Insufficient disposable income",
      suggestion: "Cannot support additional loan payments",
    },
  },
};

export const STABILITY_COLORS = {
  GREEN: "green",
  YELLOW: "yellow",
  RED: "red",
};

export const VIABILITY_RESULTS = {
  ELIGIBLE: "eligible",
  PASSED: "passed",
  REVIEW: "review",
  NOT_ELIGIBLE: "not_eligible",
  REJECT: "reject",
};
