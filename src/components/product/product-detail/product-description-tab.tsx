import { useState } from "react";
import { Tab } from "@headlessui/react";

export type IProps = {
  description?: string;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const ProductDescriptionTab = ({ description }: IProps) => {
  let [tabHeading] = useState({
    Product_Details: "",
    Review_Rating: "",
  });

  return (
    <div className="w-full xl:px-2 py-11 lg:py-14 xl:py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="block border-b border-border-base">
          {Object.keys(tabHeading).map((item) => (
            <Tab
              key={item}
              className={({ selected }) =>
                classNames(
                  "relative inline-block transition-all text-15px lg:text-17px leading-5 text-brand-dark focus:outline-none pb-3 lg:pb-5 hover:text-brand ltr:mr-8 rtl:ml-8",
                  selected
                    ? "font-semibold after:absolute after:w-full after:h-0.5 after:bottom-0 after:translate-y-[1px] after:ltr:left-0 after:rtl:right-0 after:bg-skin-primary"
                    : ""
                )
              }
            >
              {item.split("_").join(" ")}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6 lg:mt-9">
          <Tab.Panel className="lg:flex">
            {description && (
              <div
                className=" product-detailed-page text-sm sm:text-15px text-skin-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}

            {/* <div className="flex-shrink-0 lg:w-[400px] xl:w-[480px] 2xl:w-[550px] 3xl:w-[680px] lg:pl-10 xl:pl-14 2xl:pl-20 pt-5 lg:pt-0">
              <Heading
                variant="mediumHeading"
                className="xl:text-lg mb-4 pt-0.5"
              >
                Nutrition Facts
              </Heading>
              <div className="border border-skin-four rounded">
                <table className="w-full text-skin-base text-15px">
                  <thead>
                    <tr className="border-b border-skin-four">
                      <th className="px-4 lg:px-5 xl:px-6 pt-3 pb-4 lg:pb-6 text-start text-sm lg:text-15px xl:text-base font-medium">
                        Amount per serving
                        <span className="block font-semibold text-lg lg:text-xl xl:text-2xl pt-0.5">
                          Calories
                        </span>
                      </th>
                      <th className="border-s border-skin-four px-4 lg:px-5 xl:px-6 pt-3 pb-5 text-end w-24 lg:w-28 xl:w-36 font-semibold text-2xl lg:text-3xl xl:text-[36px]">
                        70
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b font-normal border-skin-four last:border-b-0">
                      <td className="px-4 lg:px-5 xl:px-6 py-3">
                        Total Fat 5g
                      </td>
                      <td className="border-s border-skin-four px-4 lg:px-5 xl:px-6 py-3 text-end w-24 lg:w-28 xl:w-36">
                        6%
                      </td>
                    </tr>
                    <tr className="border-b font-normal border-skin-four last:border-b-0">
                      <td className="px-4 lg:px-5 xl:px-6 py-3">
                        Cholesterol 185mg
                      </td>
                      <td className="border-s border-skin-four px-4 lg:px-5 xl:px-6 py-3 text-end w-24 lg:w-28 xl:w-36">
                        62%
                      </td>
                    </tr>
                    <tr className="border-b font-normal border-skin-four last:border-b-0">
                      <td className="px-4 lg:px-5 xl:px-6 py-3">Sodium 70mg</td>
                      <td className="border-s border-skin-four px-4 lg:px-5 xl:px-6 py-3 text-end w-24 lg:w-28 xl:w-36">
                        49%
                      </td>
                    </tr>
                    <tr className="border-b font-normal border-skin-four last:border-b-0">
                      <td className="px-4 lg:px-5 xl:px-6 py-3">
                        Total Carbohydrate 0g
                      </td>
                      <td className="border-s border-skin-four px-4 lg:px-5 xl:px-6 py-3 text-end w-24 lg:w-28 xl:w-36">
                        18%
                      </td>
                    </tr>
                    <tr className="border-b font-normal border-skin-four last:border-b-0">
                      <td className="px-4 lg:px-5 xl:px-6 py-3">Protein 6g</td>
                      <td className="border-s border-skin-four px-4 lg:px-5 xl:px-6 py-3 text-end w-24 lg:w-28 xl:w-36">
                        35%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
          </Tab.Panel>
          {/* <Tab.Panel>
            <ProductReviewRating />
          </Tab.Panel> */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProductDescriptionTab;
