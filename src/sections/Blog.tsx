/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { BlogData } from '../types';
import { BlogSkeleton } from '../components/Skeleton';
import { Icon } from '../components/Icon';

export function Blog() {
  const { data: bPosts, loading } = useGoogleSheet<BlogData[]>('BLOGS');

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 font-mono">
            Latest Publications
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 font-sans">
            Founder Field Notes: Delegation & Growth
          </h2>
          <p className="text-md text-slate-500 dark:text-slate-400">
            Actionable strategies, tool tutorials, and organization guides targeted at helping remote business owners reclaim their attention.
          </p>
        </div>

        {/* Dynamic Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bPosts?.map((post, idx) => {
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:bg-slate-50/10 dark:hover:bg-slate-800/80 shadow-xs hover:shadow-md overflow-hidden flex flex-col justify-between group h-full hover:-translate-y-1 transition-all text-left"
              >
                {/* Thumbnail Header */}
                <div className="h-44 sm:h-52 w-full relative overflow-hidden bg-slate-105 flex-shrink-0">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-all duration-550"
                  />
                  
                  {/* Calendar Indicator Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 px-3 py-1.5 rounded-xl flex items-center space-x-1.5 backdrop-blur-md border border-slate-100/30 shadow-xs">
                    <Icon name="calendar-days" className="text-blue-600 dark:text-sky-400" size={13} />
                    <span className="text-[11px] font-bold font-mono tracking-wide">
                      {post.publishDate}
                    </span>
                  </div>
                </div>

                {/* Details list */}
                <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-md sm:text-lg font-bold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-all font-sans leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read More button */}
                  <div className="pt-2">
                    <a
                      href={post.readMoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-xl transition-all"
                    >
                      <span>Read Full Article</span>
                      <Icon name="external-link" size={13} />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
