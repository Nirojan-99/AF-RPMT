import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineOppositeContent,
  TimelineContent,
} from "@mui/lab";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ArticleIcon from "@mui/icons-material/Article";

import Content from "./Content";

function SingleTimelineItem(props) {
  return (
    <>
      <TimelineItem>
        <TimelineOppositeContent
          style={{ maxWidth: "1px", paddingLeft: "0px", paddingRight: "0px" }}
        />
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="info">
            {props.icon === "doc" ? (
              <ArticleIcon sx={{ height: "30px", width: "30px" }} />
            ) : (
              <CheckCircleIcon sx={{ height: "30px", width: "30px" }} />
            )}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ textAlign: "center" }}>
          <Content data={props.data} icon={props.icon} />
        </TimelineContent>
      </TimelineItem>
    </>
  );
}

export default SingleTimelineItem;
