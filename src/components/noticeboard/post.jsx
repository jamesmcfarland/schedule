import { Avatar, Stack, Typography } from "@mui/material";
import { formatDistance } from "date-fns";
import "./post.css";

const Post = ({ post }) => {
  return (
    <div className="noticeboard-post">
      <div className="noticeboard-title">
        <Stack direction="row" spacing={4}>
          <Avatar className="noticeboard-title-user-avatar">
            {post.user.split(" ")[0][0].toUpperCase() +
              post.user.split(" ")[1][0].toUpperCase()}
          </Avatar>
          <Stack textAlign="left">
            <Typography>{post.user}</Typography>
            <Typography variant="caption">
              {formatDistance(post.time, new Date(), { addSuffix: true })}
            </Typography>
          </Stack>
        </Stack>
      </div>
      <Typography
        sx={{ marginTop: "1em" }}
        variant="h5"
        textAlign="left"
        fontWeight="bold"
      >
        {post.title}
      </Typography>
      <Typography sx={{ marginTop: "1em", whiteSpace:"pre-line" }} textAlign="left">
        {post.body}
      </Typography>
    </div>
  );
};

export default Post;
