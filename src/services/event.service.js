import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

export async function getEvents({ category = "" } = {}) {
  await dbConnect();
  const query = {};
  if (category && category !== "All") {
    query.category = category;
  }
  return Event.find(query).sort({ date: 1 }).lean();
}

export async function getEventById(id) {
  await dbConnect();
  return Event.findById(id).lean();
}

export async function createEvent(data) {
  await dbConnect();
  const event = new Event(data);
  await event.save();
  return event;
}

export async function updateEvent(id, data) {
  await dbConnect();
  const updated = await Event.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updated;
}

export async function deleteEvent(id) {
  await dbConnect();
  return Event.findByIdAndDelete(id);
}
