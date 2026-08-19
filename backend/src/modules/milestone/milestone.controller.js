import * as milestoneService from "./milestone.service.js";

export async function fetchMilestones(req, res) {
  try {
    const list = await milestoneService.getMilestones();
    return res.status(200).json({ success: true, milestones: list });
  } catch (error) {
    console.error("fetchMilestones controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch milestones" });
  }
}

export async function addMilestone(req, res) {
  try {
    const validated = req.validatedBody;
    const item = await milestoneService.createMilestone(validated);
    return res.status(201).json({ success: true, milestone: item });
  } catch (error) {
    console.error("addMilestone controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to add milestone" });
  }
}

export async function editMilestone(req, res) {
  try {
    const { id } = req.params;
    const validated = req.validatedBody;
    const item = await milestoneService.updateMilestone(id, validated);
    if (!item) {
      return res.status(404).json({ success: false, error: "Milestone not found" });
    }
    return res.status(200).json({ success: true, milestone: item });
  } catch (error) {
    console.error("editMilestone controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to update milestone" });
  }
}

export async function removeMilestone(req, res) {
  try {
    const { id } = req.params;
    await milestoneService.deleteMilestone(id);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("removeMilestone controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to delete milestone" });
  }
}
