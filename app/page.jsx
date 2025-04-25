'use client'

import Banner from '@/components/Banner'
import ProductCard from '@/components/FlashDeals/Card'
import NewArrivalProducts from '@/components/NewArrivals/NewArrivalProducts'
import TopCategoriesCard from '@/components/TopCategories/TopCategoriesProducts'

export default function Home() {
  return (
    <>
      <Banner />
      <ProductCard />
      <TopCategoriesCard/>
      <NewArrivalProducts/>
    </>
  )
}