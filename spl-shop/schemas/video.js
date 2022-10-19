import VideoEmbedPreview from "../../components/VideoPreview/VideoPreview";

export default {
  name: "video",
  type: "object",
  title: "Video",
  fields: [
    {
      name: "url",
      type: "url",
      title: "URL",
    },
  ],
  preview: {
    select: {
      url: "url",
    },
    component: VideoEmbedPreview,
  },
};
