import Achievement from "../../models/Achievement.js";

export async function getAchievements() {
  return Achievement.find({}).sort({ createdAt: -1 }).lean();
}

export async function createAchievement(data) {
  const achievement = new Achievement(data);
  await achievement.save();
  return achievement;
}

export async function updateAchievement(id, data) {
  return Achievement.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteAchievement(id) {
  return Achievement.findByIdAndDelete(id);
}
