import { useEffect } from "react";
import AddtoCartBttn from "../components/buttons/AddtoCartBttn";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import EMICalculator from "./EMICalculator";
import ColorLabel from "../components/ColorLabel";
import SmallLabel from "../components/texts/SmallLabel";
import SmallSpin from "../components/loading components/SmallSpin";
import ImageSkeleton from "../components/loading components/ImageSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnit } from "../services/redux/slices/unitSlice";
import { UnitEntity } from "../services/entities/Unit";
import { UnitSpecsEntity } from "../services/entities/UnitSpecs";
import {
  setPreview,
  toggleModal,
  toggleSlide,
} from "../services/redux/slices/uiSlice";
import BasicCarousel from "../components/cards/BasicCarousel";
import { SPECS } from "../constants/motorSpecs";
import ImageModal from "../components/modals/ImageModal";

export default function ProductInfo({ staff = false }) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);
  const { unitId, unitLoading, images } = useSelector((state) => state.unit);
  const unit = useSelector(UnitEntity);
  const specs = useSelector(UnitSpecsEntity);

  useEffect(() => {
    dispatch(fetchUnit());
  }, [unitId, dispatch]);

  return (
    <section className="pb-6 bg-gray-100 md:pb-10 md:pt-2 dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl mt-10 px-4 pb-6 mx-auto 2xl:px-0">
        {/* <BasicTabs ids={selected} state={id} setId={setId} load={unitLoading} /> */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-15 xl:gap-16">
          {
            <>
              <section className="flex flex-col space-y-2">
                <div className="relative w-full h-[70vh] max-h-[70vh] space-y-4 lg:max-w-3xl mx-auto rounded-xl overflow-hidden">
                  <BasicCarousel
                    length={images.filter((f) => f.type === "color").length}>
                    {unitLoading ? (
                      //   <div className="w-full h-10 bg-gray-200 dark:bg-gray-500 animate-pulse rounded-md"></div>
                      <div className="flex justify-center items-center w-full h-full">
                        <ImageSkeleton />
                      </div>
                    ) : (
                      images
                        .filter((f) => f.type === "color")
                        .map((src, i) => (
                          <img
                            key={i}
                            src={src.url}
                            alt={`Slide ${i + 1}`}
                            className="w-full h-full object-contain flex-shrink-0 rounded-xl bg-gray-200 dark:bg-gray-600"
                          />
                        ))
                    )}
                  </BasicCarousel>
                </div>
                <section className="flex w-full space-x-2 overflow-x-auto rounded-lg">
                  {images
                    .filter((f) => f.type === "angle")
                    .map((img, i) => (
                      <img
                        key={i}
                        src={img.url}
                        alt="angle"
                        onClick={() => {
                          dispatch(setPreview(img.url));
                          dispatch(
                            toggleModal({
                              name: "previewModal",
                              value: modals?.previewModal,
                            })
                          );
                        }}
                        className="object-contain max-w-[20vh] max-h-[10vh] rounded-lg cursor-pointer hover:opacity-80"
                      />
                    ))}
                </section>
              </section>

              <div className="mt-6 sm:mt-8 lg:mt-0">
                {unitLoading ? (
                  <div className="h-5 bg-gray-200 dark:bg-gray-500 rounded-full animate-pulse w-60 mb-4"></div>
                ) : (
                  <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    {unit.name} ({unit.brand})
                  </h1>
                )}

                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  {unitLoading ? (
                    <p className="h-8 bg-gray-200 dark:bg-gray-500 rounded-full animate-pulse w-40 mb-4"></p>
                  ) : (
                    <p className="text-2xl font-extrabold text-rose-600 sm:text-3xl dark:text-rose-500">
                      ₱{parseFloat(unit.price).toLocaleString()}
                    </p>
                  )}
                  <div className="flex space-x-2">
                    <div className="grid grid-cols-10 gap-y-2">
                      {!unitLoading &&
                        unit.colors.map((color, i) => (
                          <div key={i}>
                            <label htmlFor={`${i}_${color.color}`}>
                              <ColorLabel key={i} style={color.color} />
                            </label>
                            <input
                              type="button"
                              id={`${i}_${color.color}`}
                              className="hidden"
                              onClick={() => {
                                dispatch(toggleSlide({ value: i }));
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2">
                  <SmallLabel
                    label="Annual Interest"
                    text={
                      unitLoading ? (
                        <SmallSpin size={20} />
                      ) : (
                        `${unit.interest}%`
                      )
                    }
                  />
                  <SmallLabel
                    label="Rebate"
                    text={
                      unitLoading ? (
                        <SmallSpin size={20} />
                      ) : (
                        `₱${parseFloat(unit.rebate).toLocaleString()}`
                      )
                    }
                  />
                  <SmallLabel
                    label="Loan Tenure"
                    text={
                      unitLoading ? (
                        <SmallSpin size={20} />
                      ) : (
                        `${unit.tenure} years`
                      )
                    }
                  />
                  <SmallLabel
                    label="Stock"
                    text={
                      unitLoading ? (
                        <SmallSpin size={20} />
                      ) : (
                        `${unit.quantity} units`
                      )
                    }
                  />
                </div>

                <div className="mt-6 sm:gap-4 space-y-2 sm:items-center sm:flex sm:mt-8">
                  <BttnwithIcon text="Add to favorites">
                    <svg
                      className="w-5 h-5 -ms-2 me-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                      />
                    </svg>
                  </BttnwithIcon>
                  <AddtoCartBttn
                    text="Apply Loan"
                    // state={{ selected: selected, selectColor: selectColor }}
                    url="/customer/apply"
                  />
                  <AddtoCartBttn text="Pay in Cash" />
                </div>
                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
                <div className="mb-6 text-gray-500 dark:text-gray-400">
                  {unitLoading ? (
                    <>
                      <div className="w-full flex justify-between items-start animate-pulse">
                        <div className="block">
                          <div className="h-3 bg-gray-300 dark:bg-gray-500 rounded-full  w-48 mb-4"></div>
                          <p className="h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-32 mb-2.5"></p>
                        </div>
                        <span className="h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-16 "></span>
                      </div>
                      <div className=" w-full flex justify-between items-start animate-pulse">
                        <div className="block">
                          <div className="h-3 bg-gray-300 dark:bg-gray-500 rounded-full  w-60 mb-4"></div>
                          <div className="h-3 bg-gray-300 dark:bg-gray-500 rounded-full  w-58 mb-4"></div>
                          <p className="h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-40 mb-2.5"></p>
                          <p className="h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-50 mb-2.5"></p>
                          <p className="h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-50 mb-2.5"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    `${unit.description}`
                  )}
                </div>
              </div>

              <section className="max-w-5xl col-span-2 mx-auto px-4 py-8">
                <h2 className="text-2xl dark:text-white font-bold mb-6">
                  Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-4 gap-x-7">
                  {Object.entries(specs)
                    .filter(([key]) => key !== "images" && key !== "id")
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-200 dark:bg-gray-900/50 p-4 shadow-sm hover:shadow-md transition">
                        <p className="text-sm text-gray-700 dark:text-gray-400">
                          {SPECS[key]}
                        </p>
                        <p className="text-lg font-semibold dark:text-gray-100">
                          {value || "—"}
                        </p>
                      </div>
                    ))}
                </div>
              </section>
            </>
          }
        </div>
      </div>
      <EMICalculator
        name={unit.name}
        brand={unit.brand}
        motorPrice={unit.price}
        years={unit.tenure}
        down={unit.downpayment}
        interest={unit.interest}
        staff={staff}
        load={unitLoading}
      />

      <ImageModal />
    </section>
  );
}
