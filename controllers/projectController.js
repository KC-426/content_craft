import Project from "../models/projectModel.js";

export const addProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = new Project({
      title,
      description,
    });

    const result = await project.save();
    return res
      .status(201)
      .json({ message: "Project saved successfully!", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No project found!" });
    }
    return res
      .status(200)
      .json({ message: "Projects fetched successfully!", projects });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const deleteProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "No project found!" });
    }

    await Project.findOneAndDelete(projectId);

    return res
      .status(200)
      .json({ message: "Projects deleted successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
