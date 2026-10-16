import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import SectionHeading from "./components/SectionHeading";
import CustomerInformation from "./components/CustomerInformation";
import ApplicationSelection from "./components/ApplicationSelection";

const INITIAL_CUSTOMER = {
  name: "",
  email: "",
  phone: "",
  company: "",
  address: "",
};

const normalizeCategoryName = (name) =>
  String(name || "").toLowerCase().replace(/[^a-z0-9]+/g, "");

const getMachineryGroup = (categoryName) => {
  const name = normalizeCategoryName(categoryName);
  if (name.includes("primaryshredder")) return "Primary Shredder";
  if (name.includes("secondaryshredder")) return "Secondary Shredder";
  if (name.includes("steelcleaning")) return "Steel Cleaning";
  return categoryName;
};

const getGroupDescription = (groupName) => {
  if (groupName === "Primary Shredder") {
    return "Select an available primary shredder configuration.";
  }
  if (groupName === "Secondary Shredder") {
    return "Select an available secondary shredder configuration.";
  }
  if (groupName === "Steel Cleaning") {
    return "Select an available steel cleaning configuration.";
  }
  return "Select the required available machinery configurations.";
};

const getConnectingEquipmentLabel = (value) =>
  value === "with" ? "With connecting equipment" : "Without connecting equipment";

