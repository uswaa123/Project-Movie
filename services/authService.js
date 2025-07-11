const userRepo = require('../repos/userRepo');
const { hashPassword, comparePassword } = require('../utils/passwordHasher');
const { generateOTP } = require('../utils/otpGenerator');
const { sendEmail } = require('../utils/emailFactory');
const jwt = require('jsonwebtoken');

const OTP_EXPIRY_MINUTES = 10;

const authService = {
  async signup(data) {
    const { name, email, password } = data;
    const existing = await userRepo.findByEmail(email);
    if (existing) throw new Error('Email already registered.');
    const passwordHash = await hashPassword(password);
    const otp = generateOTP();
    const otp_expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000);
    const user = await userRepo.create({
      name,
      email,
      passwordHash,
      otp_code: otp,
      otp_expiresAt,
      isVerified: false,
    });
    await sendEmail(email, 'Your OTP Code', `<p>Your OTP is: <b>${otp}</b></p>`);
    return { id: user.id, email: user.email };
  },

  async verifyOtp(data) {
    const { email, otp } = data;
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('User not found.');
    if (user.isVerified) throw new Error('User already verified.');
    if (user.otp_code !== otp) throw new Error('Invalid OTP.');
    if (new Date() > new Date(user.otp_expiresAt)) throw new Error('OTP expired.');
    await userRepo.update(user.id, { isVerified: true, otp_code: null, otp_expiresAt: null });
    return true;
  },

  async resendOtp(data) {
    const { email } = data;
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('User not found.');
    if (user.isVerified) throw new Error('User already verified.');
    const otp = generateOTP();
    const otp_expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000);
    await userRepo.update(user.id, { otp_code: otp, otp_expiresAt });
    await sendEmail(email, 'Your OTP Code', `<p>Your OTP is: <b>${otp}</b></p>`);
    return true;
  },

  async login(data) {
    const { email, password } = data;
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('User not found.');
    if (!user.isVerified) throw new Error('User not verified.');
    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) throw new Error('Invalid credentials.');
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, isVerified: user.isVerified },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  },

  async forgotPassword(data) {
    const { email } = data;
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('User not found.');
    const otp = generateOTP();
    const otp_expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000);
    await userRepo.update(user.id, { otp_code: otp, otp_expiresAt });
    await sendEmail(email, 'Your Password Reset OTP', `<p>Your OTP is: <b>${otp}</b></p>`);
    return true;
  },

  async resetPassword(data) {
    const { email, otp, newPassword } = data;
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('User not found.');
    if (user.otp_code !== otp) throw new Error('Invalid OTP.');
    if (new Date() > new Date(user.otp_expiresAt)) throw new Error('OTP expired.');
    const passwordHash = await hashPassword(newPassword);
    await userRepo.update(user.id, { passwordHash, otp_code: null, otp_expiresAt: null });
    return true;
  },

  async getMe(userId) {
    const user = await userRepo.findById(userId);
    if (!user) throw new Error('User not found.');
    return { id: user.id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified };
  },
};

module.exports = authService; 