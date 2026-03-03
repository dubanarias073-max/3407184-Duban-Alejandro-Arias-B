/**
 * ⚰️ Sistema de Gestión de Cementerios
 * Dashboard Analítico - Week 05
 * Métodos avanzados ES2023
 */

// ============================================
// DATOS DE EJEMPLO - SISTEMA DE CEMENTERIOS
// ============================================

const salesData = [
  {
    id: 'SER001',
    date: '2024-01-10',
    customer: 'Familia García',
    region: 'Norte',
    items: [
      { product: 'Sepultura', category: 'Inhumación', price: 1500, qty: 1 },
      { product: 'Lápida Mármol', category: 'Accesorios', price: 800, qty: 1 }
    ],
    status: 'completed'
  },
  {
    id: 'SER002',
    date: '2024-02-05',
    customer: 'Familia López',
    region: 'Sur',
    items: [
      { product: 'Cremación', category: 'Cremación', price: 1200, qty: 1 }
    ],
    status: 'completed'
  },
  {
    id: 'SER003',
    date: '2024-02-18',
    customer: 'Familia Torres',
    region: 'Este',
    items: [
      { product: 'Nicho', category: 'Espacios', price: 2000, qty: 1 }
    ],
    status: 'completed'
  },
  {
    id: 'SER004',
    date: '2024-03-02',
    customer: 'Familia Ruiz',
    region: 'Oeste',
    items: [
      { product: 'Mantenimiento Anual', category: 'Servicios', price: 300, qty: 2 }
    ],
    status: 'pending'
  },
  {
    id: 'SER005',
    date: '2024-03-20',
    customer: 'Familia García',
    region: 'Norte',
    items: [
      { product: 'Exhumación', category: 'Servicios', price: 1000, qty: 1 }
    ],
    status: 'completed'
  },
  {
    id: 'SER006',
    date: '2024-03-22',
    customer: 'Familia Vega',
    region: 'Norte',
    items: [
      { product: 'Lápida Granito', category: 'Accesorios', price: 900, qty: 1 }
    ],
    status: 'completed'
  },
  {
    id: 'SER007',
    date: '2024-04-01',
    customer: 'Familia Martínez',
    region: 'Sur',
    items: [
      { product: 'Inhumación', category: 'Inhumación', price: 1500, qty: 1 }
    ],
    status: 'completed'
  },
  {
    id: 'SER008',
    date: '2024-04-05',
    customer: 'Familia Torres',
    region: 'Este',
    items: [
      { product: 'Mantenimiento Trimestral', category: 'Servicios', price: 100, qty: 3 }
    ],
    status: 'completed'
  },
  {
    id: 'SER009',
    date: '2024-04-10',
    customer: 'Familia Ruiz',
    region: 'Oeste',
    items: [
      { product: 'Cremación', category: 'Cremación', price: 1200, qty: 1 }
    ],
    status: 'completed'
  },
  {
    id: 'SER010',
    date: '2024-04-15',
    customer: 'Familia García',
    region: 'Norte',
    items: [
      { product: 'Sepultura', category: 'Inhumación', price: 1500, qty: 2 }
    ],
    status: 'completed'
  }
];

// ============================================
// FUNCIONES DE ANÁLISIS
// ============================================

// 1. Obtener todos los items con contexto
const getAllItems = orders =>
  orders.flatMap(order =>
    order.items.map(item => ({
      orderId: order.id,
      date: order.date,
      region: order.region,
      customer: order.customer,
      ...item,
    }))
  );

// 2. Calcular total por orden
const getOrderTotals = orders =>
  orders.map(order => {
    const total = order.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    return {
      id: order.id,
      customer: order.customer,
      date: order.date,
      status: order.status,
      total,
    };
  });

// 3. Top clientes (por total comprado)
const getTopCustomers = (orders, n = 5) =>
  Object.values(
    orders
      .filter(o => o.status === 'completed')
      .reduce((acc, order) => {
        const total = order.items.reduce(
          (sum, item) => sum + item.price * item.qty,
          0
        );

        acc[order.customer] = acc[order.customer] ?? {
          customer: order.customer,
          total: 0,
          orderCount: 0,
        };

        acc[order.customer].total += total;
        acc[order.customer].orderCount += 1;

        return acc;
      }, {})
  )
    .toSorted((a, b) => b.total - a.total)
    .slice(0, n);

