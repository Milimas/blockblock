import { Breadcrumbs } from "@/components/breadcrumbs"

type Props = {
    params: {
      catchAll: string[]
    }
  }
  export default async function BreadcrumbsSlot({params}: Props) {
    const catchAll = (await params).catchAll
    // console.log("rendering in @breadcrumbs", catchAll)
    return <Breadcrumbs routes={catchAll} />
  }