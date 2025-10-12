
import HeroCards from '../components/Molecules/HeroCards'

const page = () => {
  return (
    <>
    
    <div className='flex flex-col justify-center h-screen px-6 sm:px-12 md:px-24 lg:px-48 xl:px-60'>
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bguuu5.png')",
        }}
      />
      <HeroCards />
    </div>
    </>
    
  )
}

export default page