// 4. Ventas por región
const getSalesByRegion = orders =>
  orders
    .filter(o => o.status === 'completed')
    .reduce((acc, order) => {
      const total = order.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );

      acc[order.region] = (acc[order.region] ?? 0) + total;
      return acc;
    }, {});

// 5. Ventas por categoría
const getSalesByCategory = orders =>
  orders
    .filter(o => o.status === 'completed')
    .flatMap(o => o.items)
    .reduce((acc, item) => {
      const revenue = item.price * item.qty;
      acc[item.category] = (acc[item.category] ?? 0) + revenue;
      return acc;
    }, {});

// 6. Servicios más solicitados (por cantidad)
const getTopProducts = (orders, limit = 10) =>
  Object.values(
    orders
      .filter(o => o.status === 'completed')
      .flatMap(o => o.items)
      .reduce((acc, item) => {
        acc[item.product] = acc[item.product] ?? {
          product: item.product,
          totalQty: 0,
          totalRevenue: 0,
        };

        acc[item.product].totalQty += item.qty;
        acc[item.product].totalRevenue += item.price * item.qty;

        return acc;
      }, {})
  )
    .toSorted((a, b) => b.totalQty - a.totalQty)
    .slice(0, limit);

// 7. Filtrar órdenes por rango de fechas
const filterOrdersByDate = (orders, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return orders.filter(order => {
    const current = new Date(order.date);
    return current >= start && current <= end;
  });
};

// 8. Estadísticas generales
const getGeneralStats = orders => {
  const completed = orders.filter(o => o.status === 'completed');

  const stats = completed.reduce(
    (acc, order) => {
      const orderTotal = order.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );

      const itemCount = order.items.reduce(
        (sum, item) => sum + item.qty,
        0
      );

      acc.totalSales += orderTotal;
      acc.orderCount += 1;
      acc.totalItems += itemCount;
      acc.maxOrder = Math.max(acc.maxOrder, orderTotal);
      acc.minOrder =
        acc.minOrder === 0
          ? orderTotal
          : Math.min(acc.minOrder, orderTotal);

      return acc;
    },
    {
      totalSales: 0,
      orderCount: 0,
      avgPerOrder: 0,
      maxOrder: 0,
      minOrder: 0,
      totalItems: 0,
    }
  );

  stats.avgPerOrder =
    stats.orderCount > 0
      ? stats.totalSales / stats.orderCount
      : 0;

  return stats;
};

// 9. Tendencia mensual
const getMonthlyTrend = orders =>
  Object.values(
    orders
      .filter(o => o.status === 'completed')
      .reduce((acc, order) => {
        const month = order.date.slice(0, 7);

        const total = order.items.reduce(
          (sum, item) => sum + item.price * item.qty,
          0
        );

        acc[month] = acc[month] ?? {
          month,
          total: 0,
          orderCount: 0,
        };

        acc[month].total += total;
        acc[month].orderCount += 1;

        return acc;
      }, {})
  ).toSorted((a, b) => a.month.localeCompare(b.month));

// 10. Generar reporte completo
const generateReport = orders => {
  // findLast y findLastIndex son ES2023
  const lastCompleted = orders.findLast(
    o => o.status === 'completed'
  );

  const lastPendingIndex = orders.findLastIndex(
    o => o.status === 'pending'
  );

  // Uso de with() para actualización inmutable
  const updatedOrders =
    lastPendingIndex !== -1
      ? orders.with(lastPendingIndex, {
          ...orders[lastPendingIndex],
          status: 'completed',
        })
      : orders;

  console.log('Última orden completada:', lastCompleted?.id);
  console.log('Índice última orden pendiente:', lastPendingIndex);
  console.log('Ejemplo uso with():', updatedOrders);

  return {
    generatedAt: new Date().toISOString(),
    stats: getGeneralStats(updatedOrders),
    topCustomers: getTopCustomers(updatedOrders, 5),
    salesByRegion: getSalesByRegion(updatedOrders),
    salesByCategory: getSalesByCategory(updatedOrders),
    topProducts: getTopProducts(updatedOrders, 5),
    monthlyTrend: getMonthlyTrend(updatedOrders),
  };
};

// ============================================
// FUNCIONES DE RENDERIZADO (ya definidas en tu starter)
// ============================================

const formatCurrency = amount =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

