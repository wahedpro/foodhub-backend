import prisma from "../../lib/prisma";

// get all the provider
export const getAllProviders = async () => {
  return prisma.providerProfile.findMany({
    select: {
      id: true,
      restaurant: true,
      address: true,
      phone: true,
      _count: {
        select: {
          meals: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// get single provider by id
export const getProviderById = async (id: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { id },
    include: {
      meals: {
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!provider) {
    throw new Error("Provider not found");
  }
  return provider;
};
