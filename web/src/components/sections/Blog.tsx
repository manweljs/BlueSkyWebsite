"use client";
// import { ArticleList, CoreProvider } from 'bsblog'
import React from 'react'
import dynamic from 'next/dynamic';
import { appId } from '@/consts';


const CoreProvider = dynamic(() => import('bsblog').then((mod) => mod.CoreProvider), { ssr: false })
const ArticleList = dynamic(() => import('bsblog').then((mod) => mod.ArticleList), { ssr: false })

export function Blog() {
    return (
        <CoreProvider
            appId={appId}
        >
            <ArticleList
                openInNewTab
            // onArticleClick={(article) => {
            //     console.log('article', article)
            //     return false
            // }}
            />
        </CoreProvider>
    )
}
