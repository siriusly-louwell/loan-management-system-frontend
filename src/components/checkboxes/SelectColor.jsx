import React from "react";
import ColorLabel from "../ColorLabel";

export default function SelectColor({text, size, colors, changeColor}) {
    return (
        <div className="sm:flex space-x-2 my-5">
            <p className="text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">{text}</p>
            <div className='grid grid-cols-10 lg:grid-cols-9 gap-2 mt-4 sm:mt-0 sm:gap-y-3 sm:gap-x-10'>
                <label htmlFor="#ffb6b9"><ColorLabel style="#ffb6b9" size={size} selected={colors.includes('#ffb6b9') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#ff6b6b"><ColorLabel style="#ff6b6b" size={size} selected={colors.includes('#ff6b6b') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="pink"><ColorLabel style="pink" size={size} selected={colors.includes('pink') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="rose"><ColorLabel style="rose" size={size} selected={colors.includes('rose') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="red"><ColorLabel style="red" size={size} selected={colors.includes('red') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#c41e3a"><ColorLabel style="#c41e3a" size={size} selected={colors.includes('#c41e3a') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#d99058"><ColorLabel style="#d99058" size={size} selected={colors.includes('#d99058') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="orange"><ColorLabel style="orange" size={size} selected={colors.includes('orange') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#ff7f50"><ColorLabel style="#ff7f50" size={size} selected={colors.includes('#ff7f50') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="amber"><ColorLabel style="amber" size={size} selected={colors.includes('amber') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="yellow"><ColorLabel style="yellow" size={size} selected={colors.includes('yellow') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#daa520"><ColorLabel style="#daa520" size={size} selected={colors.includes('#daa520') ? "border-blue-500 border-2" : ""} /></label>

                <label htmlFor="#f4c430"><ColorLabel style="#f4c430" size={size} selected={colors.includes('#f4c430') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#9caf88"><ColorLabel style="#9caf88" size={size} selected={colors.includes('#9caf88') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#98ff98"><ColorLabel style="#98ff98" size={size} selected={colors.includes('#98ff98') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#50c878"><ColorLabel style="#50c878" size={size} selected={colors.includes('#50c878') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="green"><ColorLabel style="green" size={size} selected={colors.includes('green') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="lime"><ColorLabel style="lime" size={size} selected={colors.includes('lime') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#228b22"><ColorLabel style="#228b22" size={size} selected={colors.includes('#228b22') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="emerald"><ColorLabel style="emerald" size={size} selected={colors.includes('emerald') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#2ec4b6"><ColorLabel style="#2ec4b6" size={size} selected={colors.includes('#2ec4b6') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="teal"><ColorLabel style="teal" size={size} selected={colors.includes('teal') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="cyan"><ColorLabel style="cyan" size={size} selected={colors.includes('cyan') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="sky"><ColorLabel style="sky" size={size} selected={colors.includes('sky') ? "border-blue-500 border-2" : ""} /></label>

                <label htmlFor="#4169e1"><ColorLabel style="#4169e1" size={size} selected={colors.includes('#4169e1') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="blue"><ColorLabel style="blue" size={size} selected={colors.includes('blue') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#0077b6"><ColorLabel style="#0077b6" size={size} selected={colors.includes('#0077b6') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#3f72af"><ColorLabel style="#3f72af" size={size} selected={colors.includes('#3f72af') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="indigo"><ColorLabel style="indigo" size={size} selected={colors.includes('indigo') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#6a0dad"><ColorLabel style="#6a0dad" size={size} selected={colors.includes('#6a0dad') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#702963"><ColorLabel style="#702963" size={size} selected={colors.includes('#702963') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#66023c"><ColorLabel style="#66023c" size={size} selected={colors.includes('#66023c') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="violet"><ColorLabel style="violet" size={size} selected={colors.includes('violet') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="purple"><ColorLabel style="purple" size={size} selected={colors.includes('purple') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="fuchsia"><ColorLabel style="fuchsia" size={size} selected={colors.includes('fuchsia') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#cdb4db"><ColorLabel style="#cdb4db" size={size} selected={colors.includes('#cdb4db') ? "border-blue-500 border-2" : ""} /></label>

                <label htmlFor="white"><ColorLabel style="white" size={size} selected={colors.includes('white') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#fffff0"><ColorLabel style="#fffff0" size={size} selected={colors.includes('#fffff0') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#fff5ee"><ColorLabel style="#fff5ee" size={size} selected={colors.includes('#fff5ee') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#fdf5e6"><ColorLabel style="#fdf5e6" size={size} selected={colors.includes('#fdf5e6') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#faf0e6"><ColorLabel style="#faf0e6" size={size} selected={colors.includes('#faf0e6') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#b2beb5"><ColorLabel style="#b2beb5" size={size} selected={colors.includes('#b2beb5') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#8c92ac"><ColorLabel style="#8c92ac" size={size} selected={colors.includes('#8c92ac') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#848482"><ColorLabel style="#848482" size={size} selected={colors.includes('#848482') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#938b78"><ColorLabel style="#938b78" size={size} selected={colors.includes('#938b78') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#98817b"><ColorLabel style="#98817b" size={size} selected={colors.includes('#98817b') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#9f8170"><ColorLabel style="#9f8170" size={size} selected={colors.includes('#9f8170') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#738276"><ColorLabel style="#738276" size={size} selected={colors.includes('#738276') ? "border-blue-500 border-2" : ""} /></label>

                <label htmlFor="#676767"><ColorLabel style="#676767" size={size} selected={colors.includes('#676767') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#4f666a"><ColorLabel style="#4f666a" size={size} selected={colors.includes('#4f666a') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="neutral"><ColorLabel style="neutral" size={size} selected={colors.includes('neutral') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="zinc"><ColorLabel style="zinc" size={size} selected={colors.includes('zinc') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="stone"><ColorLabel style="stone" size={size} selected={colors.includes('stone') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="slate"><ColorLabel style="slate" size={size} selected={colors.includes('slate') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="gray"><ColorLabel style="gray" size={size} selected={colors.includes('gray') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#555555"><ColorLabel style="#555555" size={size} selected={colors.includes('#555555') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#4d5d53"><ColorLabel style="#4d5d53" size={size} selected={colors.includes('#4d5d53') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#954535"><ColorLabel style="#954535" size={size} selected={colors.includes('#954535') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#36454f"><ColorLabel style="#36454f" size={size} selected={colors.includes('#36454f') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#800000"><ColorLabel style="#800000" size={size} selected={colors.includes('#800000') ? "border-blue-500 border-2" : ""} /></label>

                <label htmlFor="#483c32"><ColorLabel style="#483c32" size={size} selected={colors.includes('#483c32') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#65000b"><ColorLabel style="#65000b" size={size} selected={colors.includes('#65000b') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#2a3439"><ColorLabel style="#2a3439" size={size} selected={colors.includes('#2a3439') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#0a1128"><ColorLabel style="#0a1128" size={size} selected={colors.includes('#0a1128') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="black"><ColorLabel style="black" size={size} selected={colors.includes('black') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#7b3f00"><ColorLabel style="#7b3f00" size={size} selected={colors.includes('#7b3f00') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#635147"><ColorLabel style="#635147" size={size} selected={colors.includes('#635147') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#d68a59"><ColorLabel style="#d68a59" size={size} selected={colors.includes('#d68a59') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#80461b"><ColorLabel style="#80461b" size={size} selected={colors.includes('#80461b') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#e97451"><ColorLabel style="#e97451" size={size} selected={colors.includes('#e97451') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#4b3621"><ColorLabel style="#4b3621" size={size} selected={colors.includes('#4b3621') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#5c4033"><ColorLabel style="#5c4033" size={size} selected={colors.includes('#5c4033') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#964b00"><ColorLabel style="#964b00" size={size} selected={colors.includes('#964b00') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#a56b46"><ColorLabel style="#a56b46" size={size} selected={colors.includes('#a56b46') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#3d2b1f"><ColorLabel style="#3d2b1f" size={size} selected={colors.includes('#3d2b1f') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#88421d"><ColorLabel style="#88421d" size={size} selected={colors.includes('#88421d') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#a9746e"><ColorLabel style="#a9746e" size={size} selected={colors.includes('#a9746e') ? "border-blue-500 border-2" : ""} /></label>

                <label htmlFor="#a25f2a"><ColorLabel style="#a25f2a" size={size} selected={colors.includes('#a25f2a') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#967117"><ColorLabel style="#967117" size={size} selected={colors.includes('#967117') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#d2691e"><ColorLabel style="#d2691e" size={size} selected={colors.includes('#d2691e') ? "border-blue-500 border-2" : ""} /></label>
                <label htmlFor="#87413f"><ColorLabel style="#87413f" size={size} selected={colors.includes('#87413f') ? "border-blue-500 border-2" : ""} /></label>

                <input type="checkbox" value="#66023c" id="#66023c" className="hidden" check={colors.includes('#66023c')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#6a0dad" id="#6a0dad" className="hidden" check={colors.includes('#6a0dad')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#ffb6b9" id="#ffb6b9" className="hidden" check={colors.includes('#ffb6b9')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#65000b" id="#65000b" className="hidden" check={colors.includes('#65000b')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="rose" id="rose" className="hidden" check={colors.includes('rose')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#ff6b6b" id="#ff6b6b" className="hidden" check={colors.includes('#ff6b6b')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#fffff0" id="#fffff0" className="hidden" check={colors.includes('#fffff0')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#cdb4db" id="#cdb4db" className="hidden" check={colors.includes('#cdb4db')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="pink" id="pink" className="hidden" check={colors.includes('pink')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#fff5ee" id="#fff5ee" className="hidden" check={colors.includes('#fff5ee')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="green" id="green" className="hidden" check={colors.includes('green') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#c41e3a" id="#c41e3a" className="hidden" check={colors.includes('#c41e3a')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#fdf5e6" id="#fdf5e6" className="hidden" check={colors.includes('#fdf5e6')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#d99058" id="#d99058" className="hidden" check={colors.includes('#d99058')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="cyan" id="cyan" className="hidden" check={colors.includes('cyan') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#faf0e6" id="#faf0e6" className="hidden" check={colors.includes('#faf0e6')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#ff7f50" id="#ff7f50" className="hidden" check={colors.includes('#ff7f50')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="red" id="red" className="hidden" check={colors.includes('red') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#b2beb5" id="#b2beb5" className="hidden" check={colors.includes('#b2beb5')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="lime" id="lime" className="hidden" check={colors.includes('lime') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#daa520" id="#daa520" className="hidden" check={colors.includes('#daa520')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#8c92ac" id="#8c92ac" className="hidden" check={colors.includes('#8c92ac')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="sky" id="sky" className="hidden" check={colors.includes('sky') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#f4c430" id="#f4c430" className="hidden" check={colors.includes('#f4c430')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#848482" id="#848482" className="hidden" check={colors.includes('#848482')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#9caf88" id="#9caf88" className="hidden" check={colors.includes('#9caf88')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="blue" id="blue" className="hidden" check={colors.includes('blue') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#98ff98" id="#98ff98" className="hidden" check={colors.includes('#98ff98')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#938b78" id="#938b78" className="hidden" check={colors.includes('#938b78')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#50c878" id="#50c878" className="hidden" check={colors.includes('#50c878')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="orange" id="orange" className="hidden" check={colors.includes('orange') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#98817b" id="#98817b" className="hidden" check={colors.includes('#98817b')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="emerald" id="emerald" className="hidden" check={colors.includes('emerald') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#228b22" id="#228b22" className="hidden" check={colors.includes('#228b22')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#9f8170" id="#9f8170" className="hidden" check={colors.includes('#9f8170')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="indigo" id="indigo" className="hidden" check={colors.includes('indigo') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#2ec4b6" id="#2ec4b6" className="hidden" check={colors.includes('#2ec4b6')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#738276" id="#738276" className="hidden" check={colors.includes('#738276')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="amber" id="amber" className="hidden" check={colors.includes('amber') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="violet" id="violet" className="hidden" check={colors.includes('violet') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#676767" id="#676767" className="hidden" check={colors.includes('#676767')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="yellow" id="yellow" className="hidden" check={colors.includes('yellow') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#4169e1" id="#4169e1" className="hidden" check={colors.includes('#4169e1')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#4f666a" id="#4f666a" className="hidden" check={colors.includes('#4f666a')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="teal" id="teal" className="hidden" check={colors.includes('teal') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#0077b6" id="#0077b6" className="hidden" check={colors.includes('#0077b6')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="purple" id="purple" className="hidden" check={colors.includes('purple') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#3f72af" id="#3f72af" className="hidden" check={colors.includes('#3f72af')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="fuchsia" id="fuchsia" className="hidden" check={colors.includes('fuchsia') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#483c32" id="#483c32" className="hidden" check={colors.includes('#483c32')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="white" id="white" className="hidden" check={colors.includes('white') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="neutral" id="neutral" className="hidden" check={colors.includes('neutral') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#702963" id="#702963" className="hidden" check={colors.includes('#702963')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="zinc" id="zinc" className="hidden" check={colors.includes('zinc') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#555555" id="#555555" className="hidden" check={colors.includes('#555555')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="stone" id="stone" className="hidden" check={colors.includes('stone') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#2a3439" id="#2a3439" className="hidden" check={colors.includes('#2a3439')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#4d5d53" id="#4d5d53" className="hidden" check={colors.includes('#4d5d53')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#0a1128" id="#0a1128" className="hidden" check={colors.includes('#0a1128')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="slate" id="slate" className="hidden" check={colors.includes('slate') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#954535" id="#954535" className="hidden" check={colors.includes('#954535')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="gray" id="gray" className="hidden" check={colors.includes('gray') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#36454f" id="#36454f" className="hidden" check={colors.includes('#36454f')} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="black" id="black" className="hidden" check={colors.includes('black') === 'yes'} onChange={(e) => changeColor(e.target.value)} />
                <input type="checkbox" value="#800000" id="#800000" className="hidden" check={colors.includes('#800000')} onChange={(e) => changeColor(e.target.value)} />
            </div>
        </div>
    );
}