import React, { useState, createContext, useContext } from "react";
import {
  ShoppingCart,
  User,
  Package,
  LogOut,
  Search,
  Plus,

  Minus,
  Trash2,
  Eye,
} from "lucide-react";

const AppContext = createContext();

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const mockProducts = [
  {
    _id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling headphones",
    price: 199.99,
    stockQuantity: 50,
    category: "Electronics",
  },
  {
    _id: "2",
    name: "Smart Watch",
    description: "Fitness tracking smartwatch",
    price: 299.99,
    stockQuantity: 30,
    category: "Electronics",
  },
  {
    _id: "3",
    name: "Laptop Backpack",
    description: "Durable laptop backpack with USB port",
    price: 49.99,
    stockQuantity: 100,
    category: "Accessories",
  },
  {
    _id: "4",
    name: "Bluetooth Speaker",
    description: "Portable waterproof speaker",
    price: 79.99,
    stockQuantity: 75,
    category: "Electronics",
  },
  {
    _id: "5",
    name: "Phone Case",
    description: "Protective phone case",
    price: 19.99,
    stockQuantity: 200,
    category: "Accessories",
  },
  {
    _id: "6",
    name: "USB-C Cable",
    description: "Fast charging cable 6ft",
    price: 12.99,
    stockQuantity: 150,
    category: "Accessories",
  },
];

const AuthPage = () => {
  const { setUser, setToken } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    FullName: "",
    contactNumber: "",
    role: "customer",
  });

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    if (!isLogin && (!formData.FullName || !formData.contactNumber)) {
      alert("Please fill all fields");
      return;
    }

    const mockUser = {
      _id: "demo-user",
      email: formData.email,
      FullName: formData.FullName || "Demo User",
      role: formData.role,
    };
    const mockToken = "demo-token-" + Date.now();

    setUser(mockUser);
    setToken(mockToken);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <ShoppingCart className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">ShopHub</h1>
          <p className="text-gray-600 mt-2">Your favorite online store</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              isLogin ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              !isLogin
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Register
          </button>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.FullName}
                onChange={(e) =>
                  setFormData({ ...formData, FullName: e.target.value })
                }
              />
              <input
                type="tel"
                placeholder="Contact Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
              />
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
              </select>
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Demo mode: Any credentials will work
        </p>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
        <Package className="w-20 h-20 text-indigo-400" />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-indigo-600">
            ${product.price}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stockQuantity}
          </span>
        </div>

        <div className="flex gap-2 mb-3">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 border-x border-gray-300">
              {quantity}
            </span>
            <button
              onClick={() =>
                setQuantity(Math.min(product.stockQuantity, quantity + 1))
              }
              className="px-3 py-2 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {showDetails && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg text-sm">
            <p className="text-gray-700">{product.description}</p>
          </div>
        )}

        <button
          onClick={() => onAddToCart(product._id, quantity)}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const { cart, setCart } = useApp();
  const [products] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const categories = ["all", ...new Set(mockProducts.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (productId, quantity) => {
    const existingItem = cart.find((item) => item.productId === productId);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { _id: Date.now().toString(), productId, quantity }]);
    }
    alert("Added to cart!");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Browse Products
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

const CartPage = () => {
  const { cart, setCart, setOrders } = useApp();
  const products = mockProducts;

  const cartWithProducts = cart.map((item) => ({
    ...item,
    product: products.find((p) => p._id === item.productId),
  }));

  const total = cartWithProducts.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item._id === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (cartId) => {
    setCart(cart.filter((item) => item._id !== cartId));
  };

  const handleCheckout = () => {
    const order = {
      _id: Date.now().toString(),
      productIds: cart.map((item) => item.productId),
      totalAmount: total,
      status: "processing",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [...prev, order]);
    setCart([]);
    alert("Order placed successfully!");
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>

        <div className="space-y-4">
          {cartWithProducts.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-12 h-12 text-indigo-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">
                  {item.product?.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {item.product?.description}
                </p>
                <p className="text-indigo-600 font-bold">
                  ${item.product?.price}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1 border-x border-gray-300">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-bold text-gray-800">
                  ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-indigo-600">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const { orders } = useApp();
  const products = mockProducts;

  const getStatusColor = (status) => {
    const colors = {
      processing: "bg-yellow-100 text-yellow-800",
      shipped: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <Package className="w-24 h-24 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
        <p className="text-gray-600">Your orders will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {order.productIds.map((productId) => {
                  const product = products.find((p) => p._id === productId);
                  return product ? (
                    <div key={productId} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded flex items-center justify-center">
                        <Package className="w-6 h-6 text-indigo-400" />
                      </div>
                      <span className="text-gray-700">{product.name}</span>
                    </div>
                  ) : null;
                })}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="font-semibold text-gray-800">
                  Total Amount:
                </span>
                <span className="text-xl font-bold text-indigo-600">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [currentPage, setCurrentPage] = useState("products");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    setOrders([]);
  };

  if (!user || !token) {
    return (
      <AppContext.Provider value={{ setUser, setToken }}>
        <AuthPage />
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider
      value={{ user, token, cart, setCart, orders, setOrders }}
    >
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-8 h-8 text-indigo-600" />
                <h1 className="text-2xl font-bold text-gray-800">ShopHub</h1>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage("products")}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    currentPage === "products"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setCurrentPage("cart")}
                  className={`px-4 py-2 rounded-lg font-semibold transition relative ${
                    currentPage === "cart"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setCurrentPage("orders")}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    currentPage === "orders"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Orders
                </button>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">
                    {user.FullName}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {currentPage === "products" && <ProductsPage />}
          {currentPage === "cart" && <CartPage />}
          {currentPage === "orders" && <OrdersPage />}
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
