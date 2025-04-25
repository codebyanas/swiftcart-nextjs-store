'use client'

import Banner from '@/components/Banner'
import BigDiscount from '@/components/BigDiscount/BigDiscount'
import ProductCard from '@/components/FlashDeals/Card'
import NewArrivalProducts from '@/components/NewArrivals/NewArrivalProducts'
import Services from '@/components/Services/Services'
import TopCategoriesCard from '@/components/TopCategories/TopCategoriesProducts'

export default function Home() {
  return (
    <>
      <Banner />
      <ProductCard />
      <TopCategoriesCard />
      <NewArrivalProducts />
      <BigDiscount />
      <Services />
    </>
  )
}