import { EXPLORE, FEED, MESSAGE, PROFILE } from '@/constants/menu.constants';
import { useAppSelector } from '@/hooks/typeHooks';
import { sidebarMenus } from '@/static/sidebarMenus';
import { useRouter } from 'next/navigation';
import { AiOutlineHome, AiOutlineMessage, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
const FooterMenuIcons = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const icons = sidebarMenus.map((menu) => {
    switch (menu.text) {
      case FEED:
        return <AiOutlineHome size={30} menu={menu} />;
      case EXPLORE:
        return <AiOutlineSearch size={30} menu={menu} />;
      case PROFILE:
        return <AiOutlineUser size={30} menu={menu} />;
      case MESSAGE:
        return <AiOutlineMessage size={30} menu={menu} />;

      default:
        break;
    }
  });

  const navigate = (e: { path: string; text: string }) => {
    if (e.text === PROFILE) {
      router.push(`${e.path}/${user?._id}`);
      return;
    }
    router.push(e.path);
  };

  return (
    <div className="flex justify-around">
      {icons.map((icon, index) => {
        return (
          <div key={index} onClick={() => navigate(icon?.props.menu)}>
            {icon}
          </div>
        );
      })}
    </div>
  );
};

export default FooterMenuIcons;
