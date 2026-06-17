/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  key?: any;
}

export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-md ${className}`}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 shadow-sm flex flex-col space-y-4">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="h-6 w-3/4 rounded" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
      </div>
      <div className="pt-2">
        <Skeleton className="h-5 w-1/3 rounded" />
      </div>
    </div>
  );
}

export function PortfolioSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 shadow-sm overflow-hidden flex flex-col">
      <Skeleton className="h-48 md:h-56 w-full" />
      <div className="p-6 flex flex-col space-y-4 flex-1">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <div className="flex gap-2 flex-wrap pt-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <Skeleton className="h-5 w-1/2 rounded" />
        </div>
      </div>
    </div>
  );
}

export function BlogSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 shadow-sm overflow-hidden flex flex-col">
      <Skeleton className="h-44 w-full" />
      <div className="p-5 flex flex-col space-y-3 flex-grow">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-5 w-5/6 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
        <div className="pt-2">
          <Skeleton className="h-8 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Skeleton className="h-4 w-32 mx-auto rounded" />
        <Skeleton className="h-10 w-3/4 mx-auto rounded" />
        <Skeleton className="h-4 w-2/3 mx-auto rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}
