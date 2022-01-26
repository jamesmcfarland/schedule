import { Button, Stack, Typography } from "@mui/material";
import Post from "../../components/noticeboard/post";
import { v4 as uuidv4 } from "uuid";
import { subDays, subMinutes, subMonths, subWeeks } from "date-fns";
import PostDialog from "../../components/dialogs/PostDialog";
import { useRecoilValue } from "recoil";
import { departmentAtom, organisationIdAtom, userAtom } from "../../atoms";
import { useEffect, useState } from "react";
import { useOrg } from "../../contexts/OrgContext";
const fakePosts = [
  {
    title: "Cleaning issues",
    user: "James McFarland",
    time: subMinutes(new Date(), 3),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hendrerit tortor eu elit feugiat, id pharetra nulla tempor. Aliquam non felis lorem. Fusce ac ante felis. Praesent sollicitudin imperdiet mauris, consequat ultricies nulla aliquet in. Praesent dapibus vehicula aliquet. Vestibulum vitae faucibus purus, ac sodales odio. Morbi rhoncus urna ut consectetur interdum. Proin eu risus eu mauris luctus aliquet. \n\nDonec egestas consectetur turpis, et vulputate odio convallis at. Vivamus augue mi, maximus a orci sodales, viverra finibus magna. In ultrices fringilla leo id lobortis. Donec rutrum eleifend libero, vitae tempor ligula hendrerit molestie. Duis faucibus efficitur diam, ut ullamcorper odio imperdiet non. Nam dolor purus, feugiat sit amet sodales ut, fermentum at lacus. Phasellus quam ligula, porta ac diam vel, maximus sagittis nunc. Sed ligula tortor, semper sit amet orci ut, porta mollis nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce sodales nibh tellus, id semper diam consectetur id. Aenean gravida malesuada urna a gravida. In convallis ullamcorper eros, in tempor turpis molestie id. ",
  },
  {
    title: "New stock",
    user: "Conor McIvor",
    time: subDays(new Date(), 4),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hendrerit tortor eu elit feugiat, id pharetra nulla tempor. Aliquam non felis lorem. Fusce ac ante felis. Praesent sollicitudin imperdiet mauris, consequat ultricies nulla aliquet in. Praesent dapibus vehicula aliquet. Vestibulum vitae faucibus purus, ac sodales odio. Morbi rhoncus urna ut consectetur interdum. Proin eu risus eu mauris luctus aliquet. \n\nDonec egestas consectetur turpis, et vulputate odio convallis at. Vivamus augue mi, maximus a orci sodales, viverra finibus magna. In ultrices fringilla leo id lobortis. Donec rutrum eleifend libero, vitae tempor ligula hendrerit molestie. Duis faucibus efficitur diam, ut ullamcorper odio imperdiet non. Nam dolor purus, feugiat sit amet sodales ut, fermentum at lacus. Phasellus quam ligula, porta ac diam vel, maximus sagittis nunc. Sed ligula tortor, semper sit amet orci ut, porta mollis nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce sodales nibh tellus, id semper diam consectetur id. Aenean gravida malesuada urna a gravida. In convallis ullamcorper eros, in tempor turpis molestie id. ",
  },
  {
    title: "COVID-19 Update",
    user: "Brendan McLaughlin",
    time: subMonths(new Date(), 4),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hendrerit tortor eu elit feugiat, id pharetra nulla tempor. Aliquam non felis lorem. Fusce ac ante felis. Praesent sollicitudin imperdiet mauris, consequat ultricies nulla aliquet in. Praesent dapibus vehicula aliquet. Vestibulum vitae faucibus purus, ac sodales odio. Morbi rhoncus urna ut consectetur interdum. Proin eu risus eu mauris luctus aliquet. \n\nDonec egestas consectetur turpis, et vulputate odio convallis at. Vivamus augue mi, maximus a orci sodales, viverra finibus magna. In ultrices fringilla leo id lobortis. Donec rutrum eleifend libero, vitae tempor ligula hendrerit molestie. Duis faucibus efficitur diam, ut ullamcorper odio imperdiet non. Nam dolor purus, feugiat sit amet sodales ut, fermentum at lacus. Phasellus quam ligula, porta ac diam vel, maximus sagittis nunc. Sed ligula tortor, semper sit amet orci ut, porta mollis nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce sodales nibh tellus, id semper diam consectetur id. Aenean gravida malesuada urna a gravida. In convallis ullamcorper eros, in tempor turpis molestie id. ",
  },
];

const Noticeboard = () => {
  const [newPostDialogOpen, setnewPostDialogOpen] = useState(false);
  const organisationId = useRecoilValue(organisationIdAtom);
  const departmentId = useRecoilValue(departmentAtom);
  const user = useRecoilValue(userAtom);
  const [posts, setposts] = useState([]);
  const { addNewPost, getPosts } = useOrg();

  const newPost = (post) => {
    if (post !== undefined) {
      addNewPost(organisationId, departmentId, user.uid, post);
    }
    setnewPostDialogOpen(false);
  };

  useEffect(() => {
    getPosts(organisationId, departmentId).then((fbposts) => {
      setposts(fbposts);
    });
  }, [departmentId]);

  return (
    <>
      <PostDialog isOpen={newPostDialogOpen} newPost={newPost} />
      <Button
        sx={{ textTransform: "none", margin: "1em 2em" }}
        onClick={() => setnewPostDialogOpen(true)}
      >
        New post
      </Button>
      <Stack spacing={5} sx={{ overflow: "auto", padding: "2em 2em" }}>
        {posts.map((post) => (
          <Post key={uuidv4()} post={post} />
        ))}
      </Stack>
    </>
  );
};

export default Noticeboard;
