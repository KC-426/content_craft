import { Project, Document, Resource } from "../models/featuredContentModel.js";

export const addFeaturedProjects = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = new Project({
      title,
      description,
    });

    const result = await project.save();
    return res.status(201).json({ message: "Project saved successfully!", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No project found!" });
    }
    return res.status(200).json({ message: "Projects fetched successfully!", projects });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const addFeaturedDocuments = async (req, res) => {
  try {
    const { title, description } = req.body;

    const doc = new Document({
      title,
      description,
    });

    const result = await doc.save();
    return res.status(201).json({ message: "Document saved successfully!", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getFeaturedDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    if (!documents || documents.length === 0) {
      return res.status(404).json({ message: "No document found!" });
    }
    return res.status(200).json({ message: "Documents fetched successfully!", documents });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const addFeaturedResources = async (req, res) => {
  try {
    const { title, description } = req.body;

    const resource = new Resource({
      title,
      description,
    });

    const result = await resource.save();
    return res.status(201).json({ message: "Resource saved successfully!", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getFeaturedResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    if (!resources || resources.length === 0) {
      return res.status(404).json({ message: "No resource found!" });
    }
    return res.status(200).json({ message: "Resources fetched successfully!", resources });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
