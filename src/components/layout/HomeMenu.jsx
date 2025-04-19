'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";

export default function HomeMenu() {
  
  return (
    <section className="">
      <div className="absolute hidden sm:block left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={'/sallad1.png'} width={109} height={189}  alt={'sallad'} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'} />
        </div>
      </div>
      <div className="text-center my-6">
        <SectionHeaders
          subHeader={''}
          mainHeader={'شاورما الامير'} />

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      <div className="col-span-1 p-3 ">
        <Image className="rounded-lg shadow-md" src="/44.jpg" alt="Image 1" width={300} height={200} />
      </div>
      <div className="col-span-1 p-3 ">
        <Image className="rounded-lg shadow-md" src="/55.jpg" alt="Image 2" width={300} height={200} />
      </div>
      <div className="col-span-1 p-3 ">
        <Image className="rounded-lg shadow-md" src="/33.jpg" alt="Image 3" width={300} height={200} />
      </div>
    </div>
      <div className="text-center my-6">
        <SectionHeaders
          subHeader={''}
          mainHeader={'جزء من الوجبات'} />

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      <div className="col-span-1 p-3 ">
        <Image className="rounded-lg shadow-md" src="/2.jpg" alt="Image 1" width={300} height={200} />
      </div>
      <div className="col-span-1 p-3 ">
        <Image className="rounded-lg shadow-md" src="/22.jpg" alt="Image 2" width={300} height={200} />
      </div>
      <div className="col-span-1 p-3 ">
        <Image className="rounded-lg shadow-md" src="/11.jpg" alt="Image 3" width={300} height={200} />
      </div>
      <div className="col-span-1 p-3 ">
        <Image className="rounded-lg shadow-md" src="/5.jpg" alt="Image 3" width={300} height={200} />
      </div>
      <div className="col-span-1 p-3 ">
        <Image className="rounded-lg shadow-md" src="/66.jpg" alt="Image 3" width={300} height={200} />
      </div>
      <div className="col-span-1 p-3 ">
        <Image className="rounded-lg shadow-md" src="/6.jpg" alt="Image 3" width={300} height={200} />
      </div>
    </div>


  
    </section>
  );
}