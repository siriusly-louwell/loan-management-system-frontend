import { useDispatch, useSelector } from "react-redux";
import PopAnimate from "../animations/popAnimate";
import CloseBttn from "../buttons/CloseBttn";
import { toggleModal } from "../../services/redux/slices/uiSlice";

export default function ImageModal() {
  const dispatch = useDispatch();
  const { imgPreview, modals } = useSelector((state) => state.ui);

  return (
    <div className="fixed top-0 flex items-center justify-center left-0 right-0 z-40 p-20 bg-gray-400 dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-40 justify-items-center items-center overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <PopAnimate>
        <div className="relative w-full h-auto max-w-4xl max-h-full">
          <div className="relative flex flex-col shadow">
            <div className="self-end mt-1">
              <CloseBttn
                trigger={() =>
                  dispatch(
                    toggleModal({
                      name: "previewModal",
                      value: modals?.previewModal,
                    })
                  )
                }
              />
            </div>
            <section className="px-10">
              <img src={imgPreview} alt="unit preview" className="rounded-2xl border border-gray-300" />
            </section>
          </div>
        </div>
      </PopAnimate>
    </div>
  );
}
