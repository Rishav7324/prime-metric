import Image from 'next/image';
import Link from 'next/link';

const AdsterraBanner = () => {
  return (
    <div className="my-8 text-center">
      <Link href="https://beta.publishers.adsterra.com/referral/Mp9pQXYdAp" rel="nofollow" target="_blank">
        <Image 
          alt="banner" 
          src="https://landings-cdn.adsterratech.com/referralBanners/gif/700x90_adsterra_reff.gif" 
          width={700} 
          height={90} 
          unoptimized
        />
      </Link>
    </div>
  );
};

export default AdsterraBanner;
