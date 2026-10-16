
import React from "react";
import SectionHeading from "./SectionHeading";

const inputClass =
  "mt-2 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

export default function CustomerInformation({ customer, onChange }) {
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
          <input
            id="customer-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={customer.phone}
            onChange={onChange}
            required
            minLength={7}
            maxLength={20}
            pattern="[0-9+() -]{7,20}"
            title="Enter a valid phone number."
            placeholder="Enter your phone number"
            className={inputClass}
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
