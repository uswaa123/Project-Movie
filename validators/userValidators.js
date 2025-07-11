const { z } = require('zod');

// User Registration Schema
const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// User Login Schema
const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const getProfileSchema = z.object({}); // No body needed

const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  password: z.string().min(6).optional(),
});

const deleteProfileSchema = z.object({}); // No body needed

module.exports = {
  registerUserSchema,
  loginUserSchema,
  getProfileSchema,
  updateProfileSchema,
  deleteProfileSchema,
}; 