function MachineryCard({ group, selectedItems, onToggle }) {
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="mb-5">
        <h3 className="font-bold text-slate-900">{group.label}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          {getGroupDescription(group.label)}
        </p>
      </div>
      {group.models.length === 0 ? (
        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          No active configurations are available in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {group.models.map((model) => {
            const selected = Boolean(selectedItems[model._id]);
            const quantity = Number(model.quantity);
            const connectingEquipment =
              model.connectingEquipment === "with" ? "with" : "without";

            return (
              <button
                key={model._id}
                type="button"
                onClick={() => onToggle(model)}
                aria-pressed={selected}
                className={`min-w-0 rounded-xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                  selected
                    ? "border-emerald-500 bg-emerald-50/70"
                    : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="block break-words font-bold text-slate-900">
                      {model.capacityName}
                    </span>
                    <span className="mt-2 block text-sm text-slate-600">
                      Quantity:{" "}
                      <span className="font-semibold text-slate-800">
                        {Number.isInteger(quantity) && quantity >= 1
                          ? quantity
                          : "Not configured"}
                      </span>
                    </span>
                  </div>
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                      selected
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-300 bg-white text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                </div>
                <div className="mt-4 border-t border-slate-200/80 pt-3">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Connecting equipment
                  </span>
                  <span
                    className={`mt-1 block text-sm font-semibold ${
                      connectingEquipment === "with"
                        ? "text-emerald-700"
                        : "text-slate-700"
                    }`}
                  >
                    {getConnectingEquipmentLabel(connectingEquipment)}
                  </span>
                </div>
                <span
                  className={`mt-4 block rounded-lg px-3 py-2 text-center text-xs font-bold ${
                    selected
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  {selected ? "Selected configuration" : "Select configuration"}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function RequestQuotation() {
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER);
  const [applications, setApplications] = useState([]);
  const [application, setApplication] = useState("");
  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [configuration, setConfiguration] = useState({});
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [loadingMachinery, setLoadingMachinery] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ error: "", success: "" });

  useEffect(() => {
    let active = true;

    const loadApplications = async () => {
      try {
        setLoadingApplications(true);
        const response = await api.get("/api/public/quotation/applications");

        if (!response.data?.success) {
          throw new Error(
            response.data?.message || "Failed to load applications."
          );
        }

        if (active) {
          setApplications(response.data.data || []);
        }
      } catch (error) {
        if (active) {
          setStatus({
            error:
              error.response?.data?.message ||
              error.message ||
              "Failed to load quotation applications.",
            success: "",
          });
        }
      } finally {
        if (active) {
          setLoadingApplications(false);
        }
      }
    };

    loadApplications();

    return () => {
      active = false;
    };
  }, []);

  const selectedMachineryCount = useMemo(
    () =>
      Object.values(configuration).reduce(
        (total, items) => total + Object.keys(items).length,
        0
      ),
    [configuration]
  );

  const updateCustomer = (event) => {
    const { name, value } = event.target;
    setCustomer((previous) => ({ ...previous, [name]: value }));
  };

  const handleApplicationSelect = async (selectedApplication) => {
    setApplication(selectedApplication._id);
    setCategories([]);
    setGroups([]);
    setConfiguration({});
    setStatus({ error: "", success: "" });

    try {
      setLoadingMachinery(true);

      const categoryResponse = await api.get(
        "/api/public/quotation/categories",
        {
          params: { application: selectedApplication._id },
        }
      );

      if (!categoryResponse.data?.success) {
        throw new Error(
          categoryResponse.data?.message || "Failed to load categories."
        );
      }

      const loadedCategories = categoryResponse.data.data || [];
      setCategories(loadedCategories);

      const categoryResults = await Promise.all(
        loadedCategories.map(async (category) => {
          const modelResponse = await api.get(
            "/api/public/quotation/models",
            {
              params: { category: category._id },
            }
          );

          if (!modelResponse.data?.success) {
            throw new Error(
              modelResponse.data?.message ||
                `Failed to load ${category.name} machinery.`
            );
          }

          return {
            category,
            models: modelResponse.data.data || [],
          };
        })
      );

      const loadedGroups = categoryResults.map(({ category, models }) => ({
        categoryId: category._id,
        categoryName: category.name,
        label: getMachineryGroup(category.name),
        models,
      }));

      setGroups(loadedGroups);
      setConfiguration(
        Object.fromEntries(
          loadedGroups.map((group) => [group.categoryId, {}])
        )
      );
    } catch (error) {
      setCategories([]);
      setGroups([]);
      setConfiguration({});
      setStatus({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to load machinery for this application.",
        success: "",
      });
    } finally {
      setLoadingMachinery(false);
    }
  };

  const toggleConfiguration = (categoryId, model) => {
    setConfiguration((previous) => {
      const categoryItems = { ...(previous[categoryId] || {}) };

      if (categoryItems[model._id]) {
        delete categoryItems[model._id];
      } else {
        categoryItems[model._id] = model;
      }

      return {
        ...previous,
        [categoryId]: categoryItems,
      };
    });

    setStatus({ error: "", success: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ error: "", success: "" });

    if (!application) {
      setStatus({
        error: "Please select an application.",
        success: "",
      });
      return;
    }

    const selectedMachinery = Object.entries(configuration).flatMap(
      ([categoryId, items]) =>
        Object.values(items).map((model) => ({
          quotationModel: model._id,
          category: categoryId,
          quantity: Number(model.quantity),
          connectingEquipment:
            model.connectingEquipment === "with" ? "with" : "without",
        }))
    );

    if (selectedMachinery.length === 0) {
      setStatus({
        error: "Please select at least one machinery configuration.",
        success: "",
      });
      return;
    }

    const invalidConfiguration = selectedMachinery.some(
      (item) =>
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        !["with", "without"].includes(item.connectingEquipment)
    );

    if (invalidConfiguration) {
      setStatus({
        error:
          "An available configuration has invalid quantity or connecting-equipment data. Please refresh and select again.",
        success: "",
      });
      return;
    }

    const payload = {
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
        company: customer.company.trim(),
        address: customer.address.trim(),
      },
      application,
      selectedMachinery,
    };

    try {
      setSubmitting(true);

      const response = await api.post(
        "/api/quotation-requests",
        payload
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to submit quotation request."
        );
      }

      setStatus({
        error: "",
        success:
          response.data.message ||
          "Your quotation request has been received. The quotation PDF will be sent to your email shortly.",
      });
    } catch (error) {
      setStatus({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to submit your quotation request. Please try again.",
        success: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedApplication = applications.find(
    (item) => item._id === application
  );
  const applicationLabel = selectedApplication?.name || "";

  return (
    <main className="min-h-screen overflow-x-clip bg-slate-50 text-slate-800">
      <header className="relative isolate overflow-hidden bg-slate-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-400 sm:text-sm">
              VIKAH ECOTECH
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Request a Quotation
              <span className="mt-2 block text-emerald-400">
                Build your recycling solution.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Tell us about your business, choose your application and select
              from our available equipment configurations.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <span className="font-bold text-emerald-400">✓</span>
                Available configurations
              </span>
              <span className="flex items-center gap-2">
                <span className="font-bold text-emerald-400">✓</span>
                Accurate equipment selection
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomerInformation
            customer={customer}
            onChange={updateCustomer}
          />

          <ApplicationSelection
            applications={applications}
            application={application}
            loading={loadingApplications}
            onSelect={handleApplicationSelect}
          />

          {application && (
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
              <SectionHeading
                number="03"
                title="Choose Equipment Configurations"
                description={`Select the available capacity, quantity and connecting-equipment configuration for ${applicationLabel}.`}
              />

              {loadingMachinery ? (
                <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                  Loading available configurations...
                </p>
              ) : categories.length === 0 ? (
                <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                  No active machinery categories are available for this
                  application yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {groups.map((group) => (
                    <MachineryCard
                      key={group.categoryId}
                      group={group}
                      selectedItems={configuration[group.categoryId] || {}}
                      onToggle={(model) =>
                        toggleConfiguration(group.categoryId, model)
                      }
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Your selection summary
                </p>
                <p className="mt-1 text-xl font-extrabold text-slate-900">
                  {selectedMachineryCount} configuration
                  {selectedMachineryCount === 1 ? "" : "s"} selected
                </p>
                <p className="mt-1 max-w-md text-xs leading-5 text-slate-500">
                  Select an application and at least one available
                  configuration before submitting.
                </p>
              </div>

              <button
                type="submit"
                disabled={
                  !application ||
                  loadingMachinery ||
                  loadingApplications ||
                  submitting
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {submitting ? "Submitting..." : "Submit Quotation Request"}
                {!submitting && <span aria-hidden="true">→</span>}
              </button>
            </div>

            {status.error && (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm leading-6 text-red-700"
              >
                {status.error}
              </p>
            )}

            {status.success && (
              <p
                role="status"
                className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800"
              >
                {status.success}
              </p>
            )}
          </section>
        </form>
      </div>
    </main>
  );
}