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

const CleaningTimeLine = ({
  media,
  title,
  description,
  categoryId,
  frequency,
  hour,
  staff,
  cleaningMaterialsDescription,
  hourDescription,
  price,
  discount,
  packageInclude,
  brandUsed,
  suitable,
  certification,
}) => {
  return (
    <Timeline align="left">
      <TimeLineItem title={"Media"} marked={media} />
      <TimeLineItem title={"Title"} marked={title} />
      <TimeLineItem title={"Description"} marked={description} />
      <TimeLineItem title={"Main Service"} marked={categoryId} />
      <TimeLineItem title={"Frequency"} marked={frequency} />
      <TimeLineItem title={"Hours"} marked={hour} />
      <TimeLineItem title={"Professionals"} marked={staff} />
      <TimeLineItem
        title={"Materials Description"}
        marked={cleaningMaterialsDescription}
      />
      <TimeLineItem title={"Hours Description"} marked={hourDescription} />
      <TimeLineItem title={"Price"} marked={price} />
      <TimeLineItem title={"Discount"} marked={discount} />
      <TimeLineItem title={"Package"} marked={packageInclude} />
      <TimeLineItem title={"Brand"} marked={brandUsed} />
      <TimeLineItem title={"Suitable"} marked={suitable} />
      <TimeLineItem
        title={"Certification"}
        marked={certification}
        noConnector
      />
    </Timeline>
  );
};

export default CleaningTimeLine;
