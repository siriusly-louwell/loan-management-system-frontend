import { Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { draftForm } from "../../services/redux/slices/formSlice";
import { savePageNum, setAlert } from "../../services/redux/slices/uiSlice";
import { UserEntity } from "../../services/entities/User";
import { FORM_ROUTES } from "../../constants/formRoutes";

export default function EmailDraftButton({ to }) {
  const dispatch = useDispatch();
  const { pageNum } = useSelector((state) => state.ui);
  const user = useSelector(UserEntity);
  const [busy, setBusy] = useState(false);

  const resumePath = useMemo(() => {
    const index = Number.isInteger(pageNum) ? Math.max(pageNum, 1) : 1;
    return FORM_ROUTES[index] || FORM_ROUTES[1];
  }, [pageNum]);

  function openEmailClient() {
    const origin = window.location.origin;
    const url = `${origin}${resumePath}`;
    const mailTo = (to || user?.email || "").trim();
    const subject = encodeURIComponent("Your loan application draft link");
    const body = encodeURIComponent(
      `Hi,\n\nYou can resume your loan application here: ${url}\n\nIf the link doesn't work, copy and paste it into your browser.\n\nThank you!`
    );

    // Try copying to clipboard for convenience
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }

    window.location.href = `mailto:${mailTo}?subject=${subject}&body=${body}`;
  }

  async function handleClick() {
    if (busy) return;
    setBusy(true);

    try {
      dispatch(draftForm());
      if (Number.isInteger(pageNum)) dispatch(savePageNum(pageNum));

      dispatch(
        setAlert({
          message: "Draft saved. Opening your email client...",
          type: "info",
        })
      );

      openEmailClient();
    } finally {
      setTimeout(() => setBusy(false), 1200);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center font-medium gap-2 rounded-lg bg-blue-200 border border-blue-600 px-3 py-1 text-blue-700 hover:bg-blue-300 active:scale-95 transition disabled:opacity-60`}
      disabled={busy}
      title="Save draft and email the resume link"
    >
      <Mail size={18} />
      <span>{busy ? "Preparing..." : "Email Draft Link"}</span>
    </button>
  );
}
