import vkPreparePhotoForPosting from "../../utils/vkPreparePhotoForPosting";
const group_id = process.env.VK_GROUP_ID;
const token = process.env.VK_ACCESS_TOKEN;

export default async (req, res) => {
  const { links, server_token } = req.body;
  if (server_token !== process.env.SERVER_TOKEN) {
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Server token error" }));
    return;
  }
  const listPhotos = await Promise.all(
    links.map(link => vkPreparePhotoForPosting(link))
  );
  const publishResponse = await fetch(
    `https://api.vk.com/method/wall.post?owner_id=-${group_id}&attachments=${listPhotos}&access_token=${token}&v=5.101`
  );
  const publishJson = await publishResponse.json();
  console.log(publishJson);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(publishJson));
};
