import prisma from "../../lib/prisma";

type OrderItemInput = {
  mealId: string;
  quantity: number;
};

export const createOrder = async (user: any, payload: any) => {
  const { items, address } = payload;

  if (!items || items.length === 0) {
    throw new Error("Order items are required");
  }

  // get the Meal on database 
  const meals = await prisma.meal.findMany({
    where: {
      id: {
        in: items.map((i: OrderItemInput) => i.mealId),
      },
    },
  });

  if (meals.length !== items.length) {
    throw new Error("Invalid meal found in order");
  }

  //  Total price calculate
  let totalPrice = 0;

  items.forEach((item: OrderItemInput) => {
    const meal = meals.find((m) => m.id === item.mealId);
    if (!meal) return;
    totalPrice += meal.price * item.quantity;
  });

  //  Order + OrderItems create (transaction)
  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        customerId: user.id,
        address,
      },
    });

    const orderItemsData = items.map((item: OrderItemInput) => ({
      orderId: createdOrder.id,
      mealId: item.mealId,
      quantity: item.quantity,
    }));

    await tx.orderItem.createMany({
      data: orderItemsData,
    });

    return createdOrder;
  });

  return order;
};


export const getMyOrders = async (user: any) => {
  return prisma.order.findMany({
    where: {
      customerId: user.id,
    },
    include: {
      items: {
        include: {
          meal: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true,
              providerId: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getOrderById = async (user: any, orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          meal: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true,
              providerId: true,
            },
          },
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // ownership check (important)
  if (order.customerId !== user.id) {
    throw new Error("You are not allowed to view this order");
  }

  return order;
};
