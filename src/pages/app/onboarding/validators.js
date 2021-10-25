import axios from "axios";

export const validateOrgDetails = (values, orgCountry) => {
  return new Promise((resolve, reject) => {
    console.log("called");
    const errors = {};

    if (!values.orgName) {
      errors.orgName = "Required";
    }
    if (!values.orgAddrLine1) {
      errors.orgAddrLine1 = "Required";
    }
    // if (!values.orgAddrLine2) {
    //   errors.orgAddrLine2 = "Required";
    // }

    //TODO: add proper, real validation that this entire address exists

    if (!values.orgCity) {
      errors.orgCity = "Required";
    }
    if (!values.orgPhoneContact) {
      errors.orgPhoneContact = "Required";
    } else {
      let phone = values.orgPhoneContact;

      phone = phone.replaceAll(" ", "").replaceAll("+", "").replaceAll("-", "");

      let valid = false;
      if (phone.length === 11 && phone[0] === "0") {
        valid = true;
      } else if (phone.length === 10) {
        valid = true;
      }
      if (!/^\d+$/.test(phone)) {
        valid = false;
      }

      if (!valid) errors.orgPhoneContact = "Invalid phone number";
    }
    console.log("done");
    let re = new RegExp("([A-Z]{1,2}\\d[A-Z\\d]? ?\\d[A-Z]{2}|GIR ?0A{2})");
    if (!values.orgPostCode) {
      errors.orgPostCode = "Required";
    }
    //Source: https://stackoverflow.com/questions/164979/regex-for-matching-uk-postcodes
    else {
      console.log("OCC", orgCountry.code);
      if (orgCountry.code === "GB") {
        // if (!re.test(values.orgPostCode)) {
        //   errors.orgPostCode = "Not a valid postcode";
        // }
        var postcodeOK = true;
        axios
          .get("https://api.postcodes.io/postcodes/" + values.orgPostCode)
          .then((res) => {
            if (res.data.status != "200")
              errors.orgPostCode = "Not a valid postcode";
          })
          .catch((err) => {
            postcodeOK = false;
            console.log(postcodeOK);
          })
          .finally(() => {
            console.log("F", postcodeOK);
            if (!postcodeOK) errors.orgPostCode = "Not a valid postcode";
            resolve(errors);
          });
      } else if (orgCountry.code === "US") {
        if (values.orgPostCode.length === 0 || values.orgPostCode.length > 5) {
          errors.orgPostCode = "Invalid zip code";
          resolve(errors);
        }
      } else {
        //Some other validation?
        resolve(errors);
      }
    }
  });
};

