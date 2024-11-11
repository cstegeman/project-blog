import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import {loadBlogPost} from "@/helpers/file-helpers";
import {MDXRemote} from "next-mdx-remote/rsc";
import {BLOG_TITLE} from "@/constants";

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
                {content && <MDXRemote source={content}/>}
            </div>
        </article>
    );
}

export default BlogPost;
