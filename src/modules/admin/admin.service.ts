import prisma from "../../lib/prisma";

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};


// update user isActive
export const updateUserStatus = async (
  userId: string,
  isActive: boolean
) => {
  return prisma.user.update({
    where: { id: userId },
    data: { isActive },
  });
};