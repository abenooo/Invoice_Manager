const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Deleting existing data in reverse order due to foreign key constraints
  try {
    await prisma.invoice.deleteMany({});
    await prisma.user.deleteMany({});
  } catch (error) {
    console.error("Error deleting existing data:", error);
  }

  console.log('Deleted all existing records.');

  // Seeding Users
  for (let i = 1; i <= 5; i++) {
    await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        password: `password${i}`,
      },
    });
  }

  const users = await prisma.user.findMany();

  // Seeding Invoices
  for (let i = 1; i <= 5; i++) {
    await prisma.invoice.create({
      data: {
        invoiceNumber: `INV-${1000 + i}`,
        clientName: `Client ${i}`,
        clientEmail: `client${i}@example.com`,
        clientAddress: `100${i} Example St`,
        clientPhone: `123-456-789${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        totalAmount: 100.00 * i,
        items: `${i}`, // Storing the selected item from the dropdown (1 to 5)
        userId: users[i % users.length].id,
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
