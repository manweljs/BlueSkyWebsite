// import Article from '@/components/pages/Article'
import React from 'react'
import dynamic from 'next/dynamic'
import "bsblog/dist/style.css"
import { Metadata, ResolvingMetadata } from 'next'
import { appId, BSBLOG_API_URL } from '@/consts'

const Article: React.ComponentType<any> = dynamic(() => import('./Article')
    .then(mod => mod.Article), { ssr: false })

export default function page(props: { params: { slug: string } }) {
    const { slug } = props.params
    const PRIVATE_KEY = process.env.BSBLOG_PRIVATE_KEY
    return (
        <Article slug={slug} PRIVATE_KEY={PRIVATE_KEY} />
    )
}

const getArticle = async (slug: string) => {
    const endpoint = `${BSBLOG_API_URL}/api/Article/Share/GetArticleBySlug?app_id=${appId}&slug=${slug}&encrypt=false`
    try {
        const response = await fetch(endpoint, { method: 'GET' })
        const result = await response.json()
        if (result.success) {
            // console.log('result.data', result.data)
            return result.data
        } else {
            console.log('result', result)
            return null
        }
    } catch (error) {
        return null
    }
}


type Props = {
    params: {
        slug: string
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const slug = params.slug
    try {
        const article = await getArticle(slug)
        return {
            title: article.title,
            description: article.meta_description,
            keywords: article.tags,
            openGraph: {
                images: [article.image],
            },
        }

    } catch (error) {
        return {}
    }

}