import Milestone from "../../models/Milestone.js";

export async function getMilestones() {
  return Milestone.find({}).sort({ order: 1, label: 1 }).lean();
}

export async function createMilestone(data) {
  const milestone = new Milestone(data);
  await milestone.save();
  return milestone;
}

export async function updateMilestone(id, data) {
  return Milestone.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteMilestone(id) {
  return Milestone.findByIdAndDelete(id);
}

export async function seedInitialMilestones() {
  try {
    const count = await Milestone.countDocuments();
    if (count === 0) {
      const defaults = [
        { icon: "🏫", value: "15+", label: "Years of Educational Legacy", order: 1 },
        { icon: "🎓", value: "100%", label: "State Board Pass Rate", order: 2 },
        { icon: "🏆", value: "35+", label: "Sports & Cultural Trophies", order: 3 },
        { icon: "🌐", value: "2,200+", label: "Alumni Worldwide", order: 4 },
      ];
      await Milestone.insertMany(defaults);
      console.log("Seeded initial school milestones successfully.");
    }
  } catch (error) {
    console.error("Failed to seed initial milestones:", error);
  }
}
