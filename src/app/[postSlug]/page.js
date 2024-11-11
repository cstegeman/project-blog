import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import {loadBlogPost} from "@/helpers/file-helpers";
import {MDXRemote} from "next-mdx-remote/rsc";

async function BlogPost({params}) {
    const {postSlug} = params;
    const post = await loadBlogPost(postSlug);
    const {frontmatter, content} = post;

    return (
        <article className={styles.wrapper}>
            <BlogHero
                title={frontmatter.title}
                publishedOn={frontmatter.publishedOn}
            />
            <div className={styles.page}>
                {content && <MDXRemote source={content} />}
            </div>
        </article>
    );
}

export default BlogPost;
