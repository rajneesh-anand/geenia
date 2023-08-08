import Link from "@components/ui/link";
import cn from "classnames";

interface MenuProps {
  data: any;
  className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
  return (
    <ul
      className={cn(
        "hidden lg:flex lg:justify-center lg:items-center",
        className
      )}
    >
      {data?.map((item: any, idx: any) => (
        <li
          key={idx}
          className="hoverable hover:bg-skin-purple hover:text-white"
        >
          <Link
            href={item.path}
            className="relative block py-4 px-4 text-[13px] uppercase font-nunito font-semibold hover:bg-skin-purple hover:text-white"
          >
            {item.label}
          </Link>

          {item.subMenu ? (
            item.megaMenu ? (
              <div
                role="toggle"
                className="p-3 mega-menu mb-8 sm:mb-0 shadow-xl bg-skin-purple"
              >
                <div className="container mx-auto w-full flex flex-wrap justify-between mx-2">
                  <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                    {item.subMenuGroup1 &&
                      item.subMenuGroup1.map((itm: any, idx: any) => (
                        <li key={idx}>
                          <Link
                            href={itm.path}
                            className="block p-3 hover:bg-skin-purple-dark text-white"
                          >
                            {itm.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                    {item.subMenuGroup2 &&
                      item.subMenuGroup2.map((itm: any, idx: any) => (
                        <li key={idx}>
                          <Link
                            href={itm.path}
                            className="block p-3 hover:bg-skin-purple-dark text-white"
                          >
                            {itm.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                    {item.subMenuGroup3 &&
                      item.subMenuGroup3.map((itm: any, idx: any) => (
                        <li key={idx}>
                          <Link
                            href={itm.path}
                            className="block p-3 hover:bg-skin-purple-dark text-white"
                          >
                            {itm.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 pb-6 pt-6 lg:pt-3">
                    <p className="font-medium  text-sm text-white font-nunito mb-2">
                      Best Seller
                    </p>
                    <li className="pt-3">
                      <img src="https://www.dropbox.com/s/prow2ar08z3ynd7/Face%20Gel_00003.jpg?raw=1" />
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div
                role="toggle"
                className="p-3 mega-menu-mini mb-16 sm:mb-0 shadow-xl bg-skin-purple"
              >
                <div className="container mx-auto w-full flex flex-wrap justify-between mx-1">
                  <ul className="w-full ">
                    {item.subMenuGroup1 &&
                      item.subMenuGroup1.map((itm: any, idx: any) => (
                        <li key={idx}>
                          <Link
                            href={itm.path}
                            className="block p-3 hover:bg-skin-purple-dark text-white"
                          >
                            {itm.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default HeaderMenu;
