import Link from "@components/ui/link";

interface Props {
  className?: string;
  links: {
    id: number;
    path?: string;
    title: string;
  }[];
}

const FooterLink: React.FC<Props> = ({ className, links }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center mb-1">
      {links.map((link, index) => (
        <div key={index} className="mx-4 mb-2 lg:mb-0 py-2 ">
          <Link
            href={link.path ? link.path : "/"}
            className="transition-colors duration-200 text-[14px] font-medium hover:text-rose-600 "
          >
            {link.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FooterLink;
