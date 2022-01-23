import { Avatar, Typography } from "@mui/material";
import "./post.css";

const Post = ({ post }) => {
  return (
    <div className="noticeboard-post">
      <div className="noticeboard-title">
        <div className="noticeboard-title-user-container">
          <Avatar className="noticeboard-title-user-avatar">
            {post.user.split(" ")[0][0].toUpperCase() +
              post.user.split(" ")[1][0].toUpperCase()}
          </Avatar>
          <div className="noticeboard-title-user">
            <Typography>{post.user}</Typography>
            <Typography variant="caption">{post.time}</Typography>
          </div>
        </div>
      </div>
      <Typography sx={{marginTop:"1em"}} variant="h4" textAlign="left" fontWeight="bold">{post.title}</Typography>
      <Typography sx={{marginTop:"1em"}}  textAlign="left" >{post.body}</Typography>
      
    </div>
  );
};

export default Post;
