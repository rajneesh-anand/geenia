import Link from "@components/ui/link";
import { FaChevronDown } from "react-icons/fa";
import ListMenu from "@components/ui/list-menu";
import { useTranslation } from "next-i18next";
import cn from "classnames";

interface MenuProps {
  data: any;
  className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
  const { t } = useTranslation("menu");
  return (
    <nav
      className={cn(
        " headerMenu hidden lg:flex lg:justify-center relative ",
        className
      )}
    >
      {data?.map((item: any) => (
        <div
          className={`menuItem group cursor-pointer py-1.5 mx-3 xl:mx-4  ${
            item.subMenu ? "relative" : ""
          }`}
          key={item.id}
        >
          <Link
            href={item.path}
            className="inline-flex uppercase font-nunito font-semibold items-center text-[12px] text-sky-800 py-2  relative group-hover:text-sky-900"
          >
            {t(item.label)}
            {(item?.columns || item.subMenu) && (
              <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-skin-base opacity-40 group-hover:text-skin-primary">
                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
              </span>
            )}
          </Link>

          {item?.subMenu && Array.isArray(item.subMenu) && (
            <div className="subMenu shadow-dropDown z-30 absolute start-0 bg-gray-100 opacity-100 rounded-md">
              <div className="grid grid-cols-2 gap-4 py-8">
                {item.subMenu.map((menu: any, index: number) => {
                  return (
                    <Link
                      href={menu.path}
                      className="pt-2 pl-4 text-[12.5px] font-medium hover:font-semibold hover:text-rose-700"
                    >
                      {t(menu.label)}
                    </Link>
                  );
                })}
              </div>
              {/* <ul className="text-body text-sm py-5">
                {item.subMenu.map((menu: any, index: number) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;
                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.subMenu}
                      menuName={menuName}
                      key={menuName}
                      menuIndex={index}
                    />
                  );
                })}
              </ul> */}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
