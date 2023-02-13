import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const allUsers = await ctx.prisma.user.findMany();

    return allUsers;
  }),
});
