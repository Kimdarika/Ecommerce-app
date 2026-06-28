// User Types
export interface User {
    id: number
    name: string
    email: string
    phone?: string
    address?: string
    avatar?: string
    telegram_chat_id?: string
    role: 'admin' | 'customer'
    created_at?: string
    updated_at?: string
}

// Category Types
export interface Category {
    id: number
    name: string
    slug: string
    description?: string
    image?: string
    products_count?: number
    created_at?: string
    updated_at?: string
}

// Product Types
export interface Product {
    id: number
    category_id: number
    category?: Category
    name: string
    slug: string
    description: string
    price: number
    compare_price?: number
    stock_quantity: number
    sku: string
    image?: string
    gallery?: string[]
    status: 'active' | 'inactive'
    featured: boolean
    views: number
    average_rating?: number
    reviews_count?: number
    stock_status?: string
    created_at?: string
    updated_at?: string
}

// Cart Types
export interface CartItem {
    id: number
    user_id: number
    product_id: number
    product: Product
    quantity: number
    created_at?: string
    updated_at?: string
}

export interface CartResponse {
    items: CartItem[]
    total: number
    count: number
    total_items: number
}

// Wishlist Types
export interface WishlistItem {
    id: number
    user_id: number
    product_id: number
    product: Product
    created_at?: string
    updated_at?: string
}

// Order Types
export interface OrderItem {
    id: number
    order_id: number
    product_id: number
    product: Product
    quantity: number
    price: number
    created_at?: string
    updated_at?: string
}

export interface Order {
    id: number
    user_id: number
    order_number: string
    total_amount: number
    discount: number
    tax: number
    shipping_cost: number
    status: 'pending' | 'processing' | 'completed' | 'cancelled'
    shipping_address: string
    billing_address?: string
    payment_method: string
    payment_status: string
    notes?: string
    items: OrderItem[]
    user?: User
    created_at?: string
    updated_at?: string
}

// Review Types
export interface Review {
    id: number
    user_id: number
    product_id: number
    user: User
    rating: number
    comment?: string
    verified_purchase: boolean
    created_at?: string
    updated_at?: string
}

// API Response Types
export interface ApiResponse<T = any> {
    success: boolean
    message: string
    data?: T
}

export interface PaginatedResponse<T = any> {
    current_page: number
    data: T[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: any[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}

// Auth Types
export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterData {
    name: string
    email: string
    password: string
    password_confirmation: string
    phone?: string
}

export interface AuthResponse {
    success: boolean
    message: string
    user: User
    token: string
}
