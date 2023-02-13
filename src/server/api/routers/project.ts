import { createTRPCRouter, protectedProcedure } from "../trpc";
import { object, string, array } from "zod";

const createProjectSchema = object({
  name: string({ required_error: "Project name is required" }),
  members: array(string()),
  visibility: string({ required_error: "Visibility is required" }),
});

export const projectRouter = createTRPCRouter({
  addProject: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, members, visibility } = input;

      try {
        const allMembers = await ctx.prisma.user.findMany({
          where: {
            id: { in: members },
          },
        });

        const project = await ctx.prisma.project.create({
          data: {
            projectName: name,
            members: {
              connect: allMembers.map((member) => {
                return { id: member.id };
              }),
            },
            visibility,
          },
          include: {
            members: true,
          },
        });

        return project;
      } catch (e) {
        console.log({ error: e });
      }
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const allProjects = await ctx.prisma.project.findMany();

    const mappedProjects = allProjects
      .map((project) => {
        if (project.visibility === "public") {
          return project;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const hasAccess = project.userIDs.includes(userId);

        if (hasAccess) {
          return project;
        }

        return null;
      })
      .filter((item) => item);

    return mappedProjects;
  }),
});
