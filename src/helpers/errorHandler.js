const errors = {
  name: "",
  email: "",
  text: "",
};

const errorHandler = ({ name, email, text }) => {
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]*\w+)*(\.\w{2,6})$/;
  if (!name) {
    errors.name = "نام را وارد کنید";
  } else {
    delete errors.name;
  }
  if (!email) {
    errors.email = "ایمیل را وارد کنید";
  } else if (!emailReg.test(email)) {
    errors.email = "ایمیل صحیح نمیباشد";
  } else {
    delete errors.email;
  }
  if (!text) {
    errors.text = "فیلد متن نمیتواند خالی باشد";
  } else {
    delete errors.text;
  }

  return errors;
};

export default errorHandler;
