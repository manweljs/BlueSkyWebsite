"use client"
import { useUserContext } from '@/hooks/UserContext'
// import { ArticleDetail, CoreProvider } from 'bsblog'
import React from 'react'
import dynamic from 'next/dynamic'
import { appId } from '@/consts';

const ArticleDetail = dynamic(() => import('bsblog').then((mod) => mod.ArticleDetail), { ssr: false });
const CoreProvider = dynamic(() => import('bsblog').then((mod) => mod.CoreProvider), { ssr: false });


export function Article(props: {
  slug: string
  PRIVATE_KEY: string
}) {
  const { slug, PRIVATE_KEY } = props
  const { navigate } = useUserContext()

  return (
    <CoreProvider
      navigate={navigate}
      navbarHeight={80}
      appId={appId}

    >
      <ArticleDetail
        slug={slug}
        privateKey={PRIVATE_KEY}
      />
    </CoreProvider>
  )
}


