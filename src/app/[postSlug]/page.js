import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import {loadBlogPost} from "@/helpers/file-helpers";
import {MDXRemote} from "next-mdx-remote/rsc";
import {BLOG_TITLE} from "@/constants";
import CodeSnippet from "@/components/CodeSnippet";
import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";

const DivisionGroupsDemo = dynamic(
    () => import('@/components/DivisionGroupsDemo'),
    { loading: Spinner }
);

const getBlogPost = React.cache(async (slug) => {
    return await loadBlogPost(slug);
});

export async function generateMetadata({params}) {
    const {postSlug} = params;
    const post = await getBlogPost(postSlug);
    const {frontmatter: {title, abstract}} = post;

    return {
        title: `${title} • ${BLOG_TITLE}`,
        description: abstract,
    }
}

const components = {
    pre: (props) => (
        <CodeSnippet {...props}>
            {props.children}
        </CodeSnippet>
    ),
}


async function BlogPost({params}) {
    const {postSlug} = params;
    const post = await getBlogPost(postSlug);
    const {frontmatter, content} = post;

    return (
        <article className={styles.wrapper}>
            <BlogHero
                title={frontmatter.title}
                publishedOn={frontmatter.publishedOn}
            />
            <div className={styles.page}>
                {content && <MDXRemote source={content} components={{ ...components, DivisionGroupsDemo }}/>}
            </div>
        </article>
    );
}

export default BlogPost;
