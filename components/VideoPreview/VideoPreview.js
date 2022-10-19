import React from "react";
import PropTypes from "prop-types";
import getVideoId from "get-video-id";

export default class YoutubeVideo extends React.Component {
  static propTypes = {
    value: PropTypes.object,
  };

  getEmbedCode(value) {
    const videoId = value && value.url ? getVideoId(value.url) : "";

    if (!videoId) {
      return <span />;
    }

    switch (videoId.service) {
      case "youtube": {
        return (
          <iframe
            src={`https://www.youtube.com/embed/${videoId.id}?rel=0`}
            frameBorder="0"
            allowFullScreen
            width="560"
            height="315"
          />
        );
      }
      case "vimeo": {
        return (
          <iframe
            src={`https://player.vimeo.com/video/${videoId.id}`}
            width="640"
            frameBorder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowFullScreen
          />
        );
      }
      default: {
        return (
          <iframe
            src={value && value.url}
            width="500"
            height="443"
            scrolling="no"
            frameBorder="0"
            allowFullScreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        );
      }
    }
  }
  render() {
    const { value } = this.props;
    return <div style={{ minHeight: "2em" }}>{this.getEmbedCode(value)}</div>;
  }
}
