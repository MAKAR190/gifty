import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";
import { urlFor } from "../lib/client";

export default {
  types: {
    image: ({ value }) =>
      value ? (
        <div className="image">
          <a
            href={urlFor(value).fit("max").auto("format").url()}
            target="_blank"
            rel="noopener"
          >
            <Image
              width={100}
              height={45}
              objectFit="cover"
              layout="responsive"
              src={urlFor(value).fit("max").auto("format").url()}
            />
          </a>
        </div>
      ) : (
        <div />
      ),
    video: ({ value }) =>
      value ? (
        <div className="videoPlayer">
          <ReactPlayer url={value.url} controls width="100%" height="100%" />
        </div>
      ) : (
        <div />
      ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;

      if (value.href.startsWith("/")) {
        return (
          <Link href={value.href} rel={rel}>
            <span className="contentLink">{children}</span>
          </Link>
        );
      } else {
        return (
          <a
            target="_blank"
            className="contentLink"
            href={value.href}
            rel={rel}
          >
            {children}
          </a>
        );
      }
    },
  },
  block: ({ children }) => <div className="content">{children}</div>,
  block: {
    h2: ({ children }) => <h2 className="textSubtitle">{children}</h2>,
    normal: ({ children }) => <p className="content">{children}</p>
  },
  list: {
    bullet: ({ children }) => <ul className="ulContentList">{children}</ul>,
    number: ({ children }) => <ol className="olContentList">{children}</ol>,
  },
  listItem: ({ children }) => <li className="listItem">{children}</li>,
};
