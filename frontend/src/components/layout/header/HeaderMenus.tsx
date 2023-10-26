import Image from 'next/image';

const HeaderMenus = () => {
  return (
    <div className="flex justify-center items-center gap-2 text-white cursor-pointer">
      <div>
        <Image
          src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-glyph-black-icon-png-image_691589.jpg"
          width={40}
          height={40}
          className="rounded-full"
          alt="profile"
        />
      </div>
      <div className="hidden md:block">Shubham H</div>

      {/* Todo: change this icon  */}
      {/* <div>V</div> */}
    </div>
  );
};

export default HeaderMenus;
