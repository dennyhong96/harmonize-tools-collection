export const REDIRECT_MAP = {
  "/": "/contract",
  "/landing": "/contract/landing",
  "/getStarted": "/contract/getStarted",
  "/general": "/contract/general",
  "/disclosing": "/contract/disclosing",
  "/recieving": "/contract/recieving",
  "/partiesRelationship": "/contract/partiesRelationship",
  "/confidentiality": "/contract/confidentiality",
  "/otherInformation": "/contract/otherInformation",
  "/timePeriod": "/contract/timePeriod",
  "/downloadTo": "/contract/downloadTo",
  "/pdf": "/contract/pdf",
  "/complete": "/contract/complete",
};

/**
 * Returns different pathname depends on current environment
 * @param {string} devPathname route pathname of development environment
 * @returns {string} pathname
 */
const path = (devPathname) =>
  process.env.NODE_ENV === "production"
    ? REDIRECT_MAP[devPathname] // returns prod pathname
    : devPathname; // returns dev pathname;

export default path;
