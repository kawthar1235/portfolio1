import Skill from "../models/Skill.js";

export const getSkills = async (req, res) => {
  const skills = await Skill.find().sort({ createdAt: -1 });
  res.json(skills);
};

export const addSkill = async (req, res) => {
  const { icon, name, list } = req.body;

  if (!icon || !name || !list) {
    return res.status(400).json({ message: "Icon, name, and list are required" });
  }

  const skill = await Skill.create({
    icon: icon.trim(),
    name: name.trim(),
    list: list.trim(),
  });

  res.status(201).json(skill);
};

export const deleteSkill = async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
