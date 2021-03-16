import React from "react";
// Mui
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

const TimeLineItem = ({ marked, title, noConnector }) => (
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot color={marked ? "primary" : "grey"} />
      {!noConnector && <TimelineConnector />}
    </TimelineSeparator>
    <TimelineContent>{title}</TimelineContent>
  </TimelineItem>
);

const TimeLine = ({ media, title, description, categoryId }) => {
  return (
    <Timeline align="left">
      <TimeLineItem title={"Media"} marked={media} />
      <TimeLineItem title={"Title"} marked={title} />
      <TimeLineItem title={"Description"} marked={description} />
      <TimeLineItem title={"Main Service"} marked={categoryId} noConnector />
    </Timeline>
  );
};

export default TimeLine;
