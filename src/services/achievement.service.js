import dbConnect from "@/lib/mongodb";
import Achievement from "@/models/Achievement";

export async function getAchievements() {
  await dbConnect();
  return Achievement.find({}).sort({ createdAt: -1 }).lean();
}

export async function getAchievementById(id) {
  await dbConnect();
  return Achievement.findById(id).lean();
}

export async function createAchievement(data) {
  await dbConnect();
  const achievement = new Achievement(data);
  await achievement.save();
  return achievement;
}

export async function updateAchievement(id, data) {
  await dbConnect();
  const updated = await Achievement.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updated;
}

export async function deleteAchievement(id) {
  await dbConnect();
  return Achievement.findByIdAndDelete(id);
}
