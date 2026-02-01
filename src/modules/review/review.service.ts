import prisma from "../../lib/prisma";

interface ReviewPayload {
  userId: string;
  mealId: string;
  rating: number;
  comment: string;
}

export const createReviewService = async ({
  userId,
  mealId,
  rating,
  comment,
}: ReviewPayload) => {
  // 1️⃣ Check: user ordered this meal & order is DELIVERED
  const deliveredOrder = await prisma.orderItem.findFirst({
    where: {
      mealId,
      order: {
        customerId: userId,
        status: "DELIVERED",
      },
    },
  });

  if (!deliveredOrder) {
    throw new Error(
      "You can review this meal only after it is delivered"
    );
  }

  // 2️⃣ (Optional but recommended) Prevent duplicate review
  const existingReview = await prisma.review.findFirst({
    where: {
      userId,
      mealId,
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this meal");
  }

  // 3️⃣ Create review
  const review = await prisma.review.create({
    data: {
      userId,
      mealId,
      rating,
      comment,
    },
  });

  return review;
};
