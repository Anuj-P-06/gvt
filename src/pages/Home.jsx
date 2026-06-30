import HeroCarousel from '../components/home/HeroCarousel'
import StatsRow from '../components/home/StatsRow'
import WhatWeBuild from '../components/home/WhatWeBuild'
import ComprehensiveServices from '../components/home/ComprehensiveServices'
import ManufacturingShowcase from '../components/home/ManufacturingShowcase'
import GlobalReach from '../components/home/GlobalReach'
import Testimonials from '../components/home/Testimonials'

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <StatsRow />
      <WhatWeBuild />
      <ComprehensiveServices />
      <ManufacturingShowcase />
      <GlobalReach />
      <Testimonials />
    </>
  )
}
