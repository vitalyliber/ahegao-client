const fs = require("fs");
const util = require("util");
const FormData = require("form-data");
const streamPipeline = util.promisify(require("stream").pipeline);

const group_id = process.env.VK_GROUP_ID;
const user_id = process.env.VK_USER_ID;
const token = process.env.VK_ACCESS_TOKEN;

async function download(link, path) {
  const response = await fetch(link);
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);
  return await streamPipeline(response.body, fs.createWriteStream(path));
}

const vkPreparePhotoForPosting = async link => {
  const path = `./${Math.floor(Math.random() * Math.floor(1000000000))}.jpg`;
  const response = await fetch(
    `https://api.vk.com/method/photos.getWallUploadServer?group_id=${group_id}&access_token=${token}&v=5.101`
  );
  const json = await response.json();
  console.log(json);

  const {
    response: { upload_url }
  } = json;

  async function uploadImage() {
    await download(link, path);
    const file = fs.createReadStream(path);
    const form = new FormData();
    form.append("photo", file, {
      contentType: "image/jpeg",
      filename: "dummy.jpg"
    });
    return fetch(upload_url, { method: "POST", body: form })
      .then(async res => {
        console.log(res.status);
        const json = await res.json();
        console.log(json);
        return json;
      })
      .catch(e => console.log(e));
  }
  const imageJson = await uploadImage();
  const { hash, server, photo } = imageJson;
  console.log(imageJson);

  const saveWallPhotoResponse = await fetch(
    `https://api.vk.com/method/photos.saveWallPhoto?group_id=${group_id}&hash=${hash}&server=${server}&photo=${photo}&access_token=${token}&v=5.101`
  );
  const saveWallPhotoJson = await saveWallPhotoResponse.json();
  console.log(saveWallPhotoJson);
  const listPhotos = saveWallPhotoJson.response.map(
    el => `photo${user_id}_${el.id}`
  );
  try {
    fs.unlinkSync(path);
  } catch (err) {
    console.error(err);
  }
  return listPhotos[0];
};

export default vkPreparePhotoForPosting;
