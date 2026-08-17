import Event from "../../models/Event.js";

export async function getEvents() {
  return Event.find({}).sort({ date: 1 }).lean();
}

export async function createEvent(data) {
  const event = new Event(data);
  await event.save();
  return event;
}

export async function updateEvent(id, data) {
  return Event.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteEvent(id) {
  return Event.findByIdAndDelete(id);
}
