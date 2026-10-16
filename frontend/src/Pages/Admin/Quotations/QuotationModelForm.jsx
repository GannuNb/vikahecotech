import React, { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import {
    ArrowLeft,
    Plus,
    Trash2,
    Upload,
    Image as ImageIcon,
    X,
} from "lucide-react";
import api from "../../../services/api";
const createPricingRow = () => ({
    equipmentDescription: "",
    modelNo: "",
    power: "",
    hp: 0,
    qty: 1,
    unitPrice: 0,
    totalPrice: 0,
});
const createSpecification = () => ({
    label: "",
    value: "",
});
const initialForm = {
    capacityName: "",
    quantity: 1,
    connectingEquipment: "without",
    description: "",
    pricingTable: [createPricingRow()],
    technicalSpecifications: [],
    images: [],
    referencePhotos: [],
    isActive: true,
};
const inputClass =
    "w-full min-w-0 rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";
const formatCurrency = (amount) =>
    `₹ ${Number(amount || 0).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
const getErrorMessage = (error, fallback) =>
    error.response?.data?.message || error.message || fallback;
const QuotationModelForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId");
    const [category, setCategory] = useState(null);
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(Boolean(id));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [machineryFiles, setMachineryFiles] = useState([]);
    const [referenceFiles, setReferenceFiles] = useState([]);
    const [machineryPreviews, setMachineryPreviews] = useState([]);
    const [referencePreviews, setReferencePreviews] = useState([]);
    useEffect(() => {
        const urls = machineryFiles.map((file) =>
            URL.createObjectURL(file)
        );
        setMachineryPreviews(urls);
        return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }, [machineryFiles]);
    useEffect(() => {
        const urls = referenceFiles.map((file) =>
            URL.createObjectURL(file)
        );
        setReferencePreviews(urls);
        return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }, [referenceFiles]);
    useEffect(() => {
        let cancelled = false;
        const loadData = async () => {
            try {
                setError("");
                if (categoryId) {
                    const response = await api.get(
                        `/api/admin/quotation-categories/${categoryId}`
                    );
                    const result = response.data;
                    const categoryData =
                        result?.data || result?.category || result;
                    if (!cancelled) setCategory(categoryData);
                }
                if (id) {
                    const response = await api.get(
                        `/api/admin/quotation-models/${id}`
                    );
                    const result = response.data;
                    const data =
                        result?.data || result?.quotationModel || result;
                    if (cancelled) return;
                    const savedCategoryId =
                        typeof data.category === "object"
                            ? data.category?._id
                            : data.category;
                    if (!categoryId && savedCategoryId) {
                        const categoryResponse = await api.get(
                            `/api/admin/quotation-categories/${savedCategoryId}`
                        );
                        const categoryResult = categoryResponse.data;
                        if (cancelled) return;
                        setCategory(
                            categoryResult?.data ||
                            categoryResult?.category ||
                            categoryResult
                        );
                    }
                    setForm({
                        ...initialForm,
                        ...data,
                        quantity: Math.max(1, Number(data.quantity) || 1),
                        pricingTable:
                            data.pricingTable?.length > 0
                                ? data.pricingTable.map((row) => ({
                                    ...createPricingRow(),
                                    ...row,
                                    hp: Number(row.hp) || 0,
                                    qty: Math.max(1, Number(row.qty) || 1),
                                    unitPrice: Number(row.unitPrice) || 0,
                                    totalPrice:
                                        (Number(row.qty) || 1) *
                                        (Number(row.unitPrice) || 0),
                                }))
                                : [createPricingRow()],
                        technicalSpecifications:
                            data.technicalSpecifications || [],
                        images: data.images || [],
                        referencePhotos: data.referencePhotos || [],
                    });
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        getErrorMessage(err, "Failed to load capacity details.")
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        loadData();
        return () => {
            cancelled = true;
        };
    }, [id, categoryId]);
    const updateField = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };
    // Pricing table
    const updatePricingRow = (index, field, value) => {
        setForm((previous) => {
            const rows = [...previous.pricingTable];
            const row = { ...rows[index] };
            if (["qty", "unitPrice", "hp"].includes(field)) {
                row[field] = value === "" ? "" : Number(value);
            } else {
                row[field] = value;
            }
            row.totalPrice =
                (Number(row.qty) || 0) *
                (Number(row.unitPrice) || 0);
            rows[index] = row;
            return {
                ...previous,
                pricingTable: rows,
            };
        });
    };
    const addPricingRow = () => {
        setForm((previous) => ({
            ...previous,
            pricingTable: [
                ...previous.pricingTable,
                createPricingRow(),
            ],
        }));
    };
    const removePricingRow = (index) => {
        setForm((previous) => ({
            ...previous,
            pricingTable: previous.pricingTable.filter(
                (_, rowIndex) => rowIndex !== index
            ),
        }));
    };
    // Technical specifications
    const updateSpecification = (index, field, value) => {
        setForm((previous) => {
            const specifications = [...previous.technicalSpecifications];
            specifications[index] = {
                ...specifications[index],
                [field]: value,
            };
            return {
                ...previous,
                technicalSpecifications: specifications,
            };
        });
    };
    const addSpecification = () => {
        setForm((previous) => ({
            ...previous,
            technicalSpecifications: [
                ...previous.technicalSpecifications,
                createSpecification(),
            ],
        }));
    };
    const removeSpecification = (index) => {
        setForm((previous) => ({
            ...previous,
            technicalSpecifications:
                previous.technicalSpecifications.filter(
                    (_, itemIndex) => itemIndex !== index
                ),
        }));
    };
    // Existing saved images
    const updatePhoto = (field, index, key, value) => {
        setForm((previous) => {
            const photos = [...previous[field]];
            photos[index] = {
                ...photos[index],
                [key]: value,
            };
            return {
                ...previous,
                [field]: photos,
            };
        });
    };
    const removePhoto = (field, index) => {
        setForm((previous) => ({
            ...previous,
            [field]: previous[field].filter(
                (_, photoIndex) => photoIndex !== index
            ),
        }));
    };
    // New image selection
    const handleFileChange = (event, type) => {
        const selectedFiles = Array.from(event.target.files || []);
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
        ];
        const invalidFile = selectedFiles.find(
            (file) =>
                !allowedTypes.includes(file.type) ||
                file.size > 5 * 1024 * 1024
        );
        if (invalidFile) {
            setError(
                "Select JPEG, PNG, WebP, or GIF images. Each image must be 5 MB or smaller."
            );
            event.target.value = "";
            return;
        }
        setError("");
        const filesWithDescriptions = selectedFiles.map((file) =>
            Object.assign(file, { description: "" })
        );
        if (type === "images") {
            setMachineryFiles((previous) => [
                ...previous,
                ...filesWithDescriptions,
            ]);
        } else {
            setReferenceFiles((previous) => [
                ...previous,
                ...filesWithDescriptions,
            ]);
        }
        event.target.value = "";
    };
    const removeNewFile = (index, type) => {
        if (type === "images") {
            setMachineryFiles((previous) =>
                previous.filter((_, i) => i !== index)
            );
        } else {
            setReferenceFiles((previous) =>
                previous.filter((_, i) => i !== index)
            );
        }
    };
    const grandTotal = form.pricingTable.reduce(
        (sum, row) =>
            sum +
            (Number(row.qty) || 0) *
            (Number(row.unitPrice) || 0),
        0
    );
    const totalQty = form.pricingTable.reduce(
        (sum, row) => sum + (Number(row.qty) || 0),
        0
    );
    const totalHp = form.pricingTable.reduce(
        (sum, row) =>
            sum +
            (Number(row.hp) || 0) * (Number(row.qty) || 0),
        0
    );
    const validateForm = () => {
        if (!categoryId && !id) {
            return "Please open this form from a category's View Capacities page.";
        }
        if (!form.capacityName.trim()) {
            return "Capacity name is required.";
        }
        if (
            !Number.isInteger(Number(form.quantity)) ||
            Number(form.quantity) < 1
        ) {
            return "Capacity quantity must be at least 1.";
        }
        if (form.pricingTable.length === 0) {
            return "Add at least one pricing row.";
        }
        for (let index = 0; index < form.pricingTable.length; index++) {
            const row = form.pricingTable[index];
            if (!row.equipmentDescription.trim()) {
                return `Equipment description is required in row ${index + 1}.`;
            }
            if (
                row.qty === "" ||
                !Number.isInteger(Number(row.qty)) ||
                Number(row.qty) < 1
            ) {
                return `Enter a valid quantity in pricing row ${index + 1}.`;
            }
            if (
                row.unitPrice === "" ||
                !Number.isFinite(Number(row.unitPrice)) ||
                Number(row.unitPrice) < 0
            ) {
                return `Enter a valid unit price in row ${index + 1}.`;
            }
            if (
                row.hp === "" ||
                !Number.isFinite(Number(row.hp)) ||
                Number(row.hp) < 0
            ) {
                return `Enter valid HP in pricing row ${index + 1}.`;
            }
        }
        for (
            let index = 0;
            index < form.technicalSpecifications.length;
            index++
        ) {
            const spec = form.technicalSpecifications[index];
            if (!spec.label.trim() || !spec.value.trim()) {
                return `Complete technical specification ${index + 1}, or remove it.`;
            }
        }
        return "";
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        try {
            setSaving(true);
            const savedCategoryId =
                categoryId ||
                (typeof form.category === "object"
                    ? form.category?._id
                    : form.category);
            if (!savedCategoryId) {
                throw new Error("Category is required.");
            }
            const payload = new FormData();
            payload.append("category", savedCategoryId);
            payload.append("capacityName", form.capacityName.trim());
            payload.append("quantity", String(Number(form.quantity)));
            payload.append(
                "connectingEquipment",
                form.connectingEquipment
            );
            payload.append("description", form.description || "");
            payload.append("isActive", String(Boolean(form.isActive)));
            payload.append(
                "pricingTable",
                JSON.stringify(
                    form.pricingTable.map((row) => ({
                        ...row,
                        hp: Number(row.hp) || 0,
                        qty: Number(row.qty),
                        unitPrice: Number(row.unitPrice),
                        totalPrice:
                            Number(row.qty) * Number(row.unitPrice),
                    }))
                )
            );
            payload.append(
                "technicalSpecifications",
                JSON.stringify(form.technicalSpecifications)
            );
            // Keep saved S3 image keys so the backend can retain existing files.
            payload.append(
                "images",
                JSON.stringify(
                    form.images.map((photo) => ({
                        key: photo.key || photo.url,
                        description: photo.description || "",
                    }))
                )
            );
            payload.append(
                "referencePhotos",
                JSON.stringify(
                    form.referencePhotos.map((photo) => ({
                        key: photo.key || photo.url,
                        description: photo.description || "",
                    }))
                )
            );
            machineryFiles.forEach((file) => {
                payload.append("images", file);
            });
            payload.append(
                "imageDescriptions",
                JSON.stringify(machineryFiles.map((file) => file.description || ""))
            );
            referenceFiles.forEach((file) => {
                payload.append("referencePhotos", file);
            });
            payload.append(
                "referencePhotoDescriptions",
                JSON.stringify(referenceFiles.map((file) => file.description || ""))
            );
            if (id) {
                await api.put(`/api/admin/quotation-models/${id}`, payload);
            } else {
                await api.post("/api/admin/quotation-models", payload);
            }
            navigate(
                `/admin/quotation-categories/${savedCategoryId}/capacities`
            );
        } catch (err) {
            setError(getErrorMessage(err, "Failed to save capacity."));
        } finally {
            setSaving(false);
        }
    };
    const renderImageSection = (
        title,
        field,
        files,
        previews,
        inputId
    ) => (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Select multiple images. Maximum 5 MB per image.
                    </p>
                </div>
                <label
                    htmlFor={inputId}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    <Upload size={16} />
                    Upload Images
                </label>
                <input
                    id={inputId}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    multiple
                    className="hidden"
                    onChange={(event) => handleFileChange(event, field)}
                />
            </div>
            {form[field].length > 0 && (
                <div className="mb-5">
                    <h3 className="mb-3 text-sm font-semibold text-slate-700">
                        Saved images
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {form[field].map((photo, index) => (
                            <div
                                key={photo._id || `${photo.url}-${index}`}
                                className="overflow-hidden rounded-xl border border-slate-200"
                            >
                                {photo.url && (
                                    <img
                                        src={photo.url}
                                        alt={photo.description || title}
                                        className="h-44 w-full bg-slate-50 object-contain"
                                    />
                                )}
                                <div className="space-y-2 p-3">
                                    <input
                                        className={inputClass}
                                        value={photo.description || ""}
                                        onChange={(event) =>
                                            updatePhoto(
                                                field,
                                                index,
                                                "description",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Image description"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removePhoto(field, index)}
                                        className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 size={15} />
                                        Remove image
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {files.length > 0 && (
                <div>
                    <h3 className="mb-3 text-sm font-semibold text-slate-700">
                        New images to upload
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {files.map((file, index) => (
                            <div
                                key={`${file.name}-${file.lastModified}-${index}`}
                                className="overflow-hidden rounded-xl border border-blue-200"
                            >
                                <img
                                    src={previews[index]}
                                    alt={file.name}
                                    className="h-44 w-full bg-slate-50 object-contain"
                                />
                                <div className="space-y-3 p-3">
                                    <p className="truncate text-sm font-medium text-slate-700">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={file.description || ""}
                                        onChange={(event) => {
                                            const description = event.target.value;
                                            const updateFiles =
                                                field === "images"
                                                    ? setMachineryFiles
                                                    : setReferenceFiles;
                                            updateFiles((previous) =>
                                                previous.map((item, fileIndex) =>
                                                    fileIndex === index
                                                        ? Object.assign(item, { description })
                                                        : item
                                                )
                                            );
                                        }}
                                        placeholder="Enter image description"
                                        aria-label={`Description for ${file.name}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeNewFile(index, field)}
                                        className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                                    >
                                        <X size={15} />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {form[field].length === 0 && files.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 py-8 text-center">
                    <ImageIcon
                        size={30}
                        className="mx-auto text-slate-400"
                    />
                    <p className="mt-2 text-sm text-slate-500">
                        No images selected.
                    </p>
                </div>
            )}
        </section>
    );
    if (loading) {
        return (
            <div className="p-8 text-sm text-slate-600">
                Loading capacity...
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <header className="flex flex-wrap items-center gap-4">
                    <button
                        type="button"
                        onClick={() => {
                            const currentCategoryId =
                                categoryId ||
                                (typeof form.category === "object"
                                    ? form.category?._id
                                    : form.category);
                            navigate(
                                currentCategoryId
                                    ? `/admin/quotation-categories/${currentCategoryId}/capacities`
                                    : "/admin/quotation-applications"
                            );
                        }}
                        className="rounded-xl border border-slate-200 bg-white p-2.5 hover:bg-slate-100"
                        aria-label="Back to capacities"
                    >
                        <ArrowLeft size={19} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {id ? "Edit Capacity" : "Add Capacity"}
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            {category?.name
                                ? `Category: ${category.name}`
                                : "Enter capacity and equipment details."}
                        </p>
                    </div>
                </header>
                {error && (
                    <div
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Capacity details */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="mb-5 text-lg font-bold text-slate-900">
                            1. Capacity Details
                        </h2>
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className={labelClass}>
                                    Capacity Name *
                                </label>
                                <input
                                    className={inputClass}
                                    value={form.capacityName}
                                    onChange={(event) =>
                                        updateField("capacityName", event.target.value)
                                    }
                                    placeholder="e.g. 4 TPH"
                                    maxLength={150}
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelClass}>
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    step="1"
                                    className={inputClass}
                                    value={form.quantity}
                                    onChange={(event) =>
                                        updateField(
                                            "quantity",
                                            event.target.value === ""
                                                ? ""
                                                : Number(event.target.value)
                                        )
                                    }
                                    required
                                />
                                <p className="mt-1 text-xs text-slate-500">
                                    Default quantity for this capacity.
                                </p>
                            </div>
                            <fieldset className="md:col-span-2">
                                <legend className={labelClass}>
                                    Connecting Equipment *
                                </legend>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm">
                                        <input
                                            type="radio"
                                            name="connectingEquipment"
                                            value="with"
                                            checked={form.connectingEquipment === "with"}
                                            onChange={(event) =>
                                                updateField(
                                                    "connectingEquipment",
                                                    event.target.value
                                                )
                                            }
                                            required
                                        />
                                        With connecting equipment
                                    </label>
                                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm">
                                        <input
                                            type="radio"
                                            name="connectingEquipment"
                                            value="without"
                                            checked={form.connectingEquipment === "without"}
                                            onChange={(event) =>
                                                updateField(
                                                    "connectingEquipment",
                                                    event.target.value
                                                )
                                            }
                                        />
                                        Without connecting equipment
                                    </label>
                                </div>
                            </fieldset>
                            <div className="md:col-span-2">
                                <label className={labelClass}>
                                    Capacity Description
                                </label>
                                <textarea
                                    className={inputClass}
                                    rows={4}
                                    value={form.description}
                                    onChange={(event) =>
                                        updateField("description", event.target.value)
                                    }
                                    placeholder="Describe this capacity..."
                                />
                            </div>
                        </div>
                    </section>
                    {/* Pricing table */}
                    {/* Pricing table */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                        {/* Section Header */}
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    2. Equipment Pricing Table
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Add equipment details. Total price is calculated automatically.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={addPricingRow}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                            >
                                <Plus size={16} />
                                Add Equipment
                            </button>
                        </div>
                        {/* Responsive Table */}
                        <div className="overflow-x-auto rounded-xl border border-slate-200">
                            <table className="w-full min-w-[1050px] border-collapse text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                                        <th className="w-16 whitespace-nowrap px-3 py-3 text-center font-semibold">
                                            S.No.
                                        </th>
                                        <th className="min-w-[220px] px-3 py-3 font-semibold">
                                            Equipment Description *
                                        </th>
                                        <th className="min-w-[130px] px-3 py-3 font-semibold">
                                            Model No.
                                        </th>
                                        <th className="min-w-[120px] px-3 py-3 font-semibold">
                                            Power
                                        </th>
                                        <th className="min-w-[90px] px-3 py-3 font-semibold">
                                            HP
                                        </th>
                                        <th className="min-w-[90px] px-3 py-3 font-semibold">
                                            Qty *
                                        </th>
                                        <th className="min-w-[150px] px-3 py-3 font-semibold">
                                            Unit Price (₹) *
                                        </th>
                                        <th className="min-w-[150px] px-3 py-3 font-semibold">
                                            Total Price
                                        </th>
                                        <th className="w-20 px-3 py-3 text-center font-semibold">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {form.pricingTable.map((row, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50/70"
                                        >
                                            {/* Serial Number */}
                                            <td className="px-3 py-3 text-center font-semibold text-slate-600">
                                                {index + 1}
                                            </td>
                                            {/* Equipment Description */}
                                            <td className="px-3 py-3">
                                                <input
                                                    type="text"
                                                    className={inputClass}
                                                    value={row.equipmentDescription}
                                                    onChange={(e) =>
                                                        updatePricingRow(
                                                            index,
                                                            "equipmentDescription",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Equipment name"
                                                    required
                                                />
                                            </td>
                                            {/* Model Number */}
                                            <td className="px-3 py-3">
                                                <input
                                                    type="text"
                                                    className={inputClass}
                                                    value={row.modelNo}
                                                    onChange={(e) =>
                                                        updatePricingRow(index, "modelNo", e.target.value)
                                                    }
                                                    placeholder="Model no."
                                                />
                                            </td>
                                            {/* Power */}
                                            <td className="px-3 py-3">
                                                <input
                                                    type="text"
                                                    className={inputClass}
                                                    value={row.power}
                                                    onChange={(e) =>
                                                        updatePricingRow(index, "power", e.target.value)
                                                    }
                                                    placeholder="Power"
                                                />
                                            </td>
                                            {/* HP */}
                                            <td className="px-3 py-3">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="any"
                                                    className={inputClass}
                                                    value={row.hp}
                                                    onChange={(e) =>
                                                        updatePricingRow(index, "hp", e.target.value)
                                                    }
                                                    required
                                                />
                                            </td>
                                            {/* Quantity */}
                                            <td className="px-3 py-3">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    step="1"
                                                    className={inputClass}
                                                    value={row.qty}
                                                    onChange={(e) =>
                                                        updatePricingRow(index, "qty", e.target.value)
                                                    }
                                                    required
                                                />
                                            </td>
                                            {/* Unit Price */}
                                            <td className="px-3 py-3">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    className={inputClass}
                                                    value={row.unitPrice}
                                                    onChange={(e) =>
                                                        updatePricingRow(index, "unitPrice", e.target.value)
                                                    }
                                                    required
                                                />
                                            </td>
                                            {/* Total Price */}
                                            <td className="whitespace-nowrap px-3 py-3 font-semibold text-slate-800">
                                                {formatCurrency(
                                                    Math.max(0, Number(row.qty) || 0) *
                                                    Math.max(0, Number(row.unitPrice) || 0)
                                                )}
                                            </td>
                                            {/* Remove Row */}
                                            <td className="px-3 py-3 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => removePricingRow(index)}
                                                    disabled={form.pricingTable.length === 1}
                                                    className="inline-flex items-center justify-center rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                                                    aria-label={`Remove equipment row ${index + 1}`}
                                                    title="Remove equipment"
                                                >
                                                    <Trash2 size={17} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                            On smaller screens, scroll horizontally to view all columns.
                        </p>
                        {/* Totals Summary */}
                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-sm font-medium text-slate-500">
                                    Total Equipment Quantity
                                </p>
                                <p className="mt-1 text-xl font-bold text-slate-900">
                                    {totalQty}
                                </p>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-sm font-medium text-slate-500">
                                    Total HP
                                </p>
                                <p className="mt-1 text-xl font-bold text-slate-900">
                                    {totalHp.toLocaleString("en-IN")}
                                </p>
                            </div>
                            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 sm:col-span-2 xl:col-span-1">
                                <p className="text-sm font-medium text-blue-700">
                                    Grand Total
                                </p>
                                <p className="mt-1 text-xl font-bold text-blue-800">
                                    {formatCurrency(grandTotal)}
                                </p>
                            </div>
                        </div>
                    </section>
                    {/* Technical specifications */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    3. Technical Specifications
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Add any number of specification fields.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={addSpecification}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                <Plus size={16} />
                                Add Specification
                            </button>
                        </div>
                        {form.technicalSpecifications.length === 0 && (
                            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                                No specifications added.
                            </p>
                        )}
                        <div className="space-y-3">
                            {form.technicalSpecifications.map((spec, index) => (
                                <div
                                    key={index}
                                    className="grid gap-3 rounded-xl border border-slate-200 p-3 sm:grid-cols-[1fr_1fr_auto]"
                                >
                                    <input
                                        className={inputClass}
                                        value={spec.label}
                                        onChange={(event) =>
                                            updateSpecification(
                                                index,
                                                "label",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Specification name"
                                        aria-label={`Specification name ${index + 1}`}
                                    />
                                    <input
                                        className={inputClass}
                                        value={spec.value}
                                        onChange={(event) =>
                                            updateSpecification(
                                                index,
                                                "value",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Specification value"
                                        aria-label={`Specification value ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSpecification(index)}
                                        className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                    {/* Machinery images */}
                    {renderImageSection(
                        "4. Machinery Images",
                        "images",
                        machineryFiles,
                        machineryPreviews,
                        "machinery-image-upload"
                    )}
                    {/* Reference/output images */}
                    {renderImageSection(
                        "5. Reference / Output Photos",
                        "referencePhotos",
                        referenceFiles,
                        referencePreviews,
                        "reference-photo-upload"
                    )}
                    {/* Status and save */}
                    <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <input
                                type="checkbox"
                                checked={Boolean(form.isActive)}
                                onChange={(event) =>
                                    updateField("isActive", event.target.checked)
                                }
                                className="h-4 w-4 rounded"
                            />
                            Active capacity
                        </label>
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving
                                ? "Saving..."
                                : id
                                    ? "Update Capacity"
                                    : "Save Capacity"}
                        </button>
                    </section>
                </form>
            </div>
        </div>
    );
};
export default QuotationModelForm;
