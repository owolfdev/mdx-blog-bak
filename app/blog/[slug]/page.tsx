import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import YouTube from "@/components/mdx/youtube";
import Code from "@/components/mdx/code-component/code";
// import { getPost } from "@/lib/posts.mjs";
import { notFound } from "next/navigation";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
};

export async function getPost({ slug }: { slug: string }) {
  try {
    const markdownFile = fs.readFileSync(
      path.join("data/posts", slug + ".mdx"),
      "utf-8"
    );
    const { data: frontMatter, content } = matter(markdownFile);

    return {
      frontMatter,
      slug,
      content,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return notFound();
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params);
  const title = post.frontMatter.title;
  const description = post.frontMatter.description;

  return {
    title: title,
    description: description,
    // add other metadata fields as needed
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("data/posts"));
  const params = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
  return params;
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const props = await getPost(params);

  const components = {
    pre: Code,
    YouTube,
  };

  return (
    <article className="mdx ">
      <h1>{props.frontMatter.title}</h1>
      <MDXRemote source={props.content} components={components} />
    </article>
  );
}
