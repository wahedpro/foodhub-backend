import prisma from "../../lib/prisma";

// Create provider profile 
export const createProviderProfile = async (user: any, payload: any) => {
  //  ensure provider role
  if (user.role !== "PROVIDER") {
    throw new Error("Only provider can create profile");
  }

  //  check existing profile
  const existingProfile = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
  });

  if (existingProfile) {
    throw new Error("Provider profile already exists");
  }

  //  create profile
  return prisma.providerProfile.create({
    data: {
      userId: user.id,
      restaurant: payload.restaurant,
      address: payload.address,
      phone: payload.phone,
    },
  });
};

// Add meal (only after provider profile exists)
export const addMeal = async (user: any, payload: any) => {
  //  find provider profile
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  // create meal
  return prisma.meal.create({
    data: {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      image: payload.image,
      categoryId: payload.categoryId,
      providerId: providerProfile.id,
    },
  });
};

// Update meal
export const updateMeal = async (
  user: any,
  mealId: string,
  payload: any
) => {
  // provider profile check
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  //  meal exists & ownership check
  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  if (meal.providerId !== providerProfile.id) {
    throw new Error("You are not allowed to update this meal");
  }

  //  PUT = full update 
  return prisma.meal.update({
    where: { id: mealId },
    data: {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      image: payload.image,
      categoryId: payload.categoryId,
    },
  });
};

// Delete Meal
export const deleteMeal = async (user: any, mealId: string) => {
  //  provider profile
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  //  meal + ownership check
  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  if (meal.providerId !== providerProfile.id) {
    throw new Error("You are not allowed to delete this meal");
  }

  // delete
  return prisma.meal.delete({
    where: { id: mealId },
  });
};