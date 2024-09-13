import scheduleMeetingModel from "../models/scheduleMeetingModel.js";

export const scheduleMeeting = async (req, res) => {
  try {
    const {
      meetingTitle,
      time,
      date,
      inviteCollaborator,
      link,
      meetingAgenda,
    } = req.body;

    const newMeeting = await scheduleMeetingModel({
      meetingTitle,
      time,
      date,
      inviteCollaborator,
      link,
      meetingAgenda,
    });

    const result = await newMeeting.save();
    return res
      .status(201)
      .json({ message: "Meeting scheduled successfully !", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};

export const getUpcomingMeetings = async (req, res) => {
  try {
    const currentDate = new Date();

    const upcomingMeetings = await scheduleMeetingModel
      .find({ date: { $gte: currentDate } })
      .sort({ date: 1 });

    if (upcomingMeetings.length === 0) {
      return res.status(404).json({ message: "No upcoming meetings found." });
    }

    return res
      .status(200)
      .json({
        message: "Upcoming meetings retrieved successfully.",
        upcomingMeetings,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
