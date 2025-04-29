"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { SignedIn, UserButton } from "@clerk/nextjs";

// Type definitions
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
  sales: number;
}

interface Review {
  id: number;
  productId: number;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

interface Order {
  id: number;
  customerName: string;
  productId: number;
  quantity: number;
  total: number;
  status: OrderStatus;
  date: string;
}

interface DashboardStats {
  totalProducts: number;
  totalSales: number;
  averageRating: number;
  totalRevenue: number;
}

// Mock data for initial state
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Bluetooth Headphones",
    price: 59.99,
    stock: 45,
    category: "Electronics",
    rating: 4.2,
    sales: 120,
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    stock: 78,
    category: "Clothing",
    rating: 4.5,
    sales: 89,
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    price: 19.99,
    stock: 32,
    category: "Home & Kitchen",
    rating: 4.7,
    sales: 210,
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: 29.99,
    stock: 18,
    category: "Electronics",
    rating: 3.9,
    sales: 67,
  },
];

const MOCK_REVIEWS = [
  {
    id: 1,
    productId: 1,
    customerName: "Alex Johnson",
    rating: 5,
    comment:
      "Great sound quality and comfortable to wear for long periods. Battery life is as advertised!",
    date: "2025-04-20",
  },
  {
    id: 2,
    productId: 3,
    customerName: "Maria Garcia",
    rating: 4,
    comment:
      "Keeps my drinks cold for hours. The only issue is it's a bit heavy.",
    date: "2025-04-18",
  },
  {
    id: 3,
    productId: 2,
    customerName: "David Kim",
    rating: 5,
    comment: "Soft material and fits perfectly. Will buy in more colors!",
    date: "2025-04-15",
  },
  {
    id: 4,
    productId: 1,
    customerName: "Sarah Thompson",
    rating: 3,
    comment:
      "Average headphones for the price. Expected better noise cancellation.",
    date: "2025-04-10",
  },
  {
    id: 5,
    productId: 4,
    customerName: "Michael Brown",
    rating: 4,
    comment: "Works well with my phone, but charging is a bit slow.",
    date: "2025-04-05",
  },
];

