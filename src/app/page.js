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

          <div className="col-span-1 flex justify-center items-center">
            <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
              <div className='flex justify-center  flex items-center gap-2'>
                <h3 className="text-primary text-2xl">
                كينج البروست في بني سويف

</h3>
                <Left />
              </div>
              <div className='flex justify-center  flex items-center gap-2'>
                <h3 className="text-primary text-2xl">
                بابلو كورنيـش النـيـل - بــجـوار طيبة
                </h3>
                <Left />
              </div>
          

            </div>
          </div>
          <div className="col-span-1  flex justify-center items-center">
        <Image src="/4.png" alt="Image 1" width={300} height={150}  />
      </div>
        </div>

      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+010 04009556">
          010 04009556
          </a>
        </div>
      </section>
    </>
  )
}
