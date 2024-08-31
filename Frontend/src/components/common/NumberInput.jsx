import React, { useRef } from "react";

const countryCodes = [
  { key: "US", code: "+1" },
  { key: "GB", code: "+44" },
  { key: "IN", code: "+91" },
  { key: "AU", code: "+61" },
  { key: "FR", code: "+33" },
  { key: "DE", code: "+49" },
  { key: "ES", code: "+34" },
  { key: "BR", code: "+55" },
  { key: "CN", code: "+86" },
  { key: "JP", code: "+81" },
  { key: "RU", code: "+7" },
  { key: "ZA", code: "+27" },
  { key: "ID", code: "+62" },
  { key: "IT", code: "+39" },
  { key: "AE", code: "+971" },
  { key: "KR", code: "+82" },
  { key: "MY", code: "+60" },
  { key: "PK", code: "+92" },
  { key: "NG", code: "+234" },
  { key: "EG", code: "+20" },
  { key: "TR", code: "+90" },
  { key: "DK", code: "+45" },
  { key: "NL", code: "+31" },
  { key: "BE", code: "+32" },
  { key: "PT", code: "+351" },
  { key: "IE", code: "+353" },
  { key: "IS", code: "+354" },
  { key: "SK", code: "+421" },
  { key: "CZ", code: "+420" },
  { key: "EE", code: "+372" },
  { key: "LV", code: "+371" },
  { key: "LT", code: "+370" },
  { key: "MK", code: "+389" },
  { key: "RS", code: "+381" },
  { key: "ME", code: "+382" },
  { key: "XK", code: "+383" },
  { key: "MT", code: "+356" },
  { key: "CH", code: "+41" },
  { key: "AT", code: "+43" },
  { key: "SE", code: "+46" },
  { key: "NO", code: "+47" },
  { key: "PL", code: "+48" },
  { key: "BG", code: "+359" },
  { key: "MV", code: "+960" },
  { key: "SA", code: "+966" },
  { key: "IQ", code: "+964" },
  { key: "IR", code: "+98" },
  { key: "QA", code: "+974" },
  { key: "RW", code: "+250" },
  { key: "BW", code: "+267" },
  { key: "KE", code: "+254" },
  { key: "ET", code: "+251" },
  { key: "ZM", code: "+260" },
  { key: "TZ", code: "+255" },
  { key: "UG", code: "+256" },
  { key: "CG", code: "+242" },
  { key: "CD", code: "+243" },
  { key: "CI", code: "+225" },
  { key: "GA", code: "+241" },
  { key: "RE", code: "+262" },
  { key: "PF", code: "+689" },
  { key: "GP", code: "+590" },
  { key: "GF", code: "+594" },
  { key: "PM", code: "+508" },
  { key: "GD", code: "+473" },
  { key: "JM", code: "+876" },
  { key: "PR", code: "+939" },
  { key: "SH", code: "+290" },
  { key: "SZ", code: "+268" },
  { key: "SM", code: "+378" },
  { key: "AR", code: "+54" },
  { key: "CU", code: "+53" },
  { key: "CY", code: "+357" },
  { key: "BH", code: "+973" },
  { key: "LB", code: "+961" },
  { key: "KG", code: "+996" },
  { key: "UZ", code: "+998" },
  { key: "TV", code: "+688" },
  { key: "FJ", code: "+679" },
  { key: "WS", code: "+685" },
  { key: "VU", code: "+678" },
  { key: "SB", code: "+677" },
  { key: "KI", code: "+686" },
  { key: "WF", code: "+681" },
  { key: "CK", code: "+682" },
  { key: "NU", code: "+683" },
  { key: "TO", code: "+676" },
  { key: "NR", code: "+674" },
  { key: "NC", code: "+687" },
  { key: "FM", code: "+691" },
  { key: "MH", code: "+692" },
  { key: "PW", code: "+693" },
  { key: "JO", code: "+962" },
  { key: "SO", code: "+252" },
  { key: "BI", code: "+257" },
  { key: "BD", code: "+880" },
  { key: "HT", code: "+509" },
  { key: "MD", code: "+373" },
];

const NumberInput = ({ handleNumber, value, handleCountryChange, country }) => {
  const divElement = useRef(null);
  const inputElement = useRef(null);

  function handleOnFocus() {
    divElement.current.style.outline = "1.5px solid #111";
  }

  function handleOnBlur() {
    divElement.current.style.outline = "none";
  }
  return (
    <div
      ref={divElement}
      className="grid grid-cols-[auto_1fr] items-center w-full bg-transparent outline-offset-[3px] outline-[2.5px] shadow-inner-border rounded-md focus:outline text-dark font-normal overflow-hidden p-0.5"
    >
      <select
        onFocus={() => {
          handleOnFocus();
          inputElement.current.focus();
        }}
        onChange={handleCountryChange}
        value={country}
        onBlur={handleOnBlur}
        className="border-gray-300 rounded-md px-1 py-2 focus:outline-none w-fit select"
      >
        {countryCodes.map((code) => (
          <option key={code.code} value={code.code}>
            {code.code} ({code.key})
          </option>
        ))}
      </select>
      <input
        required
        ref={inputElement}
        onFocus={handleOnFocus}
        onChange={handleNumber}
        onBlur={handleOnBlur}
        value={value}
        type="tel"
        className="w-full border-gray-300 px-3 py-2 rounded focus:outline-none"
        placeholder="Enter your phone number"
      />
    </div>
  );
};

export default NumberInput;
