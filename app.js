import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: "config/.env" });

app.use(express.json());

const PORT = process.env.PORT;
const { MONGODB_URI } = process.env;

import userRoutes from "./routes/userRoutes.js";
import subscribeRoutes from "./routes/subscribeRoutes.js";
import incidentReportFormRoutes from "./routes/incidentReportingFrom.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import supportFormRoutes from "./routes/supportFormRoute.js";
import technicalIssueSupportRoutes from "./routes/technicalIssueSupportRoute.js";
import accountAssistanceSupportRoutes from "./routes/accountAssistanceRoutes.js";
import contentGenerationIssueSupportRoutes from "./routes/contentGenerationIssue.js";
import inviteCollaboratorRoutes from "./routes/inviteCollaboratorRoutes.js";
import scheduleMeetingRoutes from "./routes/scheduleMeetingRoutes.js";

app.use("/api/v1", userRoutes);
app.use("/api/v1", subscribeRoutes);
app.use("/api/v1", incidentReportFormRoutes);
app.use("/api/v1", feedbackRoutes);
app.use("/api/v1", supportFormRoutes);
app.use("/api/v1", technicalIssueSupportRoutes);
app.use("/api/v1", accountAssistanceSupportRoutes);
app.use("/api/v1", contentGenerationIssueSupportRoutes);
app.use("/api/v1", inviteCollaboratorRoutes);
app.use("/api/v1", scheduleMeetingRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("DB Connected !");
  })
  .catch((err) => console.log(err));
app.listen(PORT, () => {
  console.log(`Server running of port ${PORT}`);
});
