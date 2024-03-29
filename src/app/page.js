import Hero from './../components/layout/Hero';
import HomeMenu from './../components/layout/HomeMenu';
import SectionHeaders from './../components/layout/SectionHeaders';
import Left from './../components/icons/Left';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={'Our story'} mainHeader={'About us'} />


        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 my-5">

          <div className="col-span-1">
            <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
              <div className='flex justify-center  flex items-center gap-2'>
                <h3 className="text-primary text-2xl">
                  أرقى سلسلة مطاعم وكافيهات في بني سويف
                </h3>
                <Left />
              </div>
              <div className='flex justify-center  flex items-center gap-2'>
                <h3 className="text-primary text-2xl">
                  لاميرا كورنيش النيل - بجوار مطعم برانشز
                </h3>
                <Left />
              </div>
              <div className='flex justify-center flex items-center gap-2'>
                <h3 className="text-primary text-2xl">
                لاميرا شرق النيل - امام كليه تعليم صناعي
                </h3>
                <Left />
              </div>

            </div>
          </div>
          <div className="col-span-1">
        <Image src="/4.png" alt="Image 1" width={400} height={200} />
      </div>
        </div>

      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
            +20 1010003323
          </a>
        </div>
      </section>
    </>
  )
}
