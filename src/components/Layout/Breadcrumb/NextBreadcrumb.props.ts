import {BreadcrumbProps} from '@chakra-ui/react'

export interface IBreadcrumbLink {
    title: string,
    href: string

}

export interface NextBreadcrumbProps extends BreadcrumbProps {
    breadcrumbItem: [IBreadcrumbLink]
}
