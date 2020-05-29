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
  let listPhotos = [];
  for (const link of links) {
    listPhotos = [...listPhotos, await vkPreparePhotoForPosting(link)];
  }
  const publishResponse = await fetch(
    `https://api.vk.com/method/wall.post?owner_id=-${group_id}&attachments=${listPhotos}&access_token=${token}&v=5.101`,
    {
      method: 'post',
      body: 'message=#ahegao #ахегао #hentai #хентай #вайфу',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' }
    }
  );
  const publishJson = await publishResponse.json();
  console.log(publishJson);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(publishJson));
};
