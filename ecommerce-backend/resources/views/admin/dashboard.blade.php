@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')
<div class="page-header">
    <h2>Dashboard</h2>
    <p class="text-muted">Welcome back, {{ Auth::user()->name }}!</p>
</div>

<div class="row g-4">
    <div class="col-md-3">
        <div class="stat-card">
            <div class="d-flex justify-content-between">
                <div>
                    <h6 class="text-muted">Total Products</h6>
                    <h3 class="mb-0">{{ $stats['products'] }}</h3>
                </div>
                <div class="icon bg-primary bg-opacity-10 text-primary">
                    <i class="fas fa-box"></i>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-md-3">
        <div class="stat-card">
            <div class="d-flex justify-content-between">
                <div>
                    <h6 class="text-muted">Total Orders</h6>
                    <h3 class="mb-0">{{ $stats['orders'] }}</h3>
                </div>
                <div class="icon bg-success bg-opacity-10 text-success">
                    <i class="fas fa-shopping-cart"></i>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-md-3">
        <div class="stat-card">
            <div class="d-flex justify-content-between">
                <div>
                    <h6 class="text-muted">Total Revenue</h6>
                    <h3 class="mb-0">${{ number_format($stats['revenue'], 2) }}</h3>
                </div>
                <div class="icon bg-warning bg-opacity-10 text-warning">
                    <i class="fas fa-dollar-sign"></i>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-md-3">
        <div class="stat-card">
            <div class="d-flex justify-content-between">
                <div>
                    <h6 class="text-muted">Total Users</h6>
                    <h3 class="mb-0">{{ $stats['users'] }}</h3>
                </div>
                <div class="icon bg-info bg-opacity-10 text-info">
                    <i class="fas fa-users"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row mt-4">
    <div class="col-md-8">
        <div class="table-container">
            <h5 class="mb-3">Recent Orders</h5>
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Order #</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($recentOrders as $order)
                        <tr>
                            <td>{{ $order->order_number }}</td>
                            <td>{{ $order->user->name }}</td>
                            <td>${{ number_format($order->total_amount, 2) }}</td>
                            <td>
                                <span class="badge bg-{{ $order->status == 'pending' ? 'warning' : ($order->status == 'completed' ? 'success' : 'info') }}">
                                    {{ ucfirst($order->status) }}
                                </span>
                            </td>
                            <td>{{ $order->created_at->format('M d, Y') }}</td>
                            <td>
                                <a href="{{ route('admin.orders.show', $order) }}" class="btn btn-sm btn-primary">
                                    <i class="fas fa-eye"></i>
                                </a>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <div class="col-md-4">
        <div class="table-container">
            <h5 class="mb-3">Quick Actions</h5>
            <div class="d-grid gap-2">
                <a href="{{ route('admin.products.create') }}" class="btn btn-primary">
                    <i class="fas fa-plus"></i> Add Product
                </a>
                <a href="{{ route('admin.categories.create') }}" class="btn btn-secondary">
                    <i class="fas fa-plus"></i> Add Category
                </a>
                <a href="{{ route('admin.orders.index') }}" class="btn btn-info text-white">
                    <i class="fas fa-eye"></i> View All Orders
                </a>
            </div>
        </div>
    </div>
</div>
@endsection