import React, {useMemo} from 'react'
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Text} from '@chakra-ui/react'
import NextLink from 'next/link'
import {AppRoute, TextRoute} from '../../../interfaces/const'
import {useRouter} from 'next/router'
import translate from '../../../interfaces/breadcumbTranslate'

export interface ICrumb {
    text?: string,
    href: string,
    last: boolean
}

const Crumb = ({text, href, last = false}: ICrumb) => {
    if (last) {
        return (
            <BreadcrumbItem color="rgb(126, 126, 126)">
                <BreadcrumbLink>{translate(text)}</BreadcrumbLink>
            </BreadcrumbItem>
        )
    }

    return (
        <>
            <BreadcrumbItem>
                <NextLink href={href}>
                    <BreadcrumbLink>{text}</BreadcrumbLink>
                </NextLink>
                <Text as="span" marginInline="0.5rem">/</Text>
            </BreadcrumbItem>
        </>
    )

}

const NextBreadcrumb = (): JSX.Element => {
    const router = useRouter()


    const breadcrumbs = useMemo(function generateBreadcrumbs() {
        const asPathWithoutQuery = router.asPath.split('?')[0]
        const asPathNestedRoutes = asPathWithoutQuery.split('/')
            .filter(v => v.length > 0)

        const crumblist = asPathNestedRoutes.map((subpath, idx) => {
            const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/')
            const text = subpath
            return {href, text}
        })

        return [{href: AppRoute.Root, text: TextRoute.root}, ...crumblist]

    }, [router.asPath])

    return (
        <Breadcrumb color="#555555" fontSize={15}>
            {breadcrumbs.map((crumb, idx) => (
                <Crumb key={idx} {...crumb} last={idx === breadcrumbs.length - 1}/>

            ))
            }
        </Breadcrumb>
    )
}

export default NextBreadcrumb

