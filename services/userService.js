const userRepo = require('../repos/userRepo');
const { hashPassword } = require('../utils/passwordHasher');

const userService = {
  async getProfile(userId) {
    const user = await userRepo.findById(userId);
    if (!user) throw new Error('User not found.');
    return { id: user.id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified };
  },

  async updateProfile(userId, data) {
    const updates = {};
    if (data.name) updates.name = data.name;
    if (data.email) updates.email = data.email;
    if (data.password) updates.passwordHash = await hashPassword(data.password);
    if (Object.keys(updates).length === 0) throw new Error('No valid fields to update.');
    const updated = await userRepo.update(userId, updates);
    return { id: updated.id, name: updated.name, email: updated.email, role: updated.role, isVerified: updated.isVerified };
  },

  async deleteProfile(userId) {
    const user = await userRepo.findById(userId);
    if (!user) throw new Error('User not found.');
    await userRepo.delete(userId);
    return true;
  },
};

module.exports = userService; 