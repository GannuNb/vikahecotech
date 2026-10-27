
import React from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import SectionHeading from "./SectionHeading";

const inputClass =
  "mt-2 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

export default function CustomerInformation({ customer, onChange }) {
  const phoneValid =
  customer.phone && isValidPhoneNumber(customer.phone);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <SectionHeading
        number="01"
        title="Your Information"
        description="Enter your contact details so our team can respond to your quotation request."
      />
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor="customer-name" className="text-sm font-semibold text-slate-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="customer-name"
            name="name"
            autoComplete="name"
            value={customer.name}
            onChange={onChange}
            required
            maxLength={100}
            placeholder="Enter your full name"
            className={inputClass}
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="customer-email" className="text-sm font-semibold text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="customer-email"
            name="email"
            type="email"
            autoComplete="email"
            value={customer.email}
            onChange={onChange}
            required
            maxLength={254}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="customer-phone" className="text-sm font-semibold text-slate-700">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            id="customer-phone"
            international
            defaultCountry="IN"
            countryCallingCodeEditable={false}
            value={customer.phone || ""}
            onChange={(value) =>
              onChange({
                target: {
                  name: "phone",
                  value: value || "",
                },
              })
            }
            placeholder="Enter your phone number"
            autoComplete="tel"
            className="mt-2 flex h-12 w-full min-w-0 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20"
            numberInputProps={{
              className: "h-full w-full min-w-0 border-0 bg-transparent p-0 text-sm text-slate-900 outline-none ring-0 focus:outline-none focus:ring-0",
              required: true,
            }}
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="customer-company" className="text-sm font-semibold text-slate-700">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            id="customer-company"
            name="company"
            autoComplete="organization"
            value={customer.company}
            onChange={onChange}
            required
            maxLength={150}
            placeholder="Enter your company name"
            className={inputClass}
          />
        </div>
        <div className="min-w-0 md:col-span-2">
          <label htmlFor="customer-address" className="text-sm font-semibold text-slate-700">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="customer-address"
            name="address"
            autoComplete="street-address"
            value={customer.address}
            onChange={onChange}
            required
            maxLength={500}
            rows={3}
            placeholder="Enter your complete address"
            className={`${inputClass} resize-y`}
          />
        </div>
      </div>
    </section>
  );
}