const renderStats = stats => {
  document.getElementById('total-sales').textContent = formatCurrency(
    stats.totalSales
  );
  document.getElementById('total-orders').textContent = stats.orderCount;
  document.getElementById('avg-order').textContent = formatCurrency(
    stats.avgPerOrder
  );
  document.getElementById('total-items').textContent = stats.totalItems;
};

const renderTopCustomers = customers => {
  const container = document.getElementById('top-customers');
  if (!customers.length) {
    container.innerHTML = '<p class="loading">Sin datos</p>';
    return;
  }
  container.innerHTML = customers
    .map(
      (c, i) => `
      <div class="list-item">
        <span class="rank">${i + 1}</span>
        <span class="name">${c.customer} (${c.orderCount} órdenes)</span>
        <span class="value">${formatCurrency(c.total)}</span>
      </div>`
    )
    .join('');
};

const renderSalesByRegion = regionData => {
  const container = document.getElementById('sales-by-region');
  const entries = Object.entries(regionData);
  if (!entries.length) {
    container.innerHTML = '<p class="loading">Sin datos</p>';
    return;
  }
  const max = Math.max(...entries.map(([, v]) => v));
  container.innerHTML = entries
    .sort((a, b) => b[1] - a[1])
    .map(
      ([region, total]) => `
      <div class="list-item">
        <span class="name">${region}</span>
        <span class="value">${formatCurrency(total)}</span>
      </div>
      <div class="progress-bar">
        <div class="fill" style="width: ${(total / max) * 100}%"></div>
      </div>`
    )
    .join('');
};

const renderSalesByCategory = categoryData => {
  const container = document.getElementById('sales-by-category');
  const entries = Object.entries(categoryData);
  if (!entries.length) {
    container.innerHTML = '<p class="loading">Sin datos</p>';
    return;
  }
  const max = Math.max(...entries.map(([, v]) => v));
  container.innerHTML = entries
    .sort((a, b) => b[1] - a[1])
    .map(
      ([category, total]) => `
      <div class="list-item">
        <span class="name">${category}</span>
        <span class="value">${formatCurrency(total)}</span>
      </div>
      <div class="progress-bar">
        <div class="fill" style="width: ${(total / max) * 100}%"></div>
      </div>`
    )
    .join('');
};

const renderTopProducts = products => {
  const container = document.getElementById('top-products');
  if (!products.length) {
    container.innerHTML = '<p class="loading">Sin datos</p>';
    return;
  }
  container.innerHTML = products
    .map(
      (p, i) => `
      <div class="list-item">
        <span class="rank">${i + 1}</span>
        <span class="name">${p.product} (${p.totalQty} uds)</span>
        <span class="value">${formatCurrency(p.totalRevenue)}</span>
      </div>`
    )
    .join('');
};

const renderMonthlyTrend = trendData => {
  const container = document.getElementById('monthly-trend');
  if (!trendData.length) {
    container.innerHTML = '<p class="loading">Sin datos</p>';
    return;
  }
  const max = Math.max(...trendData.map(t => t.total));
  container.innerHTML = trendData
    .map(
      t => `
      <div class="trend-bar" style="height: ${(t.total / max) * 100}%">
        <span class="amount">${formatCurrency(t.total)}</span>
        <span class="label">${t.month}</span>
      </div>`
    )
    .join('');
};

const renderRecentOrders = orders => {
  const container = document.getElementById('recent-orders');
  const orderTotals = getOrderTotals(orders);
  const recent = [...orderTotals]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (!recent.length) {
    container.innerHTML = '<p class="loading">Sin datos</p>';
    return;
  }

  container.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Fecha</th>
          <th>Cliente</th>
          <th>Total</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        ${recent
          .map(
            o => `
          <tr>
            <td>${o.id}</td>
            <td>${o.date}</td>
            <td>${o.customer}</td>
            <td>${formatCurrency(o.total)}</td>
            <td><span class="status ${o.status}">${o.status}</span></td>
          </tr>`
          )
          .join('')}
      </tbody>
    </table>
  `;
};

// ============================================
// INICIALIZACIÓN DEL DASHBOARD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('⚰️ Inicializando Sistema de Cementerios...');

  const report = generateReport(salesData);

  renderStats(report.stats);
  renderTopCustomers(report.topCustomers);
  renderSalesByRegion(report.salesByRegion);
  renderSalesByCategory(report.salesByCategory);
  renderTopProducts(report.topProducts);
  renderMonthlyTrend(report.monthlyTrend);
  renderRecentOrders(salesData);

  console.log('✅ Dashboard listo');
});