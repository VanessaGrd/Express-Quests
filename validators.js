const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;
    const errors = [];
  
    if (title == null) {
      errors.push({ field: "title", message: "This field is required" });
    }else if (title.length >= 255) {
    errors.push({ field: "title", message: "Should contain less than 255 characters" });
  }
    if (director == null) {
      errors.push({ field: "director", message: "This field is required" });
    }else if (director.length >= 255) {
      errors.push({ field: "director", message: "Should contain less than 255 characters" });
    }
    if (year == null) {
      errors.push({ field: "year", message: "This field is required" });
    }else if (year.length >= 255) {
      errors.push({ field: "year", message: "Should contain less than 255 characters" });
    }
    if (color == null) {
      errors.push({ field: "color", message: "This field is required" });
    }else if (color.length >= 255) {
      errors.push({ field: "color", message: "Should contain less than 255 characters" });
    }
    if (duration == null) {
      errors.push({ field: "duration", message: "This field is required" });
    }else if (duration.length >= 255) {
      errors.push({ field: "duration", message: "Should contain less than 255 characters" });
    }
   
    if (errors.length) {
      res.status(422).json({ validationErrors: errors });
    } else {
      next();
    }
  };
  const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (firstname == null) {
    errors.push({ field: "title", message: "This field is required" });
  }
  if (lastname == null) {
    errors.push({ field: "director", message: "This field is required" });
  }
  if (email == null) {
    errors.push({ field: "year", message: "This field is required" });
  }
  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }
  if (city == null) {
    errors.push({ field: "color", message: "This field is required" });
  }
  if (language == null) {
    errors.push({ field: "duration", message: "This field is required" });
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
  }
 module.exports = {validateMovie, validateUser};