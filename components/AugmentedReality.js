import Image from "next/image";
import * as gtag from "../utils/gtag";
import animeGirl1 from "../public/augmented_reality/anime_girl_1.jpg";
import animeGirl2 from "../public/augmented_reality/anime_girl_2.jpg";
import animeGirl3 from "../public/augmented_reality/anime_girl_3.jpg";

const list = [
  {
    url: "/augmented_reality/anime_girl_1.usdz",
    image: animeGirl1
  },
  {
    url: "/augmented_reality/anime_girl_2.usdz",
    image: animeGirl2
  },
  {
    url: "/augmented_reality/anime_girl_3.usdz",
    image: animeGirl3
  }
];

export default function AugmentedReality() {
  return (
    <div className="bg-light rounded p-3 mb-3">
      <h3 className="text-center mb-3 mt-3">See it in your space.</h3>
      <p className="text-center mb-5">
        To view Anime Girls in AR, visit this page in Safari on your iPhone or
        iPad.
      </p>
      <div className="container ">
        <div className="row">
          {list.map(({ image, url }) => (
            <div
              key={url}
              className="col-md-4 col-sm-12 justify-content-center d-flex"
            >
              <a
                onClick={() => {
                  gtag.event({
                    action: "Open VR girl",
                    category: image
                  });
                }}
                className="mb-2"
                href={url}
                rel="ar"
              >
                <Image
                  className="border border-secondary rounded"
                  width="200"
                  height="200"
                  src={image}
                  placeholder="blur"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
