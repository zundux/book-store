const validateContact = ({ firstName, lastName, phone, email }) => {
  const errors = {};

  if (!firstName) {
    errors.firstName = "Required";
  }

  if (!lastName) {
    errors.lastName = "Required";
  }

  if (!phone) {
    errors.phone = "Required";
  }

  if (!email) {
    errors.email = "Required";
  } else if (!/^[^@]+@[^@]+\.[^@]+$/i.test(email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const validateAddress = ({ address, addressOptional, city, country, region, postCode }) => {
  const errors = {};

  if (!address) {
    errors.address = "Required";
  }

  if (!city) {
    errors.city = "Required";
  }

  if (!country) {
    errors.country = "Required";
  }

  if (!region) {
    errors.region = "Required";
  }

  if (!postCode) {
    errors.postCode = "Required";
  }

  return errors;
};

export const validateOrderDetails = values => {
  const payment = values.useShippingInfoAsPaymentInfo ? {} : validateAddress(values.payment);

  return {
    contact: validateContact(values.contact),
    shipping: validateAddress(values.shipping),
    payment
  };
};