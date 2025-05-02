// Mock data for admin dashboard

// Dashboard overview stats
export function getAdminDashboardStats() {
  return {
    totalUsers: 2473,
    standardUsers: 2459,
    adminUsers: 14,
    totalSales: 18934,
    revenue: 1249650.75,
    activeSubscriptions: 983,
    averageOrderValue: 65.99,
  };
}

// Recent users
export function getRecentUsers(limit = 10) {
  const users = [];

  for (let i = 0; i < limit; i++) {
    users.push({
      id: `user_${Math.random().toString(36).substring(2, 7)}`,
      name: `${getRandomName()} ${getRandomLastName()}`,
      email: `${getRandomName().toLowerCase()}${Math.floor(
        Math.random() * 1000
      )}@example.com`,
      joinDate: getRandomDate(new Date(2023, 0, 1), new Date()),
      isAdmin: Math.random() < 0.05, // 5% chance of being admin
    });
  }

  return users.sort((a, b) => b.joinDate.getTime() - a.joinDate.getTime());
}

// Recent orders
export function getRecentOrders(limit = 10) {
  const orders = [];
  const products = [
    { name: "Vitalis Vision", price: 79 },
    { name: "Vitalis Neuro", price: 89 },
    { name: "Vitalis Fortify", price: 85 },
    { name: "Complete Bundle", price: 199 },
  ];

  for (let i = 0; i < limit; i++) {
    const numItems = Math.floor(Math.random() * 3) + 1;
    const selectedProducts = [];
    let subtotal = 0;

    for (let j = 0; j < numItems; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 2) + 1;
      subtotal += product.price * quantity;

      selectedProducts.push({
        ...product,
        quantity,
        total: product.price * quantity,
      });
    }

    const shipping = subtotal >= 100 ? 0 : 5.95;
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = subtotal + shipping + tax;

    orders.push({
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: `${getRandomName()} ${getRandomLastName()}`,
      customerEmail: `${getRandomName().toLowerCase()}${Math.floor(
        Math.random() * 1000
      )}@example.com`,
      date: getRandomDate(new Date(2023, 0, 1), new Date()),
      products: selectedProducts,
      subtotal,
      shipping,
      tax,
      total,
      status: getRandomOrderStatus(),
    });
  }

  return orders.sort((a, b) => b.date.getTime() - a.date.getTime());
}

// Marketing campaigns
export function getMarketingCampaigns() {
  return [
    {
      id: 1,
      name: "Summer Health Boost",
      type: "Email",
      status: "Active",
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 7, 31),
      budget: 5000,
      spent: 3250,
      leads: 1875,
      conversions: 342,
    },
    {
      id: 2,
      name: "Fall Immunity Bundle",
      type: "Social Media",
      status: "Scheduled",
      startDate: new Date(2023, 8, 15),
      endDate: new Date(2023, 10, 15),
      budget: 7500,
      spent: 0,
      leads: 0,
      conversions: 0,
    },
    {
      id: 3,
      name: "New Customer Discount",
      type: "Google Ads",
      status: "Active",
      startDate: new Date(2023, 0, 1),
      endDate: new Date(2023, 11, 31),
      budget: 12000,
      spent: 8750,
      leads: 4250,
      conversions: 830,
    },
    {
      id: 4,
      name: "Referral Program",
      type: "Referral",
      status: "Active",
      startDate: new Date(2023, 2, 1),
      endDate: null,
      budget: 3000,
      spent: 2100,
      leads: 1350,
      conversions: 520,
    },
    {
      id: 5,
      name: "Back to School Wellness",
      type: "Email",
      status: "Completed",
      startDate: new Date(2023, 7, 1),
      endDate: new Date(2023, 8, 15),
      budget: 4500,
      spent: 4500,
      leads: 2200,
      conversions: 385,
    },
  ];
}

// Utility functions
function getRandomName() {
  const names = [
    "James",
    "Mary",
    "John",
    "Patricia",
    "Robert",
    "Jennifer",
    "Michael",
    "Linda",
    "William",
    "Elizabeth",
    "David",
    "Barbara",
    "Richard",
    "Susan",
    "Joseph",
    "Jessica",
    "Thomas",
    "Sarah",
    "Charles",
    "Karen",
    "Daniel",
    "Nancy",
    "Matthew",
    "Lisa",
    "Anthony",
    "Betty",
    "Donald",
    "Dorothy",
    "Mark",
    "Sandra",
    "Paul",
  ];

  return names[Math.floor(Math.random() * names.length)];
}

function getRandomLastName() {
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
    "Anderson",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Thompson",
    "Garcia",
    "Martinez",
    "Robinson",
    "Clark",
    "Rodriguez",
    "Lewis",
    "Lee",
    "Walker",
    "Hall",
    "Allen",
    "Young",
    "King",
    "Wright",
    "Scott",
    "Green",
    "Baker",
  ];

  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

function getRandomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function getRandomOrderStatus() {
  const statuses = ["Completed", "Shipped", "Processing", "Cancelled"];
  const weights = [0.7, 0.15, 0.1, 0.05]; // 70% completed, 15% shipped, etc.

  const rand = Math.random();
  let threshold = 0;

  for (let i = 0; i < statuses.length; i++) {
    threshold += weights[i];
    if (rand < threshold) return statuses[i];
  }

  return statuses[0];
}
