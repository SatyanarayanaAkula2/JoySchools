export const validateBody = (schema) => (req, res, next) => {
  try {
    // If fields are empty strings and the schema expects something else, or if the form-data strings need to be parsed:
    // Some numeric fields from form-data (like display order) might need to be parsed
    const bodyToValidate = { ...req.body };
    
    // Parse order if it is present and is a string
    if (bodyToValidate.order !== undefined && typeof bodyToValidate.order === "string") {
      const parsed = parseInt(bodyToValidate.order, 10);
      bodyToValidate.order = isNaN(parsed) ? 0 : parsed;
    }

    const validated = schema.parse(bodyToValidate);
    req.validatedBody = validated;
    next();
  } catch (error) {
    console.error("Validation error:", error);
    const errors = error.errors ? error.errors.map(err => err.message).join(", ") : error.message;
    return res.status(400).json({ success: false, error: errors || "Validation failed." });
  }
};
