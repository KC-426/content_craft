import mongoose from "mongoose";

const featuredProjectsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model(
  "FeaturedProjects",
  featuredProjectsSchema
);

const featuredDocumentsSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
 const Document = mongoose.model(
    "FeaturedDocuments",
    featuredDocumentsSchema
  );
  

  const featuredResourcesSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const Resource = mongoose.model(
    "FeaturedResources",
    featuredResourcesSchema
  );
  

  export { Project, Document, Resource };