// Mock orders data
const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    customerName: "Emily Wilson",
    productId: 3,
    quantity: 2,
    total: 39.98,
    status: "Delivered",
    date: "2025-04-22",
  },
  {
    id: 2,
    customerName: "James Miller",
    productId: 1,
    quantity: 1,
    total: 59.99,
    status: "Shipped",
    date: "2025-04-21",
  },
  {
    id: 3,
    customerName: "Olivia Davis",
    productId: 2,
    quantity: 3,
    total: 74.97,
    status: "Processing",
    date: "2025-04-20",
  },
  {
    id: 4,
    customerName: "Robert Johnson",
    productId: 4,
    quantity: 1,
    total: 29.99,
    status: "Cancelled",
    date: "2025-04-18",
  },
  {
    id: 5,
    customerName: "Sophia Martinez",
    productId: 2,
    quantity: 2,
    total: 49.98,
    status: "Shipped",
    date: "2025-04-15",
  },
];

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalSales: 0,
    averageRating: 0,
    totalRevenue: 0,
  });
  const [filterCategory, setFilterCategory] = useState("all");
  const [reviewFilter, setReviewFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<
    Omit<Product, "id" | "rating" | "sales">
  >({
    name: "",
    price: 0,
    stock: 0,
    category: "Electronics",
  });

  // Load mock data
  useEffect(() => {
    setProducts(MOCK_PRODUCTS);
    setReviews(MOCK_REVIEWS);
    setOrders(MOCK_ORDERS);
  }, [filterCategory]);

  // Calculate dashboard stats
  useEffect(() => {
    if (products.length) {
      const totalProducts = products.length;
      const totalSales = products.reduce(
        (sum, product) => sum + product.sales,
        0
      );

      // Calculate total revenue
      const totalRevenue = products.reduce((sum, product) => {
        return sum + product.price * product.sales;
      }, 0);

      // Calculate average rating
      const totalRating = products.reduce(
        (sum, product) => sum + product.rating,
        0
      );
      const averageRating = totalRating / totalProducts;

      setStats({
        totalProducts,
        totalSales,
        averageRating,
        totalRevenue,
      });
    }
  }, [products]);

  // Filter products based on category and search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter reviews based on product
  const filteredReviews = reviews.filter((review) => {
    return (
      reviewFilter === "all" || review.productId.toString() === reviewFilter
    );
  });

  // Handle adding a new product
  const handleAddProduct = () => {
    const id = Math.max(0, ...products.map((p) => p.id)) + 1;
    const newProductWithId = {
      ...newProduct,
      id,
      rating: 0,
      sales: 0,
    };

    setProducts([...products, newProductWithId]);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      category: "Electronics",
    });
    setShowAddProductModal(false);
  };

  // Handle editing a product
  const handleEditProductClick = (product: Product) => {
    setCurrentProduct(product);
    setShowEditProductModal(true);
  };

  // Handle saving edited product
  const handleSaveEditedProduct = () => {
    if (currentProduct) {
      setProducts(
        products.map((p) => (p.id === currentProduct.id ? currentProduct : p))
      );
      setShowEditProductModal(false);
      setCurrentProduct(null);
    }
  };

  // Handle removing a product
  const handleRemoveProduct = (id: number) => {
    if (confirm("Are you sure you want to remove this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  // Handle input change for new product form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`); // Debug log
    setNewProduct({
      ...newProduct,
      [name]:
        name === "price" || name === "stock"
          ? value === ""
            ? 0
            : parseFloat(value) || 0
          : value,
    });
  };

  // Handle input change for editing a product
  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (currentProduct) {
      const { name, value } = e.target;
      setCurrentProduct({
        ...currentProduct,
        [name]:
          name === "price" || name === "stock" ? parseFloat(value) : value,
      });
    }
  };

  // Handle responding to a review
  const handleRespondToReview = (reviewId: number) => {
    // This would typically involve an API call to save the response
    alert(`Response to review ${reviewId} submitted.`);
  };

  return (
    <>
      <Head>
        <title>Seller Dashboard | E-Commerce Store</title>
        <meta
          name="description"
          content="Manage your products and view customer reviews"
        />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-blue-600">
                    Quick Basket
                  </span>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Seller Dashboard
            </h1>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tabs */}
            <div className="border-b border-gray-200 mt-6">
              <div className="sm:flex sm:items-baseline">
                <div className="mt-4 sm:mt-0">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`${
                        activeTab === "overview"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("products")}
                      className={`${
                        activeTab === "products"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      Products
                    </button>
                    <button
                      onClick={() => setActiveTab("reviews")}
                      className={`${
                        activeTab === "reviews"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      Reviews
                    </button>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className={`${
                        activeTab === "orders"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      Orders
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            {/* Tab content */}
            <div className="py-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Stat Card - Total Products */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                            <svg
                              className="h-6 w-6 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              />
                            </svg>
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Total Products
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                {stats.totalProducts}
                              </div>
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stat Card - Total Sales */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                            <svg
                              className="h-6 w-6 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                              />
                            </svg>
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Total Sales
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                {stats.totalSales}
                              </div>
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stat Card - Average Rating */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                            <svg
                              className="h-6 w-6 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Average Rating
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                {stats.averageRating.toFixed(1)}
                              </div>
                              <div className="ml-2 flex items-baseline text-sm font-semibold text-yellow-500">
                                {/* Star icon */}
                                <svg
                                  className="self-center flex-shrink-0 h-5 w-5 text-yellow-400"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stat Card - Total Revenue */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                            <svg
                              className="h-6 w-6 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Total Revenue
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                Rs. 
                                {stats.totalRevenue.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </div>
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity Section */}
                  <div className="mt-8">
                    <h2 className="text-lg font-medium text-gray-900">
                      Recent Activity
                    </h2>
                    <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                      <ul className="divide-y divide-gray-200">
                        {reviews.slice(0, 3).map((review) => {
                          const product = products.find(
                            (p) => p.id === review.productId
                          );
                          return (
                            <li key={review.id}>
                              <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-blue-600 truncate">
                                    New review for{" "}
                                    {product?.name || "Unknown Product"}
                                  </p>
                                  <div className="ml-2 flex-shrink-0 flex">
                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      {review.rating} ★
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                  <div className="sm:flex">
                                    <p className="flex items-center text-sm text-gray-500">
                                      {review.comment.substring(0, 100)}
                                      {review.comment.length > 100 ? "..." : ""}
                                    </p>
                                  </div>
                                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                    <p>
                                      From {review.customerName} on{" "}
                                      {new Date(
                                        review.date
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* Recent Orders Section */}
                  <div className="mt-8">
                    <h2 className="text-lg font-medium text-gray-900">
                      Recent Orders
                    </h2>
                    <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                      <ul className="divide-y divide-gray-200">
                        {orders.slice(0, 3).map((order) => {
                          const product = products.find(
                            (p) => p.id === order.productId
                          );
                          return (
                            <li key={order.id}>
                              <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-blue-600 truncate">
                                    ID  {order.id} : {" "}
                                    {product?.name || "Unknown Product"} (
                                    {order.quantity})
                                  </p>
                                  <div className="ml-2 flex-shrink-0 flex">
                                    <p
                                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        order.status === "Delivered"
                                          ? "bg-green-100 text-green-800"
                                          : order.status === "Shipped"
                                          ? "bg-blue-100 text-blue-800"
                                          : order.status === "Processing"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {order.status}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                  <div className="sm:flex">
                                    <p className="flex items-center text-sm text-gray-500">
                                      Total: Rs. {order.total.toFixed(2)}
                                    </p>
                                  </div>
                                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                    <p>
                                      From {order.customerName} on{" "}
                                      {new Date(
                                        order.date
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Products Tab */}
              {activeTab === "products" && (
                <div>
                  <div className="mb-5 flex flex-col sm:flex-row justify-between items-center">
                    <div className="w-full sm:w-auto mb-4 sm:mb-0">
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="search"
                          id="search"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="Search products"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <select
                          id="category"
                          name="category"
                          className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={filterCategory}
                          onChange={(e) => setFilterCategory(e.target.value)}
                        >
                          <option value="all">All Categories</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Home & Kitchen">Home & Kitchen</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAddProductModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Add Product
                      </button>
                    </div>
                  </div>

                  {/* Products Table */}
                  <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Product
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Category
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Price
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Stock
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Rating
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Sales
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                  <span className="sr-only">Actions</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {product.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.category}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Rs. {product.price.toFixed(2)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.stock}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <span className="text-sm text-gray-900">
                                        {product.rating.toFixed(1)}
                                      </span>
                                      <svg
                                        className="ml-1 h-4 w-4 text-yellow-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.sales}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                      onClick={() =>
                                        handleEditProductClick(product)
                                      }
                                      className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleRemoveProduct(product.id)
                                      }
                                      className="text-red-600 hover:text-red-900"
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div>
                  <div className="mb-5 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">
                      Customer Reviews
                    </h2>
                    <div>
                      <select
                        id="reviewFilter"
                        name="reviewFilter"
                        className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={reviewFilter}
                        onChange={(e) => setReviewFilter(e.target.value)}
                      >
                        <option value="all">All Products</option>
                        {products.map((product) => (
                          <option
                            key={product.id}
                            value={product.id.toString()}
                          >
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {filteredReviews.length > 0 ? (
                        filteredReviews.map((review) => {
                          const product = products.find(
                            (p) => p.id === review.productId
                          );
                          return (
                            <li key={review.id} className="px-4 py-5 sm:px-6">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                  Review for{" "}
                                  {product?.name || "Unknown Product"}
                                </h3>
                                <div className="flex items-center">
                                  <span className="text-sm text-gray-600 mr-2">
                                    Rating:
                                  </span>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <svg
                                        key={i}
                                        className={`h-5 w-5 ${
                                          i < review.rating
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4">
                                <p className="text-sm text-gray-500">
                                  {review.comment}
                                </p>
                              </div>
                              <div className="mt-4 flex justify-between items-center">
                                <div className="flex items-center text-sm text-gray-500">
                                  <svg
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  {review.customerName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="mt-4">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRespondToReview(review.id)
                                  }
                                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                  Respond to Review
                                </button>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <li className="px-4 py-5 sm:px-6 text-center text-gray-500">
                          No reviews found for the selected product.
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <div className="mb-5 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">
                      Customer Orders
                    </h2>
                  </div>

                  {/* Orders Table */}
                  <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Order ID
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Customer
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Product
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Quantity
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Total
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Status
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Date
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                  <span className="sr-only">Actions</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {orders.map((order) => {
                                const product = products.find(
                                  (p) => p.id === order.productId
                                );
                                return (
                                  <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {order.customerName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {product?.name || "Unknown Product"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {order.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      Rs. {order.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                          order.status === "Delivered"
                                            ? "bg-green-100 text-green-800"
                                            : order.status === "Shipped"
                                            ? "bg-blue-100 text-blue-800"
                                            : order.status === "Processing"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                      >
                                        {order.status}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {new Date(
                                        order.date
                                      ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <button className="text-blue-600 hover:text-blue-900">
                                        Details
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Add New Product
                  </h3>
                  <div className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={newProduct.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={newProduct.category}
                          onChange={handleInputChange}
                        >
                          <option value="Electronics">Electronics</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Home & Kitchen">Home & Kitchen</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price (Rs.)
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={newProduct.price}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="stock"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Stock
                        </label>
                        <input
                          type="number"
                          name="stock"
                          id="stock"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={newProduct.stock}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={handleAddProduct}
                >
                  Add Product
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowAddProductModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditProductModal && currentProduct && (
        <div className="fixed z-10 inset-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Edit Product
                  </h3>
                  <div className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="edit-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="edit-name"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={currentProduct.name}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="edit-category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                        <select
                          id="edit-category"
                          name="category"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={currentProduct.category}
                          onChange={handleEditInputChange}
                        >
                          <option value="Electronics">Electronics</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Home & Kitchen">Home & Kitchen</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="edit-price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price ($)
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="edit-price"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={currentProduct.price}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="edit-stock"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Stock
                        </label>
                        <input
                          type="number"
                          name="stock"
                          id="edit-stock"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={currentProduct.stock}
                          onChange={handleEditInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={handleSaveEditedProduct}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    setShowEditProductModal(false);
                    setCurrentProduct(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
