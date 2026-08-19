import Setting from "../../models/Setting.js";

export async function getSettings() {
  let doc = await Setting.findOne({}).lean();
  if (!doc) {
    // Create new document with defaults defined in schema
    doc = await Setting.create({});
    doc = doc.toObject();
  }
  return doc;
}

export async function updateSettings(data) {
  let doc = await Setting.findOne({});
  if (!doc) {
    doc = new Setting(data);
  } else {
    Object.assign(doc, data);
  }
  await doc.save();
  return doc;
}
