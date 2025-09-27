export const FORM_ROUTES = [
  "/customer/apply",
  "/customer/apply/personalinfo",
  "/customer/apply/employinfo",
  "/customer/apply/familyinfo",
  "/customer/apply/requirements",
  "/customer/apply/comakerform",
];

export default function formRoutes(url = "customer") {
  return url === "customer"
    ? FORM_ROUTES
    : [
        `/${url}/apply`,
        `/${url}/apply/employinfo`,
        `/${url}/apply/familyinfo`,
        `/${url}/apply/requirements`,
      ];
}
