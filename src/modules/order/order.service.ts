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
