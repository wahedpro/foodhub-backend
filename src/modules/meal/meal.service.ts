import prisma from "../../lib/prisma";

export const getAllMeals = async (query: any) => {
  const { search, categoryId, minPrice, maxPrice } = query;

  return prisma.meal.findMany({
    where: {
      AND: [
        search
          ? {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {},
        categoryId ? { categoryId } : {},
        minPrice ? { price: { gte: Number(minPrice) } } : {},
        maxPrice ? { price: { lte: Number(maxPrice) } } : {},
      ],
    },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          userId: true,
          restaurant: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// get single meal by id
export const getMealById = async (id: string) => {
  const meal = await prisma.meal.findUnique({
    where: { id },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          restaurant: true,
          address: true,
          phone: true,
        },
      },
      reviews: true,
    },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  return meal;
};