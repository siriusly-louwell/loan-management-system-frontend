import { useDispatch, useSelector } from "react-redux";
import PopAnimate from "../animations/popAnimate";
import CloseBttn from "../buttons/CloseBttn";
import { toggleModal } from "../../services/redux/slices/uiSlice";

export default function ImageModal() {
  const dispatch = useDispatch();
  const { imgPreview, modals } = useSelector((state) => state.ui);

  return (
    <PopAnimate
      modalName={modals.previewModal}
      classStyle="relative w-full h-auto max-w-4xl max-h-full">
      <div className="relative flex flex-col shadow">
        <div className="self-end mt-1">
          <CloseBttn
            trigger={() =>
              dispatch(
                toggleModal({
                  name: "previewModal",
                  value: modals.previewModal,
                })
              )
            }
          />
        </div>
        <section className="px-10">
          <img
            src={imgPreview}
            alt="unit preview"
            className="rounded-2xl border border-gray-300"
          />
        </section>
      </div>
    </PopAnimate>
  );
}
