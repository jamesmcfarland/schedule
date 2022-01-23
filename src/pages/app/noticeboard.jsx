import { Stack, Typography } from "@mui/material";
import Post from "../../components/noticeboard/post";
import {v4 as uuidv4} from "uuid";
const fakePosts = [
  {
    title: "Wow",
    user: "James McFarland",
    time: "32 minutes ago",
    body: "lorem ipsum dolor sit amet",
  },
];

const Noticeboard = () => {
  return (
    <Stack spacing={2}>
      {fakePosts.map((post) => (
        <Post key={uuidv4()} post={post} />
      ))}
    </Stack>
  );
};

export default Noticeboard;
