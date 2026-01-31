import prisma from "../../lib/prisma";

export const createCategory = async (payload: { name: string }) => {
  return prisma.category.create({
    data: {
      name: payload.name,
    },
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export const updateCategory = async (
  id: string,
  payload: { name?: string }
) => {
  return prisma.category.update({
    where: { id },
    data: payload,
  });
};

export const deleteCategory = async (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};
