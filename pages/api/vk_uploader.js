import vkPreparePhotoForPosting from "../../utils/vkPreparePhotoForPosting";
import Axios from "axios";
const group_id = process.env.VK_GROUP_ID;
const token = process.env.VK_ACCESS_TOKEN;

export default async (req, res) => {
  try {
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
        method: "post",
        body: "message=#ahegao #ахегао #hentai #хентай #вайфу",
        headers: { "Content-type": "application/x-www-form-urlencoded" }
      }
    );
    const publishJson = await publishResponse.json();
    console.log(publishJson);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(publishJson));
  } catch (e) {
    console.log("ffksdjflkdsjfkjd");
    await Axios({
      method: "get",
      url: `https://api.telegram.org/bot1391975186:AAElQ3ZqMQiHCC8qsVAlI1ccSjSgD46Fl-E/sendMessage?chat_id=@monitoring_services&text=${e.message}`,
      headers: {
        "Content-type": "application/json"
      }
    }).catch(e => console.log("Telegram error", e.response.data));
    throw Error(e.message);
  }
};
