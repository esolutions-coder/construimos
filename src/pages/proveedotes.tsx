import React, { useState, useEffect } from "react";

// Provider Section - Single-file React component
// - TailwindCSS utility classes used (no CSS imports here)
// - Exposes a simple Provider Dashboard and a Public Storefront view
// - Stubbed API functions (replace with real endpoints)
// - CSV upload implemented with simple FileReader parsing (comma-separated)

export default function ProviderSection() {
  // UI: 'dashboard' or 'public'
  const [view, setView] = useState("dashboard");

  // Minimal provider profile
  const [provider, setProvider] = useState(() => ({
    providerId: "prov-001",
    name: "Ferretería El Tornillo Feliz",
    logo: "",
    description: "Especialistas en materiales para obra gruesa y acabados.",
    address: "Calle 45 #12-34",
    location: { lat: 0, lng: 0 },
    phone: "+34 600 123 456",
    email: "contacto@eltornillofeliz.com",
    socialLinks: { facebook: "", instagram: "" },
  }));

  // Inventory state
  const [inventory, setInventory] = useState(() => [
    {
      productId: "p-001",
      name: "Cemento Portland 50kg",
      category: "Cementos",
      price: 8.5,
      unit: "saco",
      stock: 120,
      image: "",
      lastUpdated: new Date().toISOString().slice(0, 10),
    },
    {
      productId: "p-002",
      name: "Pintura Vinílica 4L",
      category: "Pinturas",
      price: 25.0,
      unit: "cubo",
      stock: 40,
      image: "",
      lastUpdated: new Date().toISOString().slice(0, 10),
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [promotions, setPromotions] = useState([]);
  const [messages, setMessages] = useState([]);

  // Simulated API (replace with real fetch calls)
  const api = {
    saveProvider: async (payload) => {
      // simulate server delay
      await new Promise((r) => setTimeout(r, 300));
      setProvider(payload);
      return payload;
    },
    saveProduct: async (prod) => {
      await new Promise((r) => setTimeout(r, 200));
      setInventory((prev) => {
        const exist = prev.find((p) => p.productId === prod.productId);
        if (exist)
          return prev.map((p) => (p.productId === prod.productId ? prod : p));
        return [prod, ...prev];
      });
      return prod;
    },
    deleteProduct: async (productId) => {
      await new Promise((r) => setTimeout(r, 200));
      setInventory((prev) => prev.filter((p) => p.productId !== productId));
      return true;
    },
  };

  // Product form state
  const emptyProduct = {
    productId: null,
    name: "",
    category: "",
    price: 0,
    unit: "unidad",
    stock: 0,
    image: "",
  };

  const [productForm, setProductForm] = useState(emptyProduct);

  useEffect(() => {
    if (selectedProduct) setProductForm(selectedProduct);
    else setProductForm(emptyProduct);
  }, [selectedProduct]);

  // Helpers
  function formatMoney(v) {
    return Number(v).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function newProductId() {
    return `p-${Math.random().toString(36).slice(2, 9)}`;
  }

  // Product CRUD
  async function handleSaveProduct(e) {
    e.preventDefault();
    const payload = {
      ...productForm,
      productId: productForm.productId || newProductId(),
      lastUpdated: new Date().toISOString().slice(0, 10),
    };
    await api.saveProduct(payload);
    setSelectedProduct(null);
    setProductForm(emptyProduct);
  }

  async function handleDeleteProduct(id) {
    if (!confirm("¿Eliminar producto?")) return;
    await api.deleteProduct(id);
  }

  // CSV upload: expects header line with name,category,price,unit,stock,image(optional)
  function handleCSVUpload(file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      const lines = text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
      if (lines.length === 0) return;
      const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const rows = lines
        .slice(1)
        .map((ln) => ln.split(",").map((c) => c.trim()));
      const created = rows.map((cols) => {
        const obj = {};
        header.forEach((h, i) => (obj[h] = cols[i] ?? ""));
        return {
          productId: newProductId(),
          name: obj.name || "sin nombre",
          category: obj.category || "sin categoria",
          price: parseFloat(obj.price || 0) || 0,
          unit: obj.unit || "unidad",
          stock: parseInt(obj.stock || 0) || 0,
          image: obj.image || "",
          lastUpdated: new Date().toISOString().slice(0, 10),
        };
      });
      // merge
      setInventory((prev) => [...created, ...prev]);
      alert(`Se importaron ${created.length} productos`);
    };
    reader.readAsText(file);
  }

  // Promotions
  function addPromotion(promo) {
    setPromotions((prev) => [promo, ...prev]);
  }

  // Public view filters
  const visibleInventory = inventory.filter((p) => {
    const matchesQuery = query
      ? p.name.toLowerCase().includes(query.toLowerCase())
      : true;
    const matchesCategory =
      categoryFilter === "all" ? true : p.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  const categories = Array.from(
    new Set(inventory.map((p) => p.category))
  ).filter(Boolean);

  // Simple stats
  const stats = {
    totalProducts: inventory.length,
    totalStock: inventory.reduce((s, p) => s + (Number(p.stock) || 0), 0),
    lowStock: inventory.filter((p) => Number(p.stock) <= 5).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Panel Proveedores</h1>
        <div className="space-x-2">
          <button
            className={`px-3 py-1 rounded ${
              view === "dashboard" ? "bg-sky-600 text-white" : "bg-white border"
            }`}
            onClick={() => setView("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`px-3 py-1 rounded ${
              view === "public" ? "bg-sky-600 text-white" : "bg-white border"
            }`}
            onClick={() => setView("public")}
          >
            Ver tienda pública
          </button>
        </div>
      </header>

      {view === "dashboard" ? (
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-3 bg-white p-4 rounded shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center">
                Logo
              </div>
              <div>
                <div className="font-semibold">{provider.name}</div>
                <div className="text-sm text-gray-500">{provider.address}</div>
              </div>
            </div>
            <nav className="space-y-2 text-sm">
              <button className="w-full text-left px-3 py-2 rounded bg-sky-50">
                Inventario
              </button>
              <button className="w-full text-left px-3 py-2 rounded">
                Promociones
              </button>
              <button className="w-full text-left px-3 py-2 rounded">
                Estadísticas
              </button>
              <button className="w-full text-left px-3 py-2 rounded">
                Mensajes
              </button>
              <button className="w-full text-left px-3 py-2 rounded">
                Perfil
              </button>
            </nav>
            <hr className="my-4" />
            <div className="text-xs text-gray-600">
              <div>Total productos: {stats.totalProducts}</div>
              <div>Total stock: {stats.totalStock}</div>
              <div>Productos con stock crítico: {stats.lowStock}</div>
            </div>
          </aside>

          {/* Main */}
          <main className="col-span-9">
            <section className="bg-white p-4 rounded shadow mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Inventario</h2>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="file"
                      accept=".csv,text/csv"
                      onChange={(e) =>
                        e.target.files[0] && handleCSVUpload(e.target.files[0])
                      }
                    />
                    <span className="text-sm text-gray-500">Importar CSV</span>
                  </label>
                  <button
                    className="px-3 py-1 bg-sky-600 text-white rounded"
                    onClick={() => {
                      setSelectedProduct(null);
                      setProductForm(emptyProduct);
                    }}
                  >
                    + Nuevo producto
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex gap-2 mb-3">
                  <input
                    className="border px-2 py-1 rounded flex-1"
                    placeholder="Buscar producto..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <select
                    className="border px-2 py-1 rounded"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">Todas las categorías</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-gray-600">
                      <tr>
                        <th className="p-2">Producto</th>
                        <th className="p-2">Categoría</th>
                        <th className="p-2">Precio</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2">Últ. actualización</th>
                        <th className="p-2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleInventory.map((p) => (
                        <tr key={p.productId} className="border-t">
                          <td className="p-2">{p.name}</td>
                          <td className="p-2">{p.category}</td>
                          <td className="p-2">
                            {formatMoney(p.price)} € / {p.unit}
                          </td>
                          <td
                            className={`p-2 ${
                              Number(p.stock) <= 5
                                ? "text-red-600 font-semibold"
                                : ""
                            }`}
                          >
                            {p.stock}
                          </td>
                          <td className="p-2">{p.lastUpdated}</td>
                          <td className="p-2">
                            <div className="flex gap-2">
                              <button
                                className="px-2 py-1 border rounded text-sm"
                                onClick={() => setSelectedProduct(p)}
                              >
                                Editar
                              </button>
                              <button
                                className="px-2 py-1 border rounded text-sm"
                                onClick={() => handleDeleteProduct(p.productId)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Product form */}
                <div className="mt-6 bg-gray-50 p-4 rounded">
                  <h3 className="font-medium mb-2">
                    {selectedProduct ? "Editar" : "Nuevo"} producto
                  </h3>
                  <form
                    onSubmit={handleSaveProduct}
                    className="grid grid-cols-2 gap-3"
                  >
                    <input
                      required
                      placeholder="Nombre"
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name: e.target.value })
                      }
                      className="border px-2 py-1 rounded"
                    />
                    <input
                      placeholder="Categoría"
                      value={productForm.category}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          category: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded"
                    />
                    <input
                      required
                      type="number"
                      step="0.01"
                      placeholder="Precio"
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          price: Number(e.target.value),
                        })
                      }
                      className="border px-2 py-1 rounded"
                    />
                    <input
                      placeholder="Unidad (ej. saco, m, unidad)"
                      value={productForm.unit}
                      onChange={(e) =>
                        setProductForm({ ...productForm, unit: e.target.value })
                      }
                      className="border px-2 py-1 rounded"
                    />
                    <input
                      required
                      type="number"
                      placeholder="Stock"
                      value={productForm.stock}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          stock: Number(e.target.value),
                        })
                      }
                      className="border px-2 py-1 rounded"
                    />
                    <input
                      placeholder="URL imagen"
                      value={productForm.image}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          image: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded"
                    />

                    <div className="col-span-2 flex justify-end gap-2 mt-2">
                      {selectedProduct && (
                        <button
                          type="button"
                          className="px-3 py-1 border rounded"
                          onClick={() => {
                            setSelectedProduct(null);
                            setProductForm(emptyProduct);
                          }}
                        >
                          Cancelar
                        </button>
                      )}
                      <button className="px-3 py-1 bg-sky-600 text-white rounded">
                        Guardar producto
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>

            {/* Promotions & Messages */}
            <section className="bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Promociones / Ofertas</h2>
                <PromotionForm onAdd={(p) => addPromotion(p)} />
              </div>

              <div className="mt-4">
                {promotions.length === 0 ? (
                  <div className="text-sm text-gray-500">
                    No hay promociones activas
                  </div>
                ) : (
                  promotions.map((pr) => (
                    <div key={pr.title} className="border-b py-2">
                      <div className="font-semibold">{pr.title}</div>
                      <div className="text-sm text-gray-600">
                        {pr.description}
                      </div>
                      <div className="text-xs text-gray-500">
                        {pr.startDate} → {pr.endDate}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </main>
        </div>
      ) : (
        // Public view
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded shadow mb-6 flex gap-6">
            <div className="w-28 h-28 bg-gray-100 rounded flex items-center justify-center">
              Logo
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{provider.name}</h2>
              <div className="text-sm text-gray-600">
                {provider.description}
              </div>
              <div className="mt-2 text-sm">
                📍 {provider.address} · ☎️ {provider.phone}
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="px-3 py-2 border rounded">Llamar</button>
              <button className="px-3 py-2 bg-sky-600 text-white rounded">
                WhatsApp
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow mb-4">
            <div className="flex items-center gap-3 mb-3">
              <input
                className="border px-2 py-1 rounded flex-1"
                placeholder="Buscar en la tienda..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <select
                className="border px-2 py-1 rounded"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">Todas las categorías</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {visibleInventory.map((p) => (
                <div key={p.productId} className="border p-3 rounded">
                  <div className="h-36 bg-gray-100 mb-2 flex items-center justify-center">
                    Imagen
                  </div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-gray-600">{p.category}</div>
                  <div className="mt-2 font-medium">
                    {formatMoney(p.price)} € / {p.unit}
                  </div>
                  <div className="text-sm mt-1">Stock: {p.stock}</div>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 border px-2 py-1 rounded">
                      Solicitar cotización
                    </button>
                    <button className="px-2 py-1 bg-sky-600 text-white rounded">
                      Contactar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-2">Opiniones</h3>
            {messages.length === 0 ? (
              <div className="text-sm text-gray-500">Aún no hay opiniones</div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className="border-b py-2">
                  {m}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Promotion Form component (local)
function PromotionForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) return alert("Título requerido");
    onAdd({ title, description, startDate, endDate });
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        required
        placeholder="Título promo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <input
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <button className="px-3 py-1 bg-sky-600 text-white rounded">
        Añadir
      </button>
    </form>
  );
}
