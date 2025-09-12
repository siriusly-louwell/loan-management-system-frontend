import { Save, CheckCircle } from "lucide-react";
import SmallSpin from "./../loading components/SmallSpin";
import { useState } from "react";

export default function SaveButton({ trigger }) {
  const [color, setColor] = useState("rose");
  const [icon, setIcon] = useState(<Save size={18} />);

  function saving() {
    trigger();
    
    setIcon(<SmallSpin size={20} />);
    setColor("pink");

    setTimeout(() => {
      setColor("green");
      setIcon(<CheckCircle size={18} />);
    }, 2000);
  }

  return (
    <button
      type="button"
      onClick={saving}
      className={`flex items-center font-medium gap-2 rounded-lg bg-${color}-200 border border-${color}-600 px-3 py-1 text-${color}-700 hover:bg-${color}-300 active:scale-95 transition`}>
      {icon}
      <span>Save Draft</span>
    </button>
  );
}
