const usernamePattern = /^[a-zA-Z1-9]*$/;
const validateUsername = (string) => {
  string.trim();
  if (usernamePattern.test(string)) return string;
  return false;
};

const passwordPattern = /^[a-zA-Z1-9!@#$%^&*]*$/;
const validatePassword = (password) => {
  password.trim();
  if (passwordPattern.test(password)) return password;
  return false;
};

const nonViPattern = /[^a-z0-9A-Z_\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/g;
const validateName = (name) => {
  name.trim();
  if (nonViPattern.test(name)) return false;
  return name;
};

const emailPattern = /^[a-zA-Z0-9]*@[a-zA-Z0-9]*.[a-zA-Z0-9]*$/;
const validateEmail = (email) => {
  email.trim();
  if (emailPattern.test(email)) return email;
  return false;
};

const phonePattern = /^0[0-9]{9}$/;
const validatePhone = (phone) => {
  phone.trim();
  if (phonePattern.test(phone)) return phone;
  return false;
};

const nonInjectionPattern = /[^a-z0-9A-Z_\s.!@#$%^&*?(),ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/g;
const validateInjection = (paragraph) => {
  if (nonInjectionPattern.test(paragraph)) return false;
  return paragraph;
};

export {
  validateUsername,
  validatePassword,
  validateName,
  validateEmail,
  validatePhone,
  validateInjection,
